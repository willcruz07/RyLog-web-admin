/* eslint-disable consistent-return */
import React, { useState } from 'react';

import { FaUserCircle, FaLock, FaEnvelope, FaEye, FaEyeSlash, FaSearch } from 'react-icons/fa';

import './styles.scss';

type TIcons = 'user' | 'lock' | 'email' | 'search';

interface IInputProps {
    icon?: TIcons;
    placeholder?: string;
    value: string | number;
    maxLength?: number;
    marginTop?: number;
    marginBottom?: number;
    marginRight?: number;
    type: React.HTMLInputTypeAttribute;
    password?: boolean;
    error?: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    label?: string;
    required?: boolean;
    onKeyReturn?: () => void;
    min?: number;
    max?: number;
    currency?: boolean;
}

const getIcon = (icon: TIcons) => {
    switch (icon) {
        case 'user':
            return <FaUserCircle />;

        case 'lock':
            return <FaLock />;

        case 'email':
            return <FaEnvelope />;

        case 'search':
            return <FaSearch />;
    }
};

export const Input = React.forwardRef(
    (
        {
            icon,
            marginBottom,
            marginRight,
            marginTop,
            onChange,
            type,
            value,
            disabled,
            error,
            label,
            maxLength,
            password,
            placeholder,
            required,
            onKeyReturn,
            min,
            max,
            currency,
        }: IInputProps,
        ref?: React.Ref<HTMLInputElement>,
    ) => {
        const [isVisiblePassword, setIsVisiblePassword] = useState(false);
        const [focus, setFocus] = useState(false);

        const renderIconEyePassword = () => {
            const handleSetVisiblePassword = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
                e.preventDefault();
                setIsVisiblePassword(!isVisiblePassword);
            };

            if (isVisiblePassword) {
                return (
                    <FaEyeSlash
                        className="visible-password"
                        onClick={handleSetVisiblePassword}
                    />
                );
            }
            return (
                <FaEye
                    className="visible-password"
                    onClick={handleSetVisiblePassword}
                />
            );
        };

        const getInputType = () => (isVisiblePassword ? 'text' : 'password');

        const handleKeyReturn = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter' && onKeyReturn) {
                onKeyReturn();
            }
        };

        return (
            <div
                style={{ marginTop, marginRight, marginBottom }}
                className="container-input"
            >
                {label && (
                    <label htmlFor={label}>
                        {`${label}: `}
                        {required && <span>*</span>}
                    </label>
                )}

                <div className={`container-input__input ${focus ? 'active' : ''}`}>
                    {icon && getIcon(icon)}
                    {currency && value !== '' && <span>{'R$ '}</span>}
                    <input
                        required={required}
                        ref={ref}
                        autoComplete="off"
                        id={label}
                        disabled={disabled}
                        type={password ? getInputType() : type}
                        value={value}
                        maxLength={maxLength}
                        placeholder={placeholder}
                        onChange={(e) => onChange(e.target.value)}
                        onFocus={() => setFocus(true)}
                        onBlur={() => setFocus(false)}
                        onKeyUp={(e) => {
                            handleKeyReturn(e);
                        }}
                        min={min}
                        max={max}
                    />
                    {password ? renderIconEyePassword() : null}
                </div>
                {error && <span className="container-input__tag-error">{error}</span>}
            </div>
        );
    },
);
