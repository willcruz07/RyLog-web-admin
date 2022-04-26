import React from 'react';
import { Header } from '../Header';
import { Nav } from '../Nav';

import './styles.scss';

export const Layout: React.FC = ({ children }) => (
    <div className="container-grid-layout">
        <Header />
        <Nav />
        <div className="content-layout">
            {children}
        </div>
    </div>
);
