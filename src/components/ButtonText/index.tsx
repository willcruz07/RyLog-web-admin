import React from 'react';
import './styles.scss';

interface IButtonProps {
    title: string;
    onClick: () => void;
    marginTop?: number;
    marginBottom?: number;
    disabled?: boolean;
}

export const ButtonText: React.FC<IButtonProps> = ({ onClick, title, marginBottom, marginTop, disabled }) => (
    <button
        disabled={disabled}
        style={{ marginBottom, marginTop }}
        className={`button-outline ${disabled ? 'disabled-button-text' : ''}`}
        type="button"
        onClick={onClick}
    >
        {title}
    </button>
);
