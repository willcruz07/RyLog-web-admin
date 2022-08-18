import { Formik } from 'formik';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
import { getCities, ICity } from '../../firebase/firestore/Cities';
import { addCollectAndDeliveriesAmount } from '../../firebase/firestore/CollectAndDeliveries';
import { TRegistrationType } from '../../models/types';
import { formattedCurrency } from '../../utils/LIB';
import { ButtonPrimary } from '../ButtonPrimary';
import { Input } from '../Input';
import { ISelectItems } from '../InputSelect';
import { InputSelectAutoComplete } from '../InputSelectAutoComplete';
import { LoaderFullScreen } from '../Loader';
import { Message } from '../Message';
import { Modal } from '../Modal';

import './styles.scss';

interface IRegisterCollectionAndDeliveries {
    isVisible: boolean;
    onClose(close: false): void;
    type: TRegistrationType;
}

interface IData {
    from: string;
    to: string;
    deliveryAmount: string;
    collectionAmount: string;
}

export const RegisterCollectionAndDeliveries: React.FC<IRegisterCollectionAndDeliveries> = ({ isVisible, onClose }) => {
    const [cities, setCities] = useState<ISelectItems[]>([]);
    const [listOfCity, setListOfCity] = useState<ICity[]>([]);

    const [loading, setLoading] = useState<boolean>(false);
    const [messageIsVisible, setMessageIsVisible] = useState<boolean>(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        loadCities();
    }, []);

    const loadCities = async (): Promise<void> => {
        const city = await getCities();
        if (city) {
            setListOfCity(city);

            if (city) {
                city.forEach((item) => {
                    setCities((prevState) => [...prevState, {
                        label: item.name,
                        value: item.id,
                    }]);
                });
            }
        }
    };

    const validationSchema = Yup.object().shape({
        from: Yup.string()
            .required('Informe a cidade origem'),
        to: Yup.string()
            .required('Informe a cidade destino'),
        deliveryAmount: Yup.string()
            .required('Informe o valor da entrega'),
        collectionAmount: Yup.string()
            .required('Informe o valor de coleta'),
    });

    const handleSubmitRegister = useCallback(async (data: IData) => {
        setLoading(true);

        addCollectAndDeliveriesAmount({
            to: listOfCity.filter((item) => item.id === data.to)[0],
            from: listOfCity.filter((item) => item.id === data.from)[0],
            collectionAmount: formattedCurrency(data.collectionAmount, true) as number,
            deliveryAmount: formattedCurrency(data.deliveryAmount, true) as number,
        })
            .catch((error) => {
                setMessage(error);
                setMessageIsVisible(true);
            })
            .then(() => {
                onClose(false);
            })
            .finally(() => setLoading(false));
    }, [listOfCity]);

    const getCitieOrdenaded = useMemo(() => cities.sort((a, b) => {
        if (a.label.toLowerCase() > b.label.toLowerCase()) {
            return 1;
        }
        return -1;
    }), [cities]);

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
                    deliveryAmount: '',
                    collectionAmount: '',
                }}
                onSubmit={({ collectionAmount, deliveryAmount, from, to }) => {
                    handleSubmitRegister({
                        collectionAmount,
                        deliveryAmount,
                        from,
                        to,
                    });
                }}
            >
                {({ handleChange, handleSubmit, values, errors }) => (
                    <form className="container-form-register-deliveryman">
                        <div className="container-form-register-deliveryman__row-2">
                            <InputSelectAutoComplete
                                items={getCitieOrdenaded}
                                label="De"
                                required
                                placeholder="Informe a cidade de origem"
                                selectedValues={values.from}
                                setSelectedValues={handleChange('from')}
                            />

                            <InputSelectAutoComplete
                                items={getCitieOrdenaded}
                                label="Para"
                                required
                                selectedValues={values.to}
                                placeholder="Informe a cidade de destino"
                                setSelectedValues={handleChange('to')}
                            />
                        </div>

                        <div className="container-form-register-deliveryman__row-2">
                            <Input
                                currency
                                required
                                label="Valor da coleta"
                                placeholder="Informe o valor da coleta"
                                onChange={handleChange('collectionAmount')}
                                value={formattedCurrency(values.collectionAmount)}
                                type="text"
                                marginTop={8}
                                error={errors.collectionAmount}
                            />

                            <Input
                                currency
                                required
                                label="Valor da entrega"
                                placeholder="Informe o valor da entrega"
                                onChange={handleChange('deliveryAmount')}
                                value={formattedCurrency(values.deliveryAmount)}
                                type="text"
                                marginTop={8}
                                error={errors.deliveryAmount}
                            />
                        </div>

                        <ButtonPrimary
                            title="Salvar"
                            onClick={handleSubmit}
                            marginTop={32}
                        />
                    </form>
                )}
            </Formik>
            <LoaderFullScreen isVisible={loading} />

            <Message
                isVisible={messageIsVisible}
                onClose={setMessageIsVisible}
                type="DANGER"
                message={message}
            />
        </Modal>
    );
};
