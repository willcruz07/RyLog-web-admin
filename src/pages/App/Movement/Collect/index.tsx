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
import { LoaderFullScreen } from '../../../../components/Loader';
import { Dialog } from '../../../../components/Message';
import { RegisterDeliverymanInCollectionAndDeliveries } from '../../../../components/RegisterDeliverymanInCollectionAndDeliveries';
import { ShowCollectAndDelivery } from '../../../../components/ShowCollectAndDelivery';
import { Typography } from '../../../../components/Typography';
import { getCollectionsAndDeliveries, removeDeliveryman } from '../../../../firebase/firestore/CollectAndDeliveries';
import { ICollectionsAndDeliveries } from '../../../../models/CollectionsAndDeliveries';
import { dateTimeToStr, getEndOfWeek, getStartOfWeek } from '../../../../utils/LIB';
import './styles.scss';

const columns: GridColDef[] = [
    {
        field: 'date',
        headerName: 'Data',
        width: 110,
        renderCell: (params) => (
            <div>{dateTimeToStr(params.row?.date)}</div>
        ),
    },
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

const statusList = [
    { label: 'Pendente', value: 'pending' },
    { label: 'Cancelada', value: 'cancel' },
    { label: 'Confirmada', value: 'Confirm' },
    { label: 'Realizada', value: 'ok' },
    { label: 'Insucesso', value: 'insuccess' },
];

const periodList = [
    { label: 'Manhã', value: 'morning' },
    { label: 'Tarde', value: 'afternoon' },
    { label: 'Noite', value: 'night' },
];

export const RegistrationOfCollect: React.FC = () => {
    const [registerIsVisible, setRegisterIsVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const [initialDate, setInitialDate] = useState<Date>(getStartOfWeek());
    const [finalDate, setFinalDate] = useState<Date>(getEndOfWeek());

    const [statusSelected, setStatusSelected] = useState('');
    const [periodSelected, setPeriodSelected] = useState('');

    const [collectionsSelected, setCollectionsSelected] = useState<GridSelectionModel>([]);
    const [pendingSelected, setPendingSelected] = useState(false);

    const [collectionsAndDeliveries, setCollectionsAndDeliveries] = useState<GridRowsProp<ICollectionsAndDeliveries>>([]);
    const [fullCollectionsAndDeliveries, setFullCollectionsAndDeliveries] = useState<GridRowsProp<ICollectionsAndDeliveries>>([]);

    const [showDataCollect, setShowDataCollect] = useState<boolean>(false);
    const [dataCollectSelected, setDataCollectSelected] = useState<ICollectionsAndDeliveries>();

    const [messageDeleteIsVisible, setMessageDeleteIsVisible] = useState<boolean>(false);
    const [messageDelete, setMessageDelete] = useState<string>('');

    useEffect(() => {
        loadingCollectionsAndDeliveries();
    }, []);

    const loadingCollectionsAndDeliveries = () => {
        setLoading(true);

        getCollectionsAndDeliveries('COLLECT', {
            initialDate,
            finalDate,
        })
            .then((data) => {
                const period = periodList.find((item) => item.value.toLowerCase() === periodSelected.toLowerCase())?.label.toLowerCase() ?? '';
                const status = statusList.find((item) => item.value.toLowerCase() === statusSelected.toLowerCase())?.label.toLowerCase() ?? '';

                const response = data
                    .sort((a, b) => b.date.getTime() - a.date.getTime())
                    .filter((item) => {
                        if (period && status) {
                            return item.period.toLowerCase() === period && item.collectStatus.toLowerCase() === status;
                        }

                        if (period) {
                            return item.period.toLowerCase() === period;
                        }

                        if (status) {
                            return item.collectStatus.toLowerCase() === status;
                        }

                        return item;
                    });

                setCollectionsAndDeliveries(response);
                setFullCollectionsAndDeliveries(response);
            })
            .finally(() => setLoading(false));
    };

    const handleNewRegister = useCallback(() => {
        setRegisterIsVisible(true);
    }, []);

    const handleChangeFilter = useCallback(() => {
        loadingCollectionsAndDeliveries();
    }, [initialDate, finalDate, statusSelected, periodSelected]);

    const handleFilterGrid = (text: string) => {
        const list = fullCollectionsAndDeliveries.filter((item) => (
            item.sender.address.district.toLowerCase().includes(text.toLowerCase()) ||
            item.sender.address.city.name.toLowerCase().includes(text.toLowerCase()) ||
            item.deliverymanCollect?.name.toLocaleLowerCase().includes(text.toLowerCase()) ||
            item.collectStatus.toLowerCase().includes(text.toLowerCase())
        ));

        setCollectionsAndDeliveries(list);
        setSearch(text);
    };

    const handleRemoveDeliveryman = useCallback((data: ICollectionsAndDeliveries) => {
        setDataCollectSelected(data);
        setMessageDelete(`Deseja realmente remover o entregador ${data?.deliverymanDelivery?.name} ?`);
        setMessageDeleteIsVisible(true);
    }, []);

    const handleExecRemove = async () => {
        if (dataCollectSelected) {
            await removeDeliveryman(dataCollectSelected, 'COLLECT');
        }
        setMessageDeleteIsVisible(false);
        loadingCollectionsAndDeliveries();
    };

    const validateRowSelected = (value: string): boolean => !(['CANCELADA', 'CONFIRMADA', 'REALIZADA']).includes(value);

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
                            marginBottom={8}
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

                            <div className="container-autocomplete-status-collect">
                                <InputSelectAutoComplete
                                    items={statusList}
                                    label="Status"
                                    placeholder="Status da coleta"
                                    selectedValues={statusSelected}
                                    setSelectedValues={(value) => setStatusSelected(value)}
                                    marginBottom={8}
                                />
                            </div>

                            <div className="container-autocomplete-period-collect">
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
                            title="Filtrar apenas coletas sem entregador"
                            value={pendingSelected}
                            onChecked={setPendingSelected}
                            marginTop={8}
                        />

                    </div>

                    <Grid
                        rows={collectionsAndDeliveries.filter((item) => (pendingSelected ? item.deliverymanDelivery?.name === '' : item))}
                        columns={columns}
                        loading={loading}
                        checkboxSelection
                        isRowSelectable={(params) => validateRowSelected(params.row.collectStatus)}
                        onDelete={(item) => handleRemoveDeliveryman(item)}
                        selectionModel={collectionsSelected}
                        onSetSelectionModel={setCollectionsSelected}
                        onViewing={(item) => {
                            setDataCollectSelected(item);
                            setShowDataCollect(true);
                        }}
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

            {dataCollectSelected && (
                <ShowCollectAndDelivery
                    isVisible={showDataCollect}
                    onClose={setShowDataCollect}
                    data={dataCollectSelected}
                    type="COLLECT"
                />
            )}

            <Dialog
                isVisible={messageDeleteIsVisible}
                message={messageDelete}
                onAccept={handleExecRemove}
                onDismiss={() => setMessageDeleteIsVisible(false)}
                title="Remover entregador"
            />

            <LoaderFullScreen isVisible={loading} />

        </>
    );
};
