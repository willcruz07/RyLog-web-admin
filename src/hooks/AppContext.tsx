/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { IAppContextModel } from '../models/AppContextModel';
import { mainInitialState, mainReducers } from '../store';

const AppContext = React.createContext({} as IAppContextModel);

export const AppProvider: React.FC = ({ children }) => {
    const [state, dispatch] = React.useReducer(mainReducers, mainInitialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): IAppContextModel => {
    const context = React.useContext(AppContext);
    return context;
};
