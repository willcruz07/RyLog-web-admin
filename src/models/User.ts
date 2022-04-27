import { UserCredential } from 'firebase/auth';

export interface ICurrentUser {
    userCredential: UserCredential | undefined;
    currentPassword: string;
}

export interface IUser {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    webAccess: boolean;
    isAdmin: boolean;
}

export interface ICreateUser extends IUser {
    password: string;
}
