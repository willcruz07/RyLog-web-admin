import { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ButtonBack } from '../../../../components/ButtonBack';
import { ButtonPrimary } from '../../../../components/ButtonPrimary';
import { ContentAnimate } from '../../../../components/ContentAnimate';
import { Grid } from '../../../../components/DataGrid';
import { Input } from '../../../../components/Input';
import { Dialog } from '../../../../components/Message';
import { RegisterCollectionAndDeliveries } from '../../../../components/RegisterCollectionAndDeliveries';
import { Typography } from '../../../../components/Typography';
import { dbFirestore } from '../../../../firebase/config';
import { deleteRoute } from '../../../../firebase/firestore/CollectAndDeliveries';
import { TRegistrationType } from '../../../../models/types';
import { formattedCurrency } from '../../../../utils/LIB';

interface ICity {
    id: string;
    from: string;
    to: string;
    collectionValue: string;
    deliveryValue: string;
}

const columns: GridColDef[] = [
    { field: 'from', headerName: 'De', flex: 1 },
    { field: 'to', headerName: 'Para', flex: 1 },
    { field: 'collectionValue', headerName: 'Valor da Coleta', flex: 1 },
    { field: 'deliveryValue', headerName: 'Valor da Entrega', flex: 1 },
];

export const RegistrationOfCities: React.FC = () => {
    const [registerIsVisible, setRegisterIsVisible] = useState(false);
    const [typeRegister, setTypeRegister] = useState<TRegistrationType>('CREATE');

    const [collectionsAndDeliveries, setCollectionsAndDeliveries] = useState<GridRowsProp<ICity>>([]);
    const [messageDeleteIsVisible, setMessageDeleteIsVisible] = useState<boolean>(false);
    const [messageDelete, setMessageDelete] = useState<string>('');

    const [search, setSearch] = useState<string>('');

    const [dataSelected, setDataSelected] = useState<ICity>();

    useEffect(() => {
        const queryCollection = query(collection(dbFirestore, 'valores_de_coletas_entregas'));
        const dataList = onSnapshot(queryCollection, (snapShot) => {
            snapShot.docChanges().forEach((change) => {
                const doc = Object.assign(change.doc.data(), { id: change.doc.id });

                switch (change.type) {
                    case 'added':
                        setCollectionsAndDeliveries((prevState) => [...prevState, {
                            id: doc.id,
                            collectionValue: formattedCurrency(doc.valor_coleta),
                            deliveryValue: formattedCurrency(doc.valor_entrega),
                            from: doc.origem.nome,
                            to: doc.destino.nome,
                        } as ICity]);
                        break;

                    case 'removed':
                        setCollectionsAndDeliveries((prevState) => prevState.filter((data) => data.id !== doc.id));
                        break;

                    case 'modified': {
                        setCollectionsAndDeliveries((prevState) => prevState.filter((data) => data.id !== doc.id));
                        setCollectionsAndDeliveries((prevState) => [...prevState, {
                            id: doc.id,
                            collectionValue: formattedCurrency(doc.valor_coleta),
                            deliveryValue: formattedCurrency(doc.valor_entrega),
                            from: doc.origem.nome,
                            to: doc.destino.nome,
                        } as ICity]);
                        break;
                    }
                }
            });
        });

        return () => dataList();
    }, []);

    const handleNewRegister = useCallback(() => {
        setTypeRegister('CREATE');
        setDataSelected(undefined);
        setRegisterIsVisible(true);
    }, []);

    const handleUpdateRoute = useCallback((item: ICity) => {
        setTypeRegister('UPDATE');

        setDataSelected(item);

        setRegisterIsVisible(true);
    }, []);

    const handleDeleteRegister = useCallback((data: ICity) => {
        setDataSelected(data);
        setMessageDelete(`Deseja realmente deletar esta rota de ${data.from} para ${data.to} ?`);
        setMessageDeleteIsVisible(true);
    }, []);

    const handleRemoveRoute = useCallback(async () => {
        await deleteRoute(dataSelected as any);
        setMessageDeleteIsVisible(false);
    }, [dataSelected]);

    const filteredCollectionAndDeliveries = useMemo(() => collectionsAndDeliveries.filter((collection) => {
        const values = Object.values(collection).join('').toLowerCase();
        return values.includes(search.toLowerCase());
    }), [collectionsAndDeliveries, search]);

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
                                text="Cadastro de rotas"
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
                            onChange={(value) => setSearch(value)}
                            value={search}
                            type="text"
                            icon="search"
                            placeholder="Digite sua pesquisa..."
                        />
                    </div>

                    <Grid
                        rows={filteredCollectionAndDeliveries}
                        columns={columns}
                        onDelete={(item) => handleDeleteRegister(item)}
                        onEdit={(item) => handleUpdateRoute(item)}
                    />

                </div>
            </ContentAnimate>

            <RegisterCollectionAndDeliveries
                isVisible={registerIsVisible}
                onClose={setRegisterIsVisible}
                type={typeRegister}
                data={dataSelected ? {
                    collectionAmount: dataSelected.collectionValue,
                    deliveryAmount: dataSelected.deliveryValue,
                    from: dataSelected.from,
                    to: dataSelected.to,
                    id: dataSelected.id,
                } : undefined}
            />

            <Dialog
                isVisible={messageDeleteIsVisible}
                message={messageDelete}
                onAccept={handleRemoveRoute}
                onDismiss={() => setMessageDeleteIsVisible(false)}
                title="Deletar rota"
            />

        </>
    );
};
