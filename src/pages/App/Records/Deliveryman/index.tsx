import React from 'react';
import { GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { ButtonBack } from '../../../../components/ButtonBack';
import { ButtonPrimary } from '../../../../components/ButtonPrimary';
import { Input } from '../../../../components/Input';
import { Typography } from '../../../../components/Typography';
import { ContentAnimate } from '../../../../components/ContentAnimate';
import { Grid } from '../../../../components/DataGrid';

const rows: GridRowsProp = [
    { id: 1, name: 'Hello', cpf: 'World' },
    { id: 2, name: 'DataGridPro', cpf: 'is Awesome' },
    { id: 4, name: 'MUI 2', cpf: 'is Amazing' },
    { id: 5, name: 'MUI 3', cpf: 'is Amazing' },
    { id: 6, name: 'MUI 4', cpf: 'is Amazing' },
    { id: 7, name: 'MUI 5', cpf: 'is Amazing' },
    { id: 8, name: 'MUI 6', cpf: 'is Amazing' },
    { id: 9, name: 'MUI 7', cpf: 'is Amazing' },
    { id: 10, name: 'MUI 8', cpf: 'is Amazing' },
    { id: 11, name: 'MUI 0', cpf: 'is Amazing' },
];

const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', flex: 1 },
    { field: 'cpf', headerName: 'CPF', flex: 1 },
];

export const RegistrationOfDeliveryman: React.FC = () => (
    <ContentAnimate>
        <div className="container-registration">
            <div className="container-registration__header">
                <div className="container-registration__header__title">
                    <ButtonBack
                        marginRight={16}
                    />

                    <Typography
                        text="Entregadores"
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

            <Grid
                rows={rows}
                columns={columns}
                onEdit={(item) => console.log(item, 'edit')}
                onDelete={(item) => console.log(item, 'delete')}
            />

        </div>
    </ContentAnimate>
);
