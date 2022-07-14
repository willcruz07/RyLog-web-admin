import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { dbFirestore } from '../config';
import { ICity } from './Cities';

export interface ICollectDeliveries {
    from: ICity;
    to: ICity;
    deliveryAmount: number;
    collectionAmount: number;
}

export interface IGetCollectDeliveries extends ICollectDeliveries {
    id: string;
}

export const setCollectAndDeliveries = async (data: ICollectDeliveries): Promise<void> => {
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

export const getCollectAndDeliveries = async (): Promise<IGetCollectDeliveries[] | undefined> => {
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
