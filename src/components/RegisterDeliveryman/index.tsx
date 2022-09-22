import React, { useCallback, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { setDeliveryman } from '../../firebase/firestore/Deliveryman';
import { TRegistrationType } from '../../models/types';
import { formattedCPF, formattedLicensePlate, formattedPhone, removeMask } from '../../utils/LIB';
import { ButtonPrimary } from '../ButtonPrimary';
import { Input } from '../Input';
// import { InputSelectTip, ISelectItems } from '../InputSelect';
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
    email: string;
    licensePlate: string;
    phone: string;
}

export const RegisterDeliveryman: React.FC<IRegisterDeliveryman> = ({ isVisible, onClose }) => {
    const [loading, setLoading] = useState(false);

    const [messageIsVisible, setMessageIsVisible] = useState<boolean>(false);
    const [message, setMessage] = useState('');

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Informe o nome do entregador'),
        email: Yup.string()
            .email()
            .required('Informe o email do entregador'),
        cpf: Yup.string()
            .required('Informe o cpf do entregador'),
        cnh: Yup.string()
            .required('Informe a cnh do entregador'),
        phone: Yup.string()
            .required('Informe o celular do entregador'),
    });

    const handleSubmitRegister = useCallback(async (data: IDataRegister) => {
        setLoading(true);

        setDeliveryman({
            phone: data.phone,
            name: data.name,
            cnh: data.cnh,
            cpf: data.cpf,
            email: data.email,
            licensePlate: data.licensePlate,
        })
            .then(() => {
                setLoading(false);
                onClose(false);
            })
            .catch((error) => {
                setLoading(false);
                setMessage(error.message);
                setMessageIsVisible(true);
            });
    }, []);

    return (
        <>
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
                        email: '',
                    }}
                    onSubmit={({ cnh, cpf, licensePlate, name, phone, email }) => {
                        handleSubmitRegister({
                            cnh,
                            cpf: removeMask(cpf),
                            licensePlate,
                            name,
                            email,
                            phone: removeMask(phone),
                        });
                    }}
                >
                    {({ handleChange, handleSubmit, values, errors }) => (
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

                            <Input
                                disabled={loading}
                                required
                                label="E-mail"
                                onChange={handleChange('email')}
                                value={values.email}
                                placeholder="Informe o email do entregador"
                                type="text"
                                marginTop={8}
                                error={errors.email}
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

                            <ButtonPrimary
                                title="Salvar"
                                onClick={handleSubmit}
                                marginTop={16}
                            />
                        </form>
                    )}
                </Formik>
            </Modal>

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
        </>
    );
};
