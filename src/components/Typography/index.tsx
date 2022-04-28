import React from 'react';

import './styles.scss';

type TTypography = 'Title' | 'Subtitle';

interface ITypographyProps {
    text: string;
    type: TTypography;
}

const getTypography = (type: TTypography, text: string) => {
    switch (type) {
        case 'Title':
            return <h1>{text}</h1>;

        default:
            return <span />;
    }
};

export const Typography: React.FC<ITypographyProps> = ({ text, type }) => (
    <div className="typography">
        {getTypography(type, text)}
    </div>
);
