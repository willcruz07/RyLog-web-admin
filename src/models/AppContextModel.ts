import React from 'react';
import { IUserState, TUserActions } from '../store/user/types';

type TAppActions = TUserActions;

interface IAppState {
    user: IUserState;
}

export interface IAppContextModel {
    state: IAppState;
    dispatch: React.Dispatch<TAppActions>
}
