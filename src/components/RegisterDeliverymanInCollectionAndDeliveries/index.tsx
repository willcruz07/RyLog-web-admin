/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-useless-escape */
import { Formik } from 'formik';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
import { addDeliverymanToCollectionAndDeliveries } from '../../firebase/firestore/CollectAndDeliveries';
import { getDeliveryman, IGetDeliveryman } from '../../firebase/firestore/Deliveryman';
import { ButtonPrimary } from '../ButtonPrimary';
import { ISelectItems } from '../InputSelect';
import { InputSelectAutoComplete } from '../InputSelectAutoComplete';
import { LoaderFullScreen } from '../Loader';
import { Message } from '../Message';
import { Modal } from '../Modal';

import './styles.scss';

interface IRegisterDeliverymanInCollectionAndDeliveries {
    isVisible: boolean;
    onClose(close: boolean | false): void;
    listOfCollectionsAndDeliveries: string[];
    type: 'COLLECT' | 'DELIVERY';
}

interface IData {
    deliveryman: string;
}

export const RegisterDeliverymanInCollectionAndDeliveries: React.FC<IRegisterDeliverymanInCollectionAndDeliveries> = ({ isVisible, type, onClose, listOfCollectionsAndDeliveries }) => {
    const [deliveryman, setDeliveryman] = useState<ISelectItems[]>([]);
    const [listDeliveryman, setListOfDeliveryman] = useState<IGetDeliveryman[]>([]);

    const [loading, setLoading] = useState<boolean>(false);
    const [messageIsVisible, setMessageIsVisible] = useState<boolean>(false);
    const [message, setMessage] = useState('');
    const [emptyList, setEmptyList] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setEmptyList(false);
            setMessageIsVisible(false);

            if (listOfCollectionsAndDeliveries.length <= 0) {
                setMessage('É necessário selecionar alguma coleta ou entrega');
                setMessageIsVisible(true);
                setEmptyList(true);
            }
        }
    }, [isVisible]);

    useEffect(() => {
        loadDeliveryman();
    }, []);

    const loadDeliveryman = async (): Promise<void> => {
        const deliveryman = await getDeliveryman();
        if (deliveryman) {
            setListOfDeliveryman(deliveryman);

            if (deliveryman) {
                deliveryman.forEach((item) => {
                    setDeliveryman((prevState) => [...prevState, {
                        label: item.name,
                        value: item.id,
                    }]);
                });
            }
        }
    };

    const validationSchema = Yup.object().shape({
        deliveryman: Yup.string()
            .required('Informe o entregador'),
    });

    const handleSubmitRegister = useCallback(async (data: IData) => {
        setLoading(true);

        listOfCollectionsAndDeliveries.forEach(async (collectId) => {
            await addDeliverymanToCollectionAndDeliveries({
                name: listDeliveryman.filter((item) => (item.id === data.deliveryman))[0].name || '',
                deliverymanRef: `/entregadores/${data.deliveryman}`,
                collectionAndDeliveriesID: collectId,
                type,
            });
        });

        setLoading(false);
        onClose(true);
    }, [listDeliveryman, listOfCollectionsAndDeliveries]);

    const getDeliverymanOrder = useMemo(() => deliveryman.sort((a, b) => {
        if (a.label.toLowerCase() > b.label.toLowerCase()) {
            return 1;
        }
        return -1;
    }), [deliveryman]);

    return (
        <Modal
            isVisible={isVisible}
            onClose={onClose}
            title="Vincular entregador"
            fullScreenMobile
        >
            <Formik
                validationSchema={validationSchema}
                initialValues={{ deliveryman: '' }}
                onSubmit={({ deliveryman }) => {
                    handleSubmitRegister({ deliveryman });
                }}
            >
                {({ handleChange, handleSubmit, values }) => (
                    <form className="container-form-register-deliveryman">
                        <InputSelectAutoComplete
                            items={getDeliverymanOrder}
                            label="Entregador"
                            required
                            placeholder="Informe o nome do entregador"
                            selectedValues={values.deliveryman}
                            setSelectedValues={handleChange('deliveryman')}
                        />

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
                onClose={() => {
                    setMessageIsVisible(false);
                    if (emptyList) {
                        onClose(false);
                    }
                }}
                type="DANGER"
                message={message}
            />
        </Modal>
    );
};
