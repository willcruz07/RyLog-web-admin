import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import React from 'react';
import { ButtonBack } from '../../../../components/ButtonBack';
import { ButtonPrimary } from '../../../../components/ButtonPrimary';
import { ContentAnimate } from '../../../../components/ContentAnimate';
import { Input } from '../../../../components/Input';
import { Typography } from '../../../../components/Typography';

const rows: GridRowsProp = [
    { id: 1, name: 'Hello', cpf: 'World' },
    { id: 2, name: 'DataGridPro', cpf: 'is Awesome' },
    { id: 3, name: 'MUI', cpf: 'is Amazing' },
];

const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', width: 150 },
    { field: 'cpf', headerName: 'CPF', width: 150 },
];

export const RegistrationOfCities: React.FC = () => (
    <ContentAnimate>
        <div className="container-registration">
            <div className="container-registration__header">
                <div className="container-registration__header__title">
                    <ButtonBack
                        marginRight={16}
                    />

                    <Typography
                        text="Cidades e coletas"
                        type="Title"
                    />
                </div>

                <ButtonPrimary
                    title="Adicionar"
                    width={152}
                    onClick={() => {}}
                />
            </div>
            <div className="container-registration__search">
                <Input
                    label="Pesquisar"
                    onChange={() => {}}
                    value=""
                    type="text"
                    icon="search"
                    placeholder="Digite sua pesquisa..."
                />
            </div>

            <div className="container-registration__grid">
                <DataGrid
                    disableColumnFilter
                    disableColumnMenu
                    rows={rows}
                    columns={columns}
                />
            </div>

        </div>
    </ContentAnimate>
);
