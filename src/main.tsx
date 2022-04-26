import React from 'react';
import ReactDOM from 'react-dom';
import { AppProvider } from './hooks/AppContext';
import { MenuContextProvider } from './hooks/MenuContextProvider';
import { Routes } from './routes';
import './styles/globals.scss';

ReactDOM.render(
    <React.StrictMode>
        <AppProvider>
            <MenuContextProvider>
                <Routes />
            </MenuContextProvider>
        </AppProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);
