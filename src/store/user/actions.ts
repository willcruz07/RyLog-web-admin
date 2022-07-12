import { EUserTypes, IClearUser, ISetCurrentPassword, ISetUser, IUserWeb } from './types';

export const setUser = (data: IUserWeb): ISetUser => ({
    type: EUserTypes.setUser,
    payload: data,
});

export const setCurrentPassword = (data: string): ISetCurrentPassword => ({
    type: EUserTypes.setPassword,
    payload: data,
});

export const clearUser = (): IClearUser => ({ type: EUserTypes.clearUser });
