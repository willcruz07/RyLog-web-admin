import { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import React, { useCallback, useEffect, useState } from 'react';
import { ButtonBack } from '../../../../components/ButtonBack';
import { ButtonPrimary } from '../../../../components/ButtonPrimary';
import { ContentAnimate } from '../../../../components/ContentAnimate';
import { Grid } from '../../../../components/DataGrid';
import { Input } from '../../../../components/Input';
import { RegisterCollectionAndDeliveries } from '../../../../components/RegisterCollectionAndDeliveries';
import { Typography } from '../../../../components/Typography';
import { getCollectionsAndDeliveries } from '../../../../firebase/firestore/CollectAndDeliveries';
import { ICollectionsAndDeliveries } from '../../../../models/CollectionsAndDeliveries';
import { TRegistrationType } from '../../../../models/types';

const columns: GridColDef[] = [
    { field: 'collectStatus', headerName: 'Status da coleta', flex: 1 },
    { field: 'period', headerName: 'Período', flex: 1 },
    {
        field: 'senderCity',
        headerName: 'Cidade',
        flex: 1,
        renderCell: (params) => (
            <div>{params.row?.sender?.address?.city?.name}</div>
        ),
    },
    {
        field: 'senderDistrict',
        headerName: 'Bairro',
        flex: 1,
        renderCell: (params) => (
            <div>{params.row?.sender?.address?.district}</div>
        ),
    },
    {
        field: 'deliveryman',
        headerName: 'Entregador',
        flex: 1,
        renderCell: (params) => (
            <div>{params.row?.deliverymanCollect?.name}</div>
        ),
    },
];

export const RegistrationOfDelivery: React.FC = () => {
    const [registerIsVisible, setRegisterIsVisible] = useState(false);
    const [typeRegister, setTypeRegister] = useState<TRegistrationType>('CREATE');
    const [loading, setLoading] = useState(true);

    const [collectionsAndDeliveries, setCollectionsAndDeliveries] = useState<GridRowsProp<ICollectionsAndDeliveries>>([]);

    useEffect(() => {
        getCollectionsAndDeliveries()
            .then((data) => data && setCollectionsAndDeliveries(data))
            .finally(() => setLoading(false));
    }, []);

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
                                text="Direcionar coletas e entregas"
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
                        rows={collectionsAndDeliveries}
                        columns={columns}
                        loading={loading}
                        checkboxSelection
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
