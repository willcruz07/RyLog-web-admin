import { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import React, { useCallback, useState } from 'react';
import { ButtonBack } from '../../../../components/ButtonBack';
import { ButtonPrimary } from '../../../../components/ButtonPrimary';
import { ContentAnimate } from '../../../../components/ContentAnimate';
import { Grid } from '../../../../components/DataGrid';
import { Input } from '../../../../components/Input';
import { RegisterCollectionAndDeliveries } from '../../../../components/RegisterCollectionAndDeliveries';
import { Typography } from '../../../../components/Typography';
import { TRegistrationType } from '../../../../models/types';

const rows: GridRowsProp = [
    { id: 1, from: 'Rio de Janeiro', to: 'Teresópolis', collectionValue: 'R$ 8,70', deliveryValue: 'R$ 9,10' },
    { id: 2, from: 'Teresópolis', to: 'Friburgo', collectionValue: 'R$ 50,00', deliveryValue: 'R$ 91,10' },
    { id: 3, from: 'Rio de Janeiro', to: 'Friburgo', collectionValue: 'R$ 8,70', deliveryValue: 'R$ 9,10' },
    { id: 4, from: 'Petropolis', to: 'Teresópolis', collectionValue: 'R$ 8,70', deliveryValue: 'R$ 9,10' },

];

const columns: GridColDef[] = [
    { field: 'from', headerName: 'De', flex: 1 },
    { field: 'to', headerName: 'Para', flex: 1 },
    { field: 'collectionValue', headerName: 'Valor da Coleta', flex: 1 },
    { field: 'deliveryValue', headerName: 'Valor da Entrega', flex: 1 },
];

export const RegistrationOfCities: React.FC = () => {
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
                                text="Coletas e entregas"
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
                        onDelete={(item) => console.log(item, 'delete')}
                        onEdit={(item) => console.log(item, 'edit')}
                    />

                </div>
            </ContentAnimate>

            <RegisterCollectionAndDeliveries
                isVisible={registerIsVisible}
                onClose={setRegisterIsVisible}
                type={typeRegister}
            />
        </>
    );
};
