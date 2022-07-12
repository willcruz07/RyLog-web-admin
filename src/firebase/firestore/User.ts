import { createUserWithEmailAndPassword, EmailAuthProvider, reauthenticateWithCredential, UserCredential } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { IUserWeb } from '../../store/user/types';
import { auth, dbFirestore } from '../config';

export interface ICurrentUser {
    userCredential: UserCredential | undefined;
    currentPassword: string;
}

interface IAddUser {
    userEmail: string;
    userPassword: string;
    adminPassword: string;
}

interface ICredentialsUsers {
    newUserCredential: UserCredential;
    adminCredential: UserCredential
}

export const getUserData = async (email: string): Promise<IUserWeb | undefined> => {
    const docRef = query(collection(dbFirestore, 'usuarios'), where('email', '==', email));
    const companyDoc = await getDocs(docRef);

    let userData: IUserWeb | undefined;

    companyDoc.forEach((doc) => {
        userData = Object.assign(doc.data(), { id: doc.id }) as IUserWeb;
    });

    return userData;
};

export const reauthenticateUser = async (currentPassword: string): Promise<UserCredential | undefined> => {
    try {
        const { currentUser } = auth;

        const credential = EmailAuthProvider.credential(currentUser?.email || '', currentPassword);

        if (currentUser) {
            return await reauthenticateWithCredential(currentUser, credential);
        } return undefined;
    } catch (error) {
        throw new Error('Não foi possível validar o usuário');
    }
};

export const addUserDeliveryman = async (data: IAddUser): Promise<ICredentialsUsers | undefined> => {
    try {
        const { currentUser: userAuth } = auth;

        const newUserCredential = await createUserWithEmailAndPassword(auth, data.userEmail, data.userPassword);

        if (userAuth && data.adminPassword) {
            const adminCredential = await reauthenticateWithCredential(userAuth, EmailAuthProvider.credential(userAuth?.email || '', data.adminPassword));

            return {
                adminCredential,
                newUserCredential,
            };
        }

        return undefined;
    } catch (error) {
        throw new Error('Não foi possível criar o usuário');
    }
};
