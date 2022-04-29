import React from 'react';
import { FaCheck, FaRegClipboard, FaExclamation, FaTimes } from 'react-icons/fa';
import CountUp from 'react-countup';

import './styles.scss';

type IconType = 'Total' | 'Approve' | 'Awaiting' | 'Cancel'

interface ICardTotalizer {
    title: string;
    value: number;
    icon: IconType;
}

const getIcon = (iconType: IconType) => {
    switch (iconType) {
        case 'Approve':
            return <FaCheck />;

        case 'Awaiting':
            return <FaExclamation />;

        case 'Cancel':
            return <FaTimes />;

        case 'Total':
            return <FaRegClipboard />;

        default:
            return <div />;
    }
};

const getColors = (iconType: IconType) => {
    switch (iconType) {
        case 'Approve':
            return '#2BA84A';

        case 'Awaiting':
            return '#F18F01';

        case 'Cancel':
            return '#F25F5C';

        case 'Total':
            return '#50514F';

        default:
            return '#F25F5C';
    }
};

export const CardTotalizer: React.FC<ICardTotalizer> = ({ icon, title, value }) => (
    <div className="base-card">
        <div className="base-card__row-icon">
            <div
                style={{
                    backgroundColor: getColors(icon),
                    boxShadow: `1px 1px 2px ${getColors(icon)}`,
                }}
                className="base-card__container-icon"
            >
                {getIcon(icon)}
            </div>
        </div>
        <div className="base-card__row-text">
            <h2>{title}</h2>
            <CountUp
                end={value}
            />
        </div>
    </div>
);
