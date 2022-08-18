import React from 'react';
import { FaPeopleCarry, FaMapMarkedAlt, FaTruck, FaRegIdCard } from 'react-icons/fa';

import './styles.scss';

type TIconType = 'deliveryman' | 'map' | 'delivery' | 'collect';

interface IRegistrationCardProps {
    title: string;
    subtitle?: string;
    icon: TIconType;
    action(): void;
}

const getIcon = (type: TIconType) => {
    switch (type) {
        case 'deliveryman':
            return <FaRegIdCard />;

        case 'map':
            return <FaMapMarkedAlt />;

        case 'collect':
            return <FaPeopleCarry />;

        case 'delivery':
            return <FaTruck />;

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
