import React from 'react';

import { FaRegCheckSquare, FaRegSquare } from 'react-icons/fa';

import './styles.scss';

interface ICheckboxProps {
    title: string;
    value: boolean;
    onChecked: (value: boolean) => void;
    marginBottom?: number;
    marginTop?: number;
    marginLeft?: number;
    marginRight?: number;
    minWidth?: number;
}

export const Checkbox: React.FC<ICheckboxProps> = ({ onChecked, title, value, marginBottom, marginLeft, marginRight, marginTop, minWidth }) => (
    <button
        type="button"
        className="container-checkbox"
        style={{ marginBottom, marginLeft, marginRight, marginTop, minWidth }}
        onClick={() => onChecked(!value)}
    >
        {value ? <FaRegCheckSquare className="checked" /> : <FaRegSquare className="un-checked" />}
        <span>{title}</span>
    </button>
);
