import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config';
import { IForgotPassword, IForgotPasswordResponse, ISignIn } from '../../models/Auth';

export const signInApp = async (singIn: ISignIn): Promise<void> => {
    await signInWithEmailAndPassword(auth, singIn.email, singIn.password)
        .catch((error) => {
            throw new Error(error.code);
        });
};

export const sendEmailForgotPassword = async (forgotPassword: IForgotPassword): Promise<IForgotPasswordResponse> => {
    await sendPasswordResetEmail(auth, forgotPassword.email)
        .catch((error) => {
            throw new Error(error.code);
        });

    return { message: 'Email enviado com sucesso!' };
};
