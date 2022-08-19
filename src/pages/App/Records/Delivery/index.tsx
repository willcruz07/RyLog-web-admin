import { GridColDef, GridRowsProp, GridSelectionModel } from '@mui/x-data-grid';
import React, { useCallback, useEffect, useState } from 'react';
import { ButtonBack } from '../../../../components/ButtonBack';
import { ButtonPrimary } from '../../../../components/ButtonPrimary';
import { ButtonSecondary } from '../../../../components/ButtonSecondary';
import { Checkbox } from '../../../../components/Checkbox';
import { ContentAnimate } from '../../../../components/ContentAnimate';
import { Grid } from '../../../../components/DataGrid';
import { Input } from '../../../../components/Input';
import { InputDate } from '../../../../components/InputDate';
import { InputSelectAutoComplete } from '../../../../components/InputSelectAutoComplete';
import { RegisterDeliverymanInCollectionAndDeliveries } from '../../../../components/RegisterDeliverymanInCollectionAndDeliveries';
import { Typography } from '../../../../components/Typography';
import { getCollectionsAndDeliveries } from '../../../../firebase/firestore/CollectAndDeliveries';
import { ICollectionsAndDeliveries } from '../../../../models/CollectionsAndDeliveries';
import { getEndOfWeek, getStartOfWeek } from '../../../../utils/LIB';
import './styles.scss';

const columns: GridColDef[] = [
    { field: 'deliveryStatus', headerName: 'Status da coleta', width: 170 },
    { field: 'period', headerName: 'Período', width: 130 },
    {
        field: 'receiverCity',
        headerName: 'Cidade',
        flex: 1,
        minWidth: 150,
        renderCell: (params) => (
            <div>{params.row?.receiver?.address?.city?.name}</div>
        ),
    },
    {
        field: 'receiverDistrict',
        headerName: 'Bairro',
        flex: 1,
        minWidth: 150,
        renderCell: (params) => (
            <div>{params.row?.receiver?.address?.district}</div>
        ),
    },
    {
        field: 'deliveryman',
        headerName: 'Entregador',
        flex: 2,
        minWidth: 200,
        renderCell: (params) => (
            <div>{params.row?.deliverymanDelivery?.name}</div>
        ),
    },
];

const statusList = [
    { label: 'Pendente', value: 'pending' },
    { label: 'Cancelada', value: 'cancel' },
];

const periodList = [
    { label: 'Manhã', value: 'morning' },
    { label: 'Tarde', value: 'afternoon' },
    { label: 'Noite', value: 'night' },
];

export const RegistrationOfDelivery: React.FC = () => {
    const [registerIsVisible, setRegisterIsVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const [initialDate, setInitialDate] = useState<Date>(getStartOfWeek());
    const [finalDate, setFinalDate] = useState<Date>(getEndOfWeek());

    const [statusSelected, setStatusSelected] = useState('');
    const [periodSelected, setPeriodSelected] = useState('');

    const [deliveriesSelected, setDeliveriesSelected] = useState<GridSelectionModel>([]);
    const [pendingSelected, setPendingSelected] = useState(false);

    const [collectionsAndDeliveries, setCollectionsAndDeliveries] = useState<GridRowsProp<ICollectionsAndDeliveries>>([]);
    const [fullCollectionsAndDeliveries, setFullCollectionsAndDeliveries] = useState<GridRowsProp<ICollectionsAndDeliveries>>([]);

    useEffect(() => {
        loadingCollectionsAndDeliveries();
    }, []);

    const loadingCollectionsAndDeliveries = () => {
        setLoading(true);
        getCollectionsAndDeliveries('DELIVERY', {
            initialDate,
            finalDate,
        })
            .then((data) => {
                setCollectionsAndDeliveries(data);
                setFullCollectionsAndDeliveries(data);
            })
            .finally(() => setLoading(false));
    };

    const handleNewRegister = useCallback(() => {
        setRegisterIsVisible(true);
    }, []);

    const handleChangeFilter = useCallback(() => {
        loadingCollectionsAndDeliveries();
    }, []);

    const handleFilterGrid = (text: string) => {
        const list = fullCollectionsAndDeliveries.filter((item) => (
            item.receiver.address.district.toLowerCase().includes(text.toLowerCase()) ||
            item.receiver.address.city.name.toLowerCase().includes(text.toLowerCase()) ||
            item.deliverymanCollect?.name.toLocaleLowerCase().includes(text.toLowerCase())
        ));

        setCollectionsAndDeliveries(list);
        setSearch(text);
    };

    const validateRowSelected = (value: string): boolean => !(['CANCELADA', 'CONFIRMADA']).includes(value);

    console.log(collectionsAndDeliveries);

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
                                text="Direcionar entregas"
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

                        <div className="container-registration__row">
                            <InputDate
                                label="Data inicial"
                                value={initialDate}
                                onChange={setInitialDate}
                                marginRight={16}
                                marginBottom={8}
                            />

                            <InputDate
                                label="Data final"
                                value={finalDate}
                                onChange={setFinalDate}
                                marginRight={16}
                                marginBottom={8}
                            />

                            <div className="container-autocomplete-status-delivery">
                                <InputSelectAutoComplete
                                    items={statusList}
                                    label="Status"
                                    placeholder="Status da coleta"
                                    selectedValues={statusSelected}
                                    setSelectedValues={(value) => setStatusSelected(value)}
                                    marginBottom={8}
                                />
                            </div>

                            <div className="container-autocomplete-period-delivery">
                                <InputSelectAutoComplete
                                    items={periodList}
                                    label="Período"
                                    placeholder="Período da coleta"
                                    selectedValues={periodSelected}
                                    setSelectedValues={(value) => setPeriodSelected(value)}
                                    marginBottom={8}
                                />
                            </div>

                            <ButtonSecondary
                                title="Filtrar"
                                width={100}
                                onClick={handleChangeFilter}
                                marginBottom={8}
                            />
                        </div>

                        <Checkbox
                            title="Filtrar apenas entregas sem entregador"
                            value={pendingSelected}
                            onChecked={setPendingSelected}
                            marginTop={8}
                        />
                    </div>

                    <Grid
                        rows={collectionsAndDeliveries}
                        columns={columns}
                        loading={loading}
                        checkboxSelection
                        isRowSelectable={(params) => validateRowSelected(params.row.deliveryStatus)}
                        selectionModel={deliveriesSelected}
                        onSetSelectionModel={setDeliveriesSelected}
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
                listOfCollectionsAndDeliveries={deliveriesSelected as string[]}
                type="DELIVERY"
            />

        </>
    );
};
