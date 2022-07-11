import { collection, getDocs } from 'firebase/firestore';
import { dbFirestore } from '../config';

export interface ICity {
    id: string;
    name: string;
    state: string;
    codeIbge: string;
    accountRef: string;
}

export const getCities = async (): Promise<ICity[] | undefined> => {
    const docRef = collection(dbFirestore, 'cidades');
    const citiesDoc = await getDocs(docRef);

    if (citiesDoc.empty) {
        return undefined;
    }

    const listCities: ICity[] = [];

    citiesDoc.forEach((doc) => {
        listCities.push({
            id: doc.id,
            name: doc.data().nome,
            accountRef: doc.data().conta_ref,
            codeIbge: doc.data().cod_ibge,
            state: doc.data().uf,
        });
    });

    return listCities;
};
