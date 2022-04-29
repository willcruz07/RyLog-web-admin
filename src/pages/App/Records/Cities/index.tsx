import { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import React from 'react';
import { ButtonBack } from '../../../../components/ButtonBack';
import { ButtonPrimary } from '../../../../components/ButtonPrimary';
import { ContentAnimate } from '../../../../components/ContentAnimate';
import { Grid } from '../../../../components/DataGrid';
import { Input } from '../../../../components/Input';
import { Typography } from '../../../../components/Typography';

const rows: GridRowsProp = [
    { id: 1, name: 'Hello', cpf: 'World' },
    { id: 2, name: 'DataGridPro', cpf: 'is Awesome' },
    { id: 3, name: 'MUI', cpf: 'is Amazing' },
];

const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', flex: 1 },
    { field: 'cpf', headerName: 'CPF', flex: 1 },
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

            <Grid
                rows={rows}
                columns={columns}
            />

        </div>
    </ContentAnimate>
);
