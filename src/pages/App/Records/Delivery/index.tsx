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
import { accountId } from '../../../../firebase/firestore/Account';
import { IPerson } from '../../../../models/Person';
import { TRegistrationType } from '../../../../models/types';

const columns: GridColDef[] = [
    { field: 'collectStatus', headerName: 'Coleta', flex: 1 },
    { field: 'deliveryStatus', headerName: 'Entrega', flex: 1 },
    { field: 'deliveryman', headerName: 'Entregador', flex: 1 },
    { field: 'deliveryValue', headerName: 'Valor da Entrega', flex: 1 },
];

export const RegistrationOfDelivery: React.FC = () => {
    const [registerIsVisible, setRegisterIsVisible] = useState(false);
    const [typeRegister, setTypeRegister] = useState<TRegistrationType>('CREATE');

    const [collectionsAndDeliveries, setCollectionsAndDeliveries] = useState<GridRowsProp<IPerson>>([]);

    useEffect(() => {
        const queryCollection = query(collection(dbFirestore, 'contas', accountId, 'coletas_entregas'));

        const dataList = onSnapshot(queryCollection, (snapShot) => {
            snapShot.docChanges().forEach((change) => {
                const doc = Object.assign(change.doc.data(), { id: change.doc.id });

                switch (change.type) {
                    case 'added':
                        setCollectionsAndDeliveries((prevState) => [...prevState, {
                            id: doc.id,
                            name: doc.nome,
                            phone: doc.celular,
                            cpf: doc?.cpf || '',
                            rg: doc?.rg || '',
                            userRef: doc?.usario_ref || '',
                            address: {
                                zipCode: doc?.endereco?.cep || '',
                                district: doc?.endereco?.bairro || '',
                                complement: doc?.endereco?.complemento || '',
                                street: doc?.endereco?.logradouro || '',
                                country: doc?.endereco?.pais || '',
                                ref: doc?.endereco?.ref || '',
                                reference: doc?.endereco?.referencia || '',
                                number: doc?.endereco?.numero || '',
                                state: doc?.endereco?.uf || '',
                                city: {
                                    name: doc?.endereco?.cidade?.nome || '',
                                    ref: doc?.endereco?.cidade?.ref || '',
                                },
                            },
                        } as IPerson]);
                        break;

                    case 'removed':
                        setCollectionsAndDeliveries((prevState) => prevState.filter((data) => data.id !== doc.id));
                        break;

                    case 'modified': {
                        setCollectionsAndDeliveries((prevState) => prevState.filter((data) => data.id !== doc.id));
                        setCollectionsAndDeliveries((prevState) => [...prevState, {
                            id: doc.id,
                            name: doc.nome,
                            phone: doc.celular,
                            cpf: doc?.cpf || '',
                            rg: doc?.rg || '',
                            userRef: doc?.usario_ref || '',
                            address: {
                                zipCode: doc?.endereco?.cep || '',
                                district: doc?.endereco?.bairro || '',
                                complement: doc?.endereco?.complemento || '',
                                street: doc?.endereco?.logradouro || '',
                                country: doc?.endereco?.pais || '',
                                ref: doc?.endereco?.ref || '',
                                reference: doc?.endereco?.referencia || '',
                                number: doc?.endereco?.numero || '',
                                state: doc?.endereco?.uf || '',
                                city: {
                                    name: doc?.endereco?.cidade?.nome || '',
                                    ref: doc?.endereco?.cidade?.ref || '',
                                },
                            },
                        } as IPerson]);
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
