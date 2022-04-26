import { CombineReducer } from '../utils/LIB';
import { userInitialState, userReducer } from './user/reducer';

export const mainReducers = CombineReducer({ user: userReducer });

export const mainInitialState = { user: userInitialState };
