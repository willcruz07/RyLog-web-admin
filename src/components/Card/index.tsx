import React from 'react';

import './styles.scss';

export const Card: React.FC = ({ children }) => (
    <div className="container-card">
        {children}
    </div>
);
