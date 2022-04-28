import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import './styles.scss';

interface IButtonProps {
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    disabled?: boolean;
}

export const ButtonBack = React.forwardRef(({ marginBottom, marginTop, marginLeft, marginRight, disabled }: IButtonProps, ref: React.Ref<HTMLButtonElement>) => {
    const navigate = useNavigate();

    return (
        <button
            data-tip="Voltar"
            ref={ref}
            disabled={disabled}
            style={{ marginTop, marginBottom, marginLeft, marginRight }}
            className="button-back"
            type="button"
            onClick={() => navigate(-1)}
        >
            <FaArrowLeft />
        </button>
    );
});
