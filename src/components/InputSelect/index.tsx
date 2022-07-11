import React, { useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Theme, useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';

import './styles.scss';

const names = [
    'Rio de Janeiro - Arraial do Cabo',
    'Petropolis - Teresópolis',
    'Teresópolis - Petropolis',
    'Cabo Frio - Arraial do Cabo',
];

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
}

export const InputSelectTip: React.FC<ISelectProps> = ({ label, required, marginBottom, marginRight, marginTop, placeholder }) => {
    const [personName, setPersonName] = useState<string[]>([]);

    const theme = useTheme();

    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const { target: { value } } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

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
                multiple
                displayEmpty
                value={personName}
                onChange={handleChange}
                placeholder="ww"
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
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    );
                }}
                MenuProps={MenuProps}
            >
                {names.map((name) => (
                    <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, personName, theme)}
                    >
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
};
