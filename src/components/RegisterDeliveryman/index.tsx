import { Formik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { getCollectAndDeliveriesAmount } from '../../firebase/firestore/CollectAndDeliveries';
import { ICitiesServed, setDeliveryman } from '../../firebase/firestore/Deliveryman';
import { IGetCollectDeliveries } from '../../models/AmountCollectionAndDeliveries';
import { TRegistrationType } from '../../models/types';
import { formattedCPF, formattedLicensePlate, formattedPhone, removeMask } from '../../utils/LIB';
import { ButtonPrimary } from '../ButtonPrimary';
import { Input } from '../Input';
import { InputSelectTip, ISelectItems } from '../InputSelect';
import { LoaderFullScreen } from '../Loader';
import { Message } from '../Message';
import { Modal } from '../Modal';

import './styles.scss';

interface IRegisterDeliveryman {
    isVisible: boolean;
    onClose(close: false): void;
    type: TRegistrationType;
}

interface IDataRegister {
    name: string;
    cpf: string;
    cnh: string;
    // email: string;
    licensePlate: string;
    phone: string;
    citiesServed: string[];
}

export const RegisterDeliveryman: React.FC<IRegisterDeliveryman> = ({ isVisible, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [citiesServed, setCitiesServed] = useState<IGetCollectDeliveries[]>([]);
    const [listOfCities, setListOfCities] = useState<ISelectItems[]>([]);

    const [messageIsVisible, setMessageIsVisible] = useState<boolean>(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        loadCitiesServed();
    }, []);

    const loadCitiesServed = async () => {
        const cities = await getCollectAndDeliveriesAmount();
        if (cities) {
            setCitiesServed(cities);

            if (cities) {
                cities.forEach((item) => {
                    setListOfCities((prevState) => [...prevState, {
                        label: `${item.from.name} - ${item.to.name}`,
                        value: item.id,
                    }]);
                });
            }
        }
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Informe o nome do entregador'),
        cpf: Yup.string()
            .required('Informe o cpf do entregador'),
        cnh: Yup.string()
            .required('Informe a cnh do entregador'),
        phone: Yup.string()
            .required('Informe o celular do entregador'),
    });

    const handleSubmitRegister = useCallback(async (data: IDataRegister) => {
        setLoading(true);

        const listCitiesServed: ICitiesServed[] = [];

        citiesServed.forEach((item) => {
            if (data.citiesServed.includes(item.id)) {
                listCitiesServed.push({
                    citiesName: `${item.from.name} - ${item.to.name}`,
                    collectionAndDeliveryId: item.id,
                });
            }
        });

        setDeliveryman({
            phone: data.phone,
            name: data.name,
            cnh: data.cnh,
            cpf: data.cpf,
            // email: data.email,
            licensePlate: data.licensePlate,
            citiesServed: listCitiesServed,
        })
            .catch((error) => {
                setLoading(false);
                setMessage(error);
                setMessageIsVisible(true);
            })
            .then(() => {
                setLoading(false);
                onClose(false);
            });
    }, [citiesServed]);

    return (
        <Modal
            isVisible={isVisible}
            onClose={onClose}
            title="Adicionar Entregador"
            fullScreenMobile
        >
            <Formik
                validationSchema={validationSchema}
                initialValues={{
                    name: '',
                    cpf: '',
                    cnh: '',
                    licensePlate: '',
                    phone: '',
                    // email: '',
                    citiesServed: [],
                }}
                onSubmit={({ cnh, cpf, licensePlate, name, phone, citiesServed }) => {
                    handleSubmitRegister({
                        cnh,
                        cpf: removeMask(cpf),
                        licensePlate,
                        name,
                        // email,
                        phone: removeMask(phone),
                        citiesServed,
                    });
                }}
            >
                {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
                    <form className="container-form-register-deliveryman">
                        <Input
                            disabled={loading}
                            required
                            label="Nome"
                            onChange={handleChange('name')}
                            value={values.name}
                            placeholder="Informe o nome do entregador"
                            type="text"
                            marginTop={8}
                            error={errors.name}
                        />

                        {/* <Input
                            disabled={loading}
                            required
                            label="E-mail"
                            onChange={handleChange('email')}
                            value={values.email}
                            placeholder="Informe o email do entregador"
                            type="text"
                            marginTop={8}
                            error={errors.email}
                        /> */}

                        <div className="container-form-register-deliveryman__row-2">
                            <Input
                                disabled={loading}
                                required
                                label="CPF"
                                placeholder="Informe o CPF"
                                onChange={handleChange('cpf')}
                                maxLength={14}
                                value={formattedCPF(values.cpf)}
                                type="text"
                                marginTop={8}
                                error={errors.cpf}
                            />

                            <Input
                                disabled={loading}
                                required
                                label="CNH"
                                placeholder="Informe o CNH"
                                onChange={handleChange('cnh')}
                                value={values.cnh}
                                maxLength={11}
                                type="text"
                                marginTop={8}
                                error={errors.cnh}
                            />

                            <Input
                                disabled={loading}
                                required
                                label="Emplacamento"
                                placeholder="Informe o Emplacamento"
                                onChange={handleChange('licensePlate')}
                                value={formattedLicensePlate(values.licensePlate)}
                                type="text"
                                maxLength={8}
                                marginTop={8}
                                error={errors.licensePlate}
                            />

                            <Input
                                disabled={loading}
                                required
                                label="Celular"
                                placeholder="Informe o Celular"
                                onChange={handleChange('phone')}
                                value={formattedPhone(values.phone)}
                                type="text"
                                marginTop={8}
                                maxLength={15}
                                error={errors.phone}
                            />
                        </div>

                        <InputSelectTip
                            required
                            label="Cidades atendidas"
                            marginTop={16}
                            marginBottom={24}
                            placeholder="Informe as cidade atendidas"
                            items={listOfCities}
                            selectedValues={values.citiesServed}
                            setSelectedValues={(values) => setFieldValue('citiesServed', values)}
                            multiple
                        />

                        <ButtonPrimary
                            title="Salvar"
                            onClick={handleSubmit}
                        />
                    </form>
                )}
            </Formik>

            <Message
                isVisible={messageIsVisible}
                onClose={setMessageIsVisible}
                type="DANGER"
                message={message}
            />

            <LoaderFullScreen
                isVisible={loading}
                title="Cadastrando entregador"
            />
        </Modal>
    );
};
