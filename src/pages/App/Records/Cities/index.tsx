import { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import { ButtonBack } from '../../../../components/ButtonBack';
import { ButtonPrimary } from '../../../../components/ButtonPrimary';
import { ContentAnimate } from '../../../../components/ContentAnimate';
import { Grid } from '../../../../components/DataGrid';
import { Input } from '../../../../components/Input';
import { RegisterCollectionAndDeliveries } from '../../../../components/RegisterCollectionAndDeliveries';
import { Typography } from '../../../../components/Typography';
import { dbFirestore } from '../../../../firebase/config';
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

    useEffect(() => {
        const queryCollection = query(collection(dbFirestore, 'valores_de_coletas_entregas'));
        const dataList = onSnapshot(queryCollection, (snapShot) => {
            snapShot.docChanges().forEach((change) => {
                const doc = Object.assign(change.doc.data(), { id: change.doc.id });

                switch (change.type) {
                    case 'added':
                        setCollectionsAndDeliveries((prevState) => [...prevState, {
                            id: doc.id,
                            collectionValue: formattedCurrency(doc.valorDaColeta),
                            deliveryValue: formattedCurrency(doc.valorDaEntrega),
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
                            collectionValue: formattedCurrency(doc.valorDaColeta),
                            deliveryValue: formattedCurrency(doc.valorDaEntrega),
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
                        rows={collectionsAndDeliveries}
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
