import React from 'react';
import { Loader } from '../Loader';
import './styles.scss';

interface IButtonProps {
    title: string;
    onClick: () => void;
    marginTop?: number;
    marginBottom?: number;
    loading?: boolean;
    disabled?: boolean;
    width?: number;
}

export const ButtonSecondary = React.forwardRef(({ onClick, title, width, marginBottom, marginTop, loading, disabled }: IButtonProps, ref: React.Ref<HTMLButtonElement>) => (
    <button
        ref={ref}
        disabled={loading || disabled}
        style={{ marginBottom, marginTop, width }}
        className={`button-secondary ${loading || disabled ? 'disabled-button-secondary' : ''}`}
        type="button"
        onClick={onClick}
    >
        {loading ? <Loader /> : title}
    </button>
));
