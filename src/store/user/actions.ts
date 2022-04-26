import { EUserTypes, IClearUser, ISetUser, IUserWeb } from './types';

export const setUser = (data: IUserWeb): ISetUser => ({
    type: EUserTypes.setUser,
    payload: data,
});

export const clearUser = (): IClearUser => ({ type: EUserTypes.clearUser });
