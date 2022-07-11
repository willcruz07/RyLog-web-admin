import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { dbFirestore } from '../config';

export interface ICitiesServed {
    collectionAndDeliveryId: string;
    citiesName: string;
}

export interface IDeliveryman {
    name: string;
    cpf: string;
    cnh: string;
    licensePlate: string;
    phone: string;
    citiesServed: ICitiesServed[];
}

export interface IGetDeliveryman extends IDeliveryman {
    id: string;
}

export const setDeliveryman = async (data: IDeliveryman): Promise<void> => {
    try {
        const docRef = doc(collection(dbFirestore, 'entregadores'));
        await setDoc(docRef, {
            cpf: data.cpf,
            cnh: data.cnh,
            celular: data.phone,
            nome: data.name,
            emplacamento: data.licensePlate,
            cidadesAtendidas: data.citiesServed.map((item) => ({
                nome: item.citiesName,
                idCidade: item.collectionAndDeliveryId,
            })),
        });
    } catch (error) {
        throw new Error('Não foi possível salvar o entregador');
    }
};

export const getDeliveryman = async (): Promise<IGetDeliveryman[] | undefined> => {
    const docRef = collection(dbFirestore, 'entregadores');
    const deliverymanDocs = await getDocs(docRef);

    if (deliverymanDocs.empty) {
        return undefined;
    }
    const listCities: IGetDeliveryman[] = [];

    deliverymanDocs.forEach((doc) => {
        listCities.push({
            id: doc.id,
            name: doc.data().nome,
            phone: doc.data().celular,
            cnh: doc.data().cnh,
            cpf: doc.data().cpf,
            licensePlate: doc.data().emplacamento,
            citiesServed: doc.data().cidadesAtendidas.map((item: any) => ({
                collectionAndDeliveryId: item.idCidade,
                citiesName: item.nome,
            })),

        });
    });

    return listCities;
};
