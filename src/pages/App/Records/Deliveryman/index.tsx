import React, { useCallback, useEffect, useState } from 'react';
import { GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { ButtonBack } from '../../../../components/ButtonBack';
import { ButtonPrimary } from '../../../../components/ButtonPrimary';
import { Input } from '../../../../components/Input';
import { Typography } from '../../../../components/Typography';
import { ContentAnimate } from '../../../../components/ContentAnimate';
import { Grid } from '../../../../components/DataGrid';
import { RegisterDeliveryman } from '../../../../components/RegisterDeliveryman';
import { TRegistrationType } from '../../../../models/types';
import { dbFirestore } from '../../../../firebase/config';
import { formattedCPF, formattedPhone } from '../../../../utils/LIB';
import { IGetDeliveryman } from '../../../../firebase/firestore/Deliveryman';
import { useWindowSize } from '../../../../hooks/useWindowSize';

const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', flex: 1, minWidth: 150 },
    { field: 'cpf', headerName: 'CPF', flex: 1, minWidth: 100 },
    { field: 'cnh', headerName: 'CNH', flex: 1, minWidth: 100 },
    { field: 'phone', headerName: 'Celular', flex: 1, minWidth: 120 },
];

export const RegistrationOfDeliveryman: React.FC = () => {
    const [registerIsVisible, setRegisterIsVisible] = useState(false);
    const [typeRegister, setTypeRegister] = useState<TRegistrationType>('CREATE');

    const [deliveryman, setDeliveryman] = useState<GridRowsProp<IGetDeliveryman>>([]);

    const { width } = useWindowSize();

    useEffect(() => {
        const queryCollection = query(collection(dbFirestore, 'entregadores'));
        const dataList = onSnapshot(queryCollection, (snapShot) => {
            snapShot.docChanges().forEach((change) => {
                const doc = Object.assign(change.doc.data(), { id: change.doc.id });

                switch (change.type) {
                    case 'added':
                        setDeliveryman((prevState) => [...prevState, {
                            id: doc?.id,
                            cnh: doc?.cnh,
                            cpf: formattedCPF(doc?.cpf),
                            name: doc?.nome,
                            email: doc?.email,
                            phone: formattedPhone(doc?.celular),
                            licensePlate: doc?.emplacamento,
                            citiesServed: doc?.cidadesAtendidas?.map((item: any) => ({
                                citiesName: item.nome,
                                collectionAndDeliveryId: item.idCidade,
                            })),
                        }]);
                        break;

                    case 'removed':
                        setDeliveryman((prevState) => prevState.filter((data) => data.id !== doc.id));
                        break;

                    case 'modified': {
                        setDeliveryman((prevState) => prevState.filter((data) => data.id !== doc.id));
                        setDeliveryman((prevState) => [...prevState, {
                            id: doc?.id,
                            cnh: doc?.cnh,
                            cpf: formattedCPF(doc?.cpf),
                            name: doc?.nome,
                            email: doc?.email,
                            phone: formattedPhone(doc?.celular),
                            licensePlate: doc?.emplacamento,
                            citiesServed: doc?.cidadesAtendidas?.map((item: any) => ({
                                citiesName: item.nome,
                                collectionAndDeliveryId: item.idCidade,
                            })),
                        }]);
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
                                text="Entregadores"
                                type="Title"
                            />
                        </div>

                        <ButtonPrimary
                            title="Adicionar"
                            width={width && width > 700 ? 152 : undefined}
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
                        rows={deliveryman}
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
