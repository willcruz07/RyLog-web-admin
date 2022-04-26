export enum EUserTypes {
    setUser,
    clearUser
}

export interface IUserWeb {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
}

export interface ISetUser {
    type: EUserTypes.setUser;
    payload: IUserWeb;
}

export interface IClearUser {
    type: EUserTypes.clearUser,
}

export type TUserActions = ISetUser | IClearUser;

export interface IUserState {
    data: IUserWeb;
    logged: boolean;
}
