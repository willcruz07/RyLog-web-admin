import React, { useCallback, useState } from 'react';
import { GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { ButtonBack } from '../../../../components/ButtonBack';
import { ButtonPrimary } from '../../../../components/ButtonPrimary';
import { Input } from '../../../../components/Input';
import { Typography } from '../../../../components/Typography';
import { ContentAnimate } from '../../../../components/ContentAnimate';
import { Grid } from '../../../../components/DataGrid';
import { RegisterDeliveryman } from '../../../../components/RegisterDeliveryman';
import { TRegistrationType } from '../../../../models/types';

const rows: GridRowsProp = [
    { id: 1, name: 'Teste 1', cpf: '123.234.123-44', cnh: '23312332', phone: '(21) 98312-4522' },
    { id: 2, name: 'Teste 2', cpf: '123.234.123-44', cnh: '23312332', phone: '(21) 98312-4522' },
    { id: 3, name: 'Teste 3', cpf: '123.234.123-44', cnh: '23312332', phone: '(21) 98312-4522' },
    { id: 4, name: 'Teste 4', cpf: '123.234.123-44', cnh: '23312332', phone: '(21) 98312-4522' },
    { id: 5, name: 'Teste 5', cpf: '123.234.123-44', cnh: '23312332', phone: '(21) 98312-4522' },
    { id: 6, name: 'Teste 6', cpf: '123.234.123-44', cnh: '23312332', phone: '(21) 98312-4522' },
    { id: 7, name: 'Teste 7', cpf: '123.234.123-44', cnh: '23312332', phone: '(21) 98312-4522' },
    { id: 8, name: 'Teste 8', cpf: '123.234.123-44', cnh: '23312332', phone: '(21) 98312-4522' },
    { id: 9, name: 'Teste 9', cpf: '123.234.123-44', cnh: '23312332', phone: '(21) 98312-4522' },
    { id: 10, name: 'Teste 10', cpf: '123.234.123-44', cnh: '23312332', phone: '(21) 98312-4522' },
    { id: 11, name: 'Teste 10', cpf: '123.234.123-44', cnh: '23312332', phone: '(21) 98312-4522' },
    { id: 12, name: 'Teste 10', cpf: '123.234.123-44', cnh: '23312332', phone: '(21) 98312-4522' },
    { id: 13, name: 'Teste 10', cpf: '123.234.123-44', cnh: '23312332', phone: '(21) 98312-4522' },

];

const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', flex: 1 },
    { field: 'cpf', headerName: 'CPF', flex: 1 },
    { field: 'cnh', headerName: 'CNH', flex: 1 },
    { field: 'phone', headerName: 'Celular', flex: 1 },
];

export const RegistrationOfDeliveryman: React.FC = () => {
    const [registerIsVisible, setRegisterIsVisible] = useState(false);
    const [typeRegister, setTypeRegister] = useState<TRegistrationType>('CREATE');

    const handleNewRegister = useCallback(() => {
        setTypeRegister('CREATE');
        setRegisterIsVisible(true);
    }, []);

    return (
        <>
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
                            onClick={handleNewRegister}
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
                        onEdit={(item) => {
                            console.log(item, 'edit');
                            setTypeRegister('UPDATE');
                        }}
                        onDelete={(item) => console.log(item, 'delete')}
                    />

                </div>
            </ContentAnimate>

            <RegisterDeliveryman
                isVisible={registerIsVisible}
                onClose={setRegisterIsVisible}
                type={typeRegister}
            />
        </>
    );
};
