import React from 'react';
import { FaPeopleCarry, FaCity } from 'react-icons/fa';

import './styles.scss';

type TIconType = 'deliveryman' | 'cities';

interface IRegistrationCardProps {
    title: string;
    subtitle?: string;
    icon: TIconType;
    action(): void;
}

const getIcon = (type: TIconType) => {
    switch (type) {
        case 'deliveryman':
            return <FaPeopleCarry />;

        case 'cities':
            return <FaCity />;

        default: return <span />;
    }
};

export const RegistrationCardButton: React.FC<IRegistrationCardProps> = ({ action, icon, title, subtitle }) => (
    <button
        type="button"
        className="container-registration-card"
        onClick={action}
    >
        <div className="container-icon">
            {getIcon(icon)}
        </div>
        <div className="container-text">
            <h2>{title}</h2>
            <span>{subtitle}</span>
        </div>
    </button>
);
