import { Formik } from 'formik';
import React, { useCallback, useState } from 'react';
import * as Yup from 'yup';
import { TRegistrationType } from '../../models/types';
import { formattedCPF, formattedLicensePlate, formattedPhone } from '../../utils/LIB';
import { ButtonPrimary } from '../ButtonPrimary';
import { Input } from '../Input';
import { InputSelectTip } from '../InputSelect';
import { Modal } from '../Modal';

import './styles.scss';

interface IRegisterDeliveryman {
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

export const RegisterDeliveryman: React.FC<IRegisterDeliveryman> = ({ isVisible, onClose }) => {
    const [loading, setLoading] = useState(false);

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
                    citiesServed: [],
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
                            items={city}
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
        </Modal>
    );
};
