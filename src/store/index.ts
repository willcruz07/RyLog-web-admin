import { CombineReducer } from '../utils/LIB';
import { newUserInProgressInitialState, newUserInProgressReducer } from './newUserInProgress/reducer';
import { userInitialState, userReducer } from './user/reducer';

export const mainReducers = CombineReducer({
    user: userReducer,
    newUserInProgress: newUserInProgressReducer,
});

export const mainInitialState = {
    user: userInitialState,
    newUserInProgress: newUserInProgressInitialState,
};
