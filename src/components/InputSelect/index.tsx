import React, { useCallback } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Theme, useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';

import './styles.scss';

export interface ISelectItems {
    label: string;
    value: string;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight:
        personName.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
    };
}

interface ISelectProps {
    label: string;
    placeholder: string;
    required?: boolean;
    marginBottom?: number;
    marginRight?: number;
    marginTop?: number;
    items: ISelectItems[];
    setSelectedValues(values: string[]): void;
    selectedValues: string[];
    multiple: boolean;
}

export const InputSelectTip: React.FC<ISelectProps> = ({ multiple, placeholder, items, label, required, marginBottom, marginRight, marginTop, selectedValues, setSelectedValues }) => {
    const theme = useTheme();

    const handleChange = (event: SelectChangeEvent<typeof selectedValues>) => {
        const { target: { value } } = event;
        setSelectedValues(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const getSelectedValue = useCallback((id: string): string => items.filter((value) => value.value === id)[0].label || '', []);

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
            <Select
                id="demo-multiple-chip"
                displayEmpty
                multiple={multiple}
                value={selectedValues}
                onChange={handleChange}
                placeholder={placeholder}
                input={<OutlinedInput id="select-multiple-chip" />}
                renderValue={(selected) => {
                    if (selected.length === 0) {
                        return (
                            <span className="placeholder">{placeholder}</span>
                        );
                    }
                    return (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={getSelectedValue(value)} />
                            ))}
                        </Box>
                    );
                }}
                // renderValue={(selected) => (
                //     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                //         {selected.map((value) => (
                //             <Chip key={value} label={getSelectedValue(value)} />
                //         ))}
                //     </Box>
                // )}
                MenuProps={MenuProps}
            >
                {items.map((value) => (
                    <MenuItem
                        key={value.value}
                        value={value.value}
                        style={getStyles(value.label, selectedValues, theme)}
                    >
                        {value.label}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
};
