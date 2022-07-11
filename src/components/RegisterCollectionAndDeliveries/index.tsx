import { Formik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { getCities, ICity } from '../../firebase/firestore/Cities';
import { TRegistrationType } from '../../models/types';
import { formattedCPF, formattedLicensePlate, formattedPhone } from '../../utils/LIB';
import { ButtonPrimary } from '../ButtonPrimary';
import { Input } from '../Input';
import { InputSelectTip, ISelectItems } from '../InputSelect';
import { InputSelectAutoComplete } from '../InputSelectAutoComplete';
import { LoaderFullScreen } from '../Loader';
import { Modal } from '../Modal';

import './styles.scss';

interface IRegisterCollectionAndDeliveries {
    isVisible: boolean;
    onClose(close: false): void;
    type: TRegistrationType;
}

const city = [
    {
        label: 'Rio de Janeiro - Arraial do cabo',
        value: '1',
    },
    {
        label: 'Teresópolis - Friburgo',
        value: '2',
    },
    {
        label: 'Friburgo - Petrópolis',
        value: '3',
    },
];

export const RegisterCollectionAndDeliveries: React.FC<IRegisterCollectionAndDeliveries> = ({ isVisible, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [cities, setCities] = useState<ISelectItems[]>([]);

    useEffect(() => {
        if (isVisible) {
            loadCities();
        }
    }, [isVisible]);

    const loadCities = async (): Promise<void> => {
        setLoading(true);

        const listOfCities = await getCities();

        if (listOfCities) {
            listOfCities.forEach((item) => {
                setCities((prevState) => [...prevState, {
                    label: item.name,
                    value: item.id,
                }]);
            });
        }

        setLoading(false);
    };

    console.log(cities);

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Informe o nome do entregador'),
    });

    const handleSubmitRegister = useCallback(() => {

    }, []);

    return (
        <Modal
            isVisible={isVisible}
            onClose={onClose}
            title="Coletas e Entregas"
            fullScreenMobile
        >
            <Formik
                validationSchema={validationSchema}
                initialValues={{
                    from: '',
                    to: '',
                    deliveryAmount: 0,
                    collectionAmount: 0,
                }}
                onSubmit={({ cnh, cpf, licensePlate, name, phone, citiesServed }) => {
                    console.log({
                        cnh,
                        cpf,
                        licensePlate,
                        name,
                        phone,
                        citiesServed,

                    });
                    // handleSubmitRegister();
                }}
            >
                {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
                    <form className="container-form-register-deliveryman">
                        {/* <InputSelectTip
                            required
                            label="De"
                            marginTop={16}
                            marginBottom={24}
                            items={cities}
                            selectedValues={values.from}
                            setSelectedValues={(values) => setFieldValue('from', values)}
                            multiple={false}
                        /> */}

                        <div className="container-form-register-deliveryman__row-2">

                            <InputSelectAutoComplete
                                items={cities}
                                label="De"
                                required
                                selectedValues={values.from}
                                setSelectedValues={handleChange('from')}
                            />

                            <InputSelectAutoComplete
                                items={cities}
                                label="De"
                                required
                                selectedValues={values.to}
                                setSelectedValues={handleChange('to')}
                            />
                        </div>
                        {/* <Input
                            disabled={loading}
                            required
                            label="Nome"
                            onChange={handleChange('name')}
                            value={values.name}
                            placeholder="Informe o nome do entregador"
                            type="text"
                            marginTop={8}
                            error={errors.name}
                        /> */}

                        {/* <div className="container-form-register-deliveryman__row-2">
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
                        </div> */}

                        {/* <InputSelectTip
                            required
                            label="Cidades atendidas"
                            marginTop={16}
                            marginBottom={24}
                            items={city}
                            selectedValues={values.citiesServed}
                            setSelectedValues={(values) => setFieldValue('citiesServed', values)}
                        /> */}

                        <ButtonPrimary
                            title="Salvar"
                            onClick={handleSubmit}
                        />
                    </form>
                )}
            </Formik>

            {/* <LoaderFullScreen isVisible={loading} /> */}
        </Modal>
    );
};
