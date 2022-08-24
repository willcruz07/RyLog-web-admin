import { collection, doc, DocumentData, getDocs, Query, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { IAmountCollectDeliveries, IGetCollectDeliveries } from '../../models/AmountCollectionAndDeliveries';
import { ICollectionsAndDeliveries, IDeliverymanCollectDelivery } from '../../models/CollectionsAndDeliveries';
import { TDeliveryStatus, TPeriod } from '../../models/types';
import { getDateFirebase } from '../../utils/LIB';
import { dbFirestore } from '../config';
import { accountId } from './Account';

type TCollectionsAndDeliveries = 'COLLECT' | 'DELIVERY';

interface IDeliverymanToCollectionAndDeliveriesDTO extends IDeliverymanCollectDelivery {
    collectionAndDeliveriesID: string;
    type: 'COLLECT' | 'DELIVERY';
}

interface IParamsGetCollectionAndDeliveries {
    initialDate: Date;
    finalDate: Date;
    period?: TPeriod;
    status?: TDeliveryStatus;
}

export const addCollectAndDeliveriesAmount = async (data: IAmountCollectDeliveries): Promise<void> => {
    try {
        const docRef = doc(collection(dbFirestore, 'valores_de_coletas_entregas'));
        await setDoc(docRef, {
            valorDaColeta: data.collectionAmount,
            valorDaEntrega: data.deliveryAmount,
            origem: {
                nome: data.from.name,
                codigo_ibge: data.from.codeIbge,
                conta_ref: data.from.accountRef,
                uf: data.from.state,
            },
            destino: {
                nome: data.to.name,
                codigo_ibge: data.to.codeIbge,
                conta_ref: data.to.accountRef,
                uf: data.to.state,
            },
        });
    } catch (error) {
        throw new Error('Não foi possível salvar o documento');
    }
};

export const getCollectAndDeliveriesAmount = async (): Promise<IGetCollectDeliveries[] | undefined> => {
    const docRef = collection(dbFirestore, 'valores_de_coletas_entregas');
    const citiesDoc = await getDocs(docRef);

    if (citiesDoc.empty) {
        return undefined;
    }

    const listCities: IGetCollectDeliveries[] = [];

    citiesDoc.forEach((doc) => {
        listCities.push({
            id: doc.id,
            collectionAmount: doc.data().valorDaColeta,
            deliveryAmount: doc.data().valorDaEntrega,
            from: {
                accountRef: doc.data().origem.conta_ref,
                codeIbge: doc.data().origem.codigo_ibge,
                id: doc.data()?.origem.id,
                name: doc.data()?.origem.nome,
                state: doc.data()?.origem.uf,
            },
            to: {
                accountRef: doc.data().destino.conta_ref,
                codeIbge: doc.data().destino.codigo_ibge,
                id: doc.data()?.destino.id,
                name: doc.data()?.destino.nome,
                state: doc.data()?.destino.uf,
            },
        });
    });

    return listCities;
};

const getQueryCollectionsAndDeliveries = (type: TCollectionsAndDeliveries, params: IParamsGetCollectionAndDeliveries): Query<DocumentData> => {
    const queryValues = type === 'COLLECT' ?
        ['PENDENTE', 'CANCELADA', 'COLETADA'] : ['REALIZADA', 'CONFIRMADA'];

    if (params.period && !params.status) {
        return query(
            collection(dbFirestore, 'contas', accountId, 'coletas_entregas'),
            where('status_coleta', 'in', queryValues),
            where('data', '>=', params.initialDate),
            where('data', '<=', params.finalDate),
            where('periodo', '==', params.period),
        );
    }

    if (!params.period && params.status) {
        return query(
            collection(dbFirestore, 'contas', accountId, 'coletas_entregas'),
            where(type === 'COLLECT'
                ? 'status_coleta'
                : 'status_entrega', '==', params.status),
            where('data', '>=', params.initialDate),
            where('data', '<=', params.finalDate),
        );
    }

    return query(
        collection(dbFirestore, 'contas', accountId, 'coletas_entregas'),
        where('status_coleta', 'in', queryValues),
        where('data', '>=', params.initialDate),
        where('data', '<=', params.finalDate),
    );
};

export const getCollectionsAndDeliveries = async (type: TCollectionsAndDeliveries, params: IParamsGetCollectionAndDeliveries): Promise<ICollectionsAndDeliveries[]> => {
    const docRef = getQueryCollectionsAndDeliveries(type, params);

    const docs = await getDocs(docRef);

    const listCollectionsAndDeliveries: ICollectionsAndDeliveries[] = [];

    docs.forEach((doc) => {
        listCollectionsAndDeliveries.push({
            id: doc.data()?.uid || '',
            date: getDateFirebase(doc.data()?.data),
            collectStatus: doc.data()?.status_coleta || 'PENDENTE',
            deliveryStatus: doc.data()?.status_entrega || 'PENDENTE',
            period: doc.data()?.periodo || 'MANHÃ',
            printedLabel: doc.data()?.etiquetas_impressas || '',
            pathSignature: doc.data()?.path_assinatura || '',
            receiver: {
                name: doc.data().remetente?.nome || '',
                cpf: doc.data().remetente?.cpf || '',
                phone: doc.data().remetente?.celular || '',
                rg: doc.data().remetente?.rg || '',
                userRef: doc.data()?.remetente?.usuario_ref || '',
                address: {
                    zipCode: doc.data()?.remetente?.endereco?.cep || '',
                    complement: doc.data()?.remetente?.endereco?.complemento || '',
                    country: doc.data()?.remetente?.endereco?.pais || '',
                    district: doc.data()?.remetente?.endereco?.bairro || '',
                    number: doc.data()?.remetente?.endereco?.numero || '',
                    state: doc.data()?.remetente?.endereco.uf || '',
                    street: doc.data()?.remetente?.endereco?.logradouro || '',
                    ref: doc.data()?.remetente?.endereco?.ref || '',
                    reference: doc.data()?.remetente?.endereco?.referencia || '',
                    city: {
                        name: doc.data()?.remetente?.endereco?.cidade?.nome || '',
                        ref: doc.data()?.remetente?.endereco?.cidade?.ref || '',
                    },
                },
            },
            sender: {
                name: doc.data()?.destinatario?.nome || '',
                phone: doc.data()?.destinatario?.celular || '',
                address: {
                    zipCode: doc.data()?.destinatario?.endereco?.cep || '',
                    complement: doc.data()?.destinatario?.endereco?.complemento || '',
                    country: doc.data()?.destinatario?.endereco?.pais || '',
                    district: doc.data()?.destinatario?.endereco?.bairro || '',
                    number: doc.data()?.destinatario?.endereco?.numero || '',
                    state: doc.data()?.destinatario?.endereco.uf || '',
                    street: doc.data()?.destinatario?.endereco?.logradouro || '',
                    ref: doc.data()?.destinatario?.endereco?.ref || '',
                    reference: doc.data()?.destinatario?.endereco?.referencia || '',
                    city: {
                        name: doc.data()?.destinatario?.endereco?.cidade?.nome || '',
                        ref: doc.data()?.destinatario?.endereco?.cidade?.ref || '',
                    },
                },
            },
            deliverymanCollect: {
                name: doc.data()?.entregador_coleta?.nome || '',
                deliverymanRef: doc.data()?.entregador_coleta?.ref || '',
            },
            deliverymanDelivery: {
                name: doc.data()?.entregador_entrega?.nome,
                deliverymanRef: doc.data()?.entregador_entrega?.ref || '',
            },

        });
    });

    return listCollectionsAndDeliveries;
};

export const addDeliverymanToCollectionAndDeliveries = async (data: IDeliverymanToCollectionAndDeliveriesDTO) => {
    const docToCollection = doc(dbFirestore, 'contas', accountId, 'coletas_entregas', data.collectionAndDeliveriesID);

    const field = data.type === 'COLLECT' ? 'entregador_coleta' : 'entregador_entrega';
    const collectStatus = data.type === 'COLLECT' ? 'PENDENTE' : 'CONFIRMADA';
    const deliveryStatus = data.type === 'COLLECT' ? '' : 'PENDENTE';

    try {
        await updateDoc(docToCollection, {
            [field]: {
                nome: data.name,
                ref: data.deliverymanRef,
            },
            status_coleta: collectStatus,
            status_entrega: deliveryStatus,
        });
    } catch (error) {
        throw new Error('Não foi possível atualizar a coleta');
    }
};
