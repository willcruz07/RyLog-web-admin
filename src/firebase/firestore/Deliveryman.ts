import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { dbFirestore } from '../config';

export interface ICitiesServed {
    collectionAndDeliveryId: string;
    citiesName: string;
}

export interface IDeliveryman {
    name: string;
    cpf: string;
    cnh: string;
    email: string;
    licensePlate: string;
    phone: string;
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
            email: data.email,
            emplacamento: data.licensePlate,

        });
    } catch (error) {
        throw new Error('Não foi possível salvar o entregador');
    }
};

export const getDeliveryman = async (): Promise<IGetDeliveryman[] | undefined> => {
    const docRef = query(collection(dbFirestore, 'usuarios'), where('entregador', '==', true));
    const deliverymanDocs = await getDocs(docRef);

    if (deliverymanDocs.empty) {
        return undefined;
    }
    const listCities: IGetDeliveryman[] = [];

    deliverymanDocs.forEach((doc) => {
        listCities.push({
            id: doc.id,
            name: doc.data()?.name,
            phone: doc.data().celular,
            cnh: doc.data()?.cnh,
            cpf: doc.data()?.cpf,
            email: doc.data().email,
            licensePlate: doc.data()?.emplacamento,
        });
    });

    return listCities;
};
