import React, { useMemo } from 'react';

import './styles.scss';
import { Autocomplete, TextField } from '@mui/material';

export interface ISelectItems {
    label: string;
    value: string;
}

interface ISelectProps {
    label: string;
    required?: boolean;
    marginBottom?: number;
    marginRight?: number;
    marginTop?: number;
    items: ISelectItems[];
    setSelectedValues(values: string): void;
    selectedValues: string;
    placeholder?: string;
    defaultValue?: string;
}

export const InputSelectAutoComplete: React.FC<ISelectProps> = ({ items, placeholder, defaultValue, label, required, marginBottom, marginRight, marginTop, selectedValues, setSelectedValues }) => {
    const getDefaultValue = useMemo((): ISelectItems | undefined => (defaultValue ? items.find((item) => item.value === defaultValue) : undefined), [defaultValue, items]);
    return (
        <div
            style={{ marginTop, marginRight, marginBottom }}
            className="container-input-select"
        >
            {label && (
                <label htmlFor={label}>
                    {`${label}: `}
                    {required && <span>*</span>}
                </label>
            )}

            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={items}
                placeholder={placeholder}
                defaultValue={getDefaultValue}
                onChange={(_, value) => setSelectedValues(value?.value || '')}
                renderInput={(params) => (
                    <TextField
                        className="auto-complete"
                        {...params}
                        value={selectedValues}
                        placeholder={placeholder}
                    />
                )}
            />

        </div>
    );
};
