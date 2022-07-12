export enum EUserTypes {
    setUser = '@User/SET',
    clearUser = '@User/CLEAR',
    setCurrentPassword = '@User/PASSWORD',
}

export interface IUserWeb {
    id: string;
    name: string;
    email: string;
    webAccess: boolean;
    isAdmin: boolean;
}

export interface ISetUser {
    type: EUserTypes.setUser;
    payload: IUserWeb;
}
export interface ISetCurrentPassword {
    type: EUserTypes.setCurrentPassword;
    payload: string;
}

export interface IClearUser {
    type: EUserTypes.clearUser,
}

export type TUserActions = ISetUser | IClearUser | ISetCurrentPassword;

export interface IUserState {
    data: IUserWeb;
    logged: boolean;
    currentPassword: string;
}
