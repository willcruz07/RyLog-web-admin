import { EUserTypes, INewUserInProgressState, TNewUserInpogressActions } from './types';

export const newUserInProgressInitialState: INewUserInProgressState = { status: false };

export const newUserInProgressReducer = (state: INewUserInProgressState, action: TNewUserInpogressActions): INewUserInProgressState => {
    switch (action.type) {
        case EUserTypes.START:
            return { status: action.payload };

        case EUserTypes.STOP: {
            return { ...newUserInProgressInitialState };
        }

        default: return state;
    }
};
