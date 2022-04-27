import { collection, getDocs, query, where } from 'firebase/firestore';
import { IUserWeb } from '../../store/user/types';
import { dbFirestore } from '../config';

export const getUserData = async (email: string): Promise<IUserWeb | undefined> => {
    const docRef = query(collection(dbFirestore, 'usuarios'), where('email', '==', email));
    const companyDoc = await getDocs(docRef);

    let userData: IUserWeb | undefined;

    companyDoc.forEach((doc) => {
        userData = Object.assign(doc.data(), { id: doc.id }) as IUserWeb;
    });

    return userData;
};
