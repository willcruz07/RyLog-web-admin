import React from 'react';
import { INewUserInProgressState, TNewUserInpogressActions } from '../store/newUserInProgress/types';
import { IUserState, TUserActions } from '../store/user/types';

type TAppActions = TUserActions | TNewUserInpogressActions;

interface IAppState {
    user: IUserState;
    newUserInProgress: INewUserInProgressState;
}

export interface IAppContextModel {
    state: IAppState;
    dispatch: React.Dispatch<TAppActions>
}
