import { Formik } from 'formik';
import React, { useCallback, useState } from 'react';
import * as Yup from 'yup';
import { TRegistrationType } from '../../models/types';
import { formattedCurrency } from '../../utils/LIB';
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

export const RegisterDeliveryman: React.FC<IRegisterDeliveryman> = ({ isVisible, onClose, type }) => {
    const [loading, setLoading] = useState(false);

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Informe um nome para empresa'),

        description: Yup.string()
            .required('Informe a descrição do produto'),

        categoryId: Yup.string()
            .required('Selecione a categoria do produto'),

        price: Yup.string()
            .required('Informe o preço do produto')
            .test('price', 'Informe um preço para o produto', (value) =>
                (value ? value !== '0' : false)),
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
                    amount: 0,
                    cpf: '',
                    cnh: '',
                    licensePlate: '',
                    phone: '',
                }}
                onSubmit={({ amount, cnh, cpf, licensePlate, name, phone }) => {
                    handleSubmitRegister();
                }}
            >
                {({ handleChange, handleSubmit, values, errors }) => (
                    <form className="container-form-register-deliveryman">
                        <div className="container-form-register-deliveryman__row-1">
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
                                currency
                                disabled={loading}
                                required
                                label="Valor"
                                onChange={handleChange('amount')}
                                value={formattedCurrency(values.amount)}
                                placeholder="R$ 0,00"
                                type="text"
                                marginTop={8}
                                error={errors.amount}
                            />
                        </div>

                        <div className="container-form-register-deliveryman__row-2">
                            <Input
                                disabled={loading}
                                required
                                label="CPF"
                                placeholder="Informe o CPF"
                                onChange={handleChange('cpf')}
                                value={values.cpf}
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
                                value={values.licensePlate}
                                type="text"
                                marginTop={8}
                                error={errors.licensePlate}
                            />

                            <Input
                                disabled={loading}
                                required
                                label="Celular"
                                placeholder="Informe o Celular"
                                onChange={handleChange('phone')}
                                value={values.phone}
                                type="text"
                                marginTop={8}
                                error={errors.phone}
                            />
                        </div>

                        <InputSelectTip
                            required
                            label="Cidades atendidas"
                            marginTop={16}
                            marginBottom={24}
                            placeholder="Informe as cidade atendidas"
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
