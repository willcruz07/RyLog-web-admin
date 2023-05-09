import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { dbFirestore, firebaseFunctions } from '../config';

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
        const createDeliveryman = httpsCallable(firebaseFunctions, 'oncall_cadastrar_usuario');

        await createDeliveryman({
            user_payload: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                password: '123456',
                isClient: false,
                document: data.cpf,
                isWebAdmin: false,
                isDeliveryman: true,
                license_number: data.cnh,
                car_number_plate: data.licensePlate,
            },
        });
    } catch (error) {
        throw new Error('Não foi possível salvar o entregador');
    }
};

export const deleteDeliveryman = async (data: IGetDeliveryman): Promise<void> => {
    const docRef = doc(dbFirestore, 'usuarios', data.id);

    try {
        deleteDoc(docRef);
    } catch (error) {
        throw new Error('Não foi possível deletar o entregador');
    }
};

export const updateDeliveryman = async (data: IGetDeliveryman): Promise<void> => {
    const docRef = doc(dbFirestore, 'usuarios', data.id);

    try {
        await updateDoc(docRef, {
            nome: data.name,
            email: data.email,
            celular: data.phone,
            documento: data.cpf,
            cnh: data.cnh,
            placa_carro: data.licensePlate,
        });
    } catch (error) {
        throw new Error('Não foi possível editar o entregador');
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
            name: doc.data()?.nome,
            phone: doc.data().celular,
            cnh: doc.data()?.cnh,
            cpf: doc.data()?.cpf,
            email: doc.data().email,
            licensePlate: doc.data()?.emplacamento,
        });
    });

    return listCities;
};
