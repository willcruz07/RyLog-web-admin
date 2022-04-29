import { Formik } from 'formik';
import React, { useCallback, useState } from 'react';
import * as Yup from 'yup';
import { TRegistrationType } from '../../models/types';
import { ButtonPrimary } from '../ButtonPrimary';
import { Input } from '../Input';
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

        thumbnail: Yup.string()
            .when(['thumbnailFile'], {
                is: (thumbnailFile: File) => thumbnailFile === undefined,
                then: Yup.string().required('É necessário selecionar uma para o produto'),
            }),
    });

    const handleSubmitRegister = useCallback(() => {

    }, []);

    return (
        <Modal
            isVisible={isVisible}
            onClose={onClose}
            title="Cadastro de Entregador"
            fullScreenMobile
        >
            <Formik
                validationSchema={validationSchema}
                initialValues={{
                    name: '',
                    Valor: 0,
                    cpf: '',
                    cnh: '',
                    licensePlate: '',
                    phone: '',
                }}
                onSubmit={({ Valor, cnh, cpf, licensePlate, name, phone }) => {
                    handleSubmitRegister();
                }}
            >
                {({ handleChange, handleSubmit, values, errors }) => (
                    <form>
                        <Input
                            disabled={loading}
                            required
                            label="Nome"
                            onChange={handleChange('name')}
                            value={values.name}
                            placeholder="Informe o nome do produto"
                            type="text"
                            marginTop={8}
                            error={errors.name}
                        />

                        <ButtonPrimary
                            title="Cadastrar"
                            onClick={() => {}}
                        />
                    </form>
                )}
            </Formik>
        </Modal>
    );
};
