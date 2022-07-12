import { EUserTypes, IUserState, TUserActions } from './types';

export const userInitialState: IUserState = {
    logged: false,
    currentPassword: '',
    data: {
        id: '',
        email: '',
        isAdmin: false,
        name: '',
        webAccess: false,
    },
};

export const userReducer = (state: IUserState, action: TUserActions): IUserState => {
    switch (action.type) {
        case EUserTypes.setUser:
            return {
                ...state,
                logged: true,
                data: action.payload,
            };

        case EUserTypes.clearUser: {
            return { ...userInitialState };
        }

        case EUserTypes.setCurrentPassword: {
            return {
                ...state,
                currentPassword: action.payload,
            };
        }

        default: return state;
    }
};
