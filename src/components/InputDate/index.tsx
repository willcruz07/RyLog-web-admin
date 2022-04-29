/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import DatePicker, { registerLocale } from 'react-datepicker';
import ptBr from 'date-fns/locale/pt-BR';

import 'react-datepicker/dist/react-datepicker.css';
import './styles.scss';

interface IInputProps {
  value: Date | null;
  maxLength?: number;
  marginTop?: number;
  marginBottom?: number;
  marginRight?: number;
  onChange: (value: Date) => void;
  disabled?: boolean;
  label?: string;
}

registerLocale('ptBr', ptBr);

export const InputDate = React.forwardRef(
    (
        {
            marginBottom,
            marginRight,
            marginTop,
            onChange,
            disabled,
            value,
            label,
        }: IInputProps,
        ref?: React.LegacyRef<DatePicker<never, undefined>> | undefined,
    ) => {
        const [focus, setFocus] = useState(false);

        return (
            <div
                style={{ marginTop, marginRight, marginBottom }}
                className="container-input-date"
            >
                {label && (
                    <label htmlFor={label}>
                        {`${label}: `}
                    </label>
                )}

                <div className={`container-input__input ${focus ? 'active' : ''}`}>
                    <FaCalendarAlt />

                    <DatePicker
                        ref={ref}
                        disabled={disabled}
                        selected={value}
                        onChange={onChange}
                        dateFormat="dd/MM/yyyy"
                        onFocus={() => setFocus(true)}
                        onBlur={() => setFocus(false)}
                        locale="ptBr"
                    />
                </div>
            </div>
        );
    },
);
