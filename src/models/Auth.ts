export interface ISignIn {
    email: string;
    password: string;
}

export interface IForgotPassword {
    email: string;
}

export interface IForgotPasswordResponse {
    message: string;
}
