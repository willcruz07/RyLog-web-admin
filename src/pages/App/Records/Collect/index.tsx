import { GridColDef, GridRowsProp, GridSelectionModel } from '@mui/x-data-grid';
import React, { useCallback, useEffect, useState } from 'react';
import { ButtonBack } from '../../../../components/ButtonBack';
import { ButtonPrimary } from '../../../../components/ButtonPrimary';
import { ContentAnimate } from '../../../../components/ContentAnimate';
import { Grid } from '../../../../components/DataGrid';
import { Input } from '../../../../components/Input';
import { RegisterDeliverymanInCollectionAndDeliveries } from '../../../../components/RegisterDeliverymanInCollectionAndDeliveries';
import { Typography } from '../../../../components/Typography';
import { getCollectionsAndDeliveries } from '../../../../firebase/firestore/CollectAndDeliveries';
import { ICollectionsAndDeliveries } from '../../../../models/CollectionsAndDeliveries';

const columns: GridColDef[] = [
    { field: 'collectStatus', headerName: 'Status da coleta', width: 170 },
    { field: 'period', headerName: 'Período', width: 130 },
    {
        field: 'senderCity',
        headerName: 'Cidade',
        flex: 1,
        minWidth: 150,
        renderCell: (params) => (
            <div>{params.row?.sender?.address?.city?.name}</div>
        ),
    },
    {
        field: 'senderDistrict',
        headerName: 'Bairro',
        minWidth: 150,
        flex: 1,
        renderCell: (params) => (
            <div>{params.row?.sender?.address?.district}</div>
        ),
    },
    {
        field: 'deliveryman',
        headerName: 'Entregador',
        minWidth: 200,
        flex: 2,
        renderCell: (params) => (
            <div>{params.row?.deliverymanCollect?.name}</div>
        ),
    },
];

export const RegistrationOfCollect: React.FC = () => {
    const [registerIsVisible, setRegisterIsVisible] = useState(false);
    // const [typeRegister, setTypeRegister] = useState<TRegistrationType>('CREATE');
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const [collectionsSelected, setCollectionsSelected] = useState<GridSelectionModel>([]);

    const [collectionsAndDeliveries, setCollectionsAndDeliveries] = useState<GridRowsProp<ICollectionsAndDeliveries>>([]);
    const [fullCollectionsAndDeliveries, setFullCollectionsAndDeliveries] = useState<GridRowsProp<ICollectionsAndDeliveries>>([]);

    useEffect(() => {
        loadingCollectionsAndDeliveries();
    }, []);

    const loadingCollectionsAndDeliveries = () => {
        setLoading(true);
        getCollectionsAndDeliveries('COLLECT')
            .then((data) => {
                setCollectionsAndDeliveries(data);
                setFullCollectionsAndDeliveries(data);
            })
            .finally(() => setLoading(false));
    };

    const handleNewRegister = useCallback(() => {
        setRegisterIsVisible(true);
    }, []);

    const handleFilterGrid = (text: string) => {
        const list = fullCollectionsAndDeliveries.filter((item) => (
            item.collectStatus.toLocaleLowerCase().includes(text.toLowerCase()) ||
            item.period.toLocaleLowerCase().includes(text.toLowerCase()) ||
            item.sender.address.district.toLowerCase().includes(text.toLowerCase()) ||
            item.sender.address.city.name.toLowerCase().includes(text.toLowerCase()) ||
            item.deliverymanCollect?.name.toLocaleLowerCase().includes(text.toLowerCase())
        ));

        setCollectionsAndDeliveries(list);
        setSearch(text);
    };

    const validateRowSelected = (value: string): boolean => !(['CANCELADA', 'CONFIRMADA']).includes(value);

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
                                text="Direcionar coletas"
                                type="Title"
                            />
                        </div>

                        <ButtonPrimary
                            title="Vincular entregador"
                            width={200}
                            onClick={handleNewRegister}
                        />
                    </div>
                    <div className="container-registration__search">
                        <Input
                            label="Pesquisar"
                            onChange={handleFilterGrid}
                            value={search}
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
                        isRowSelectable={(params) => validateRowSelected(params.row.collectStatus)}
                        selectionModel={collectionsSelected}
                        onSetSelectionModel={setCollectionsSelected}
                        onViewing={(item) => console.log(item, 'visualizar')}
                    />

                </div>
            </ContentAnimate>

            <RegisterDeliverymanInCollectionAndDeliveries
                isVisible={registerIsVisible}
                onClose={(data) => {
                    setRegisterIsVisible(false);
                    if (data) {
                        loadingCollectionsAndDeliveries();
                    }
                }}
                listOfCollectionsAndDeliveries={collectionsSelected as string[]}
                type="COLLECT"
            />

        </>
    );
};
