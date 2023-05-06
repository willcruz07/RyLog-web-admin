import React from 'react';
import { Modal } from '../Modal';

import { ICollectionsAndDeliveries } from '../../models/CollectionsAndDeliveries';
import { formattedPhone } from '../../utils/LIB';
import './styles.scss';

interface IProps {
    isVisible: boolean;
    onClose(close: false): void;
    data: ICollectionsAndDeliveries;
    type: 'COLLECT' | 'DELIVERY';
}

export const ShowCollectAndDelivery: React.FC<IProps> = ({ isVisible, onClose, data, type }) => (
    <Modal
        isVisible={isVisible}
        onClose={onClose}
        title={`Detalhes da ${type === 'COLLECT' ? 'Coleta' : 'Entrega'}`}
        fullScreenMobile
    >
        <div className="container-detail">
            <h3 style={{ marginBottom: 8 }}>{`Status: ${type === 'COLLECT' ? data.collectStatus : data.deliveryStatus}`}</h3>

            <div>
                <h3 style={{ marginBottom: 4 }}>Remetente</h3>
                <h4 style={{ marginBottom: 2, marginLeft: 8 }}>{`Nome: ${(type === 'COLLECT' ? data.sender : data.receiver).name}`}</h4>
                <h4 style={{ marginBottom: 2, marginLeft: 8 }}>{`Telefone: ${formattedPhone((type === 'COLLECT' ? data.sender : data.receiver).phone)}`}</h4>
                <h4 style={{ marginBottom: 2, marginLeft: 8 }}>{`cpf: ${(type === 'COLLECT' ? data.sender : data.receiver)?.cpf ?? ''}`}</h4>
                <h4 style={{ marginBottom: 2, marginLeft: 8 }}>{`rg: ${(type === 'COLLECT' ? data.sender : data.receiver)?.rg ?? ''}`}</h4>

                <h3 style={{ marginBottom: 4, marginTop: 24 }}>Endereço</h3>
                <h4 style={{ marginBottom: 2, marginLeft: 8 }}>{`Rua: ${(type === 'COLLECT' ? data.sender : data.receiver)?.address.street}`}</h4>
                <h4 style={{ marginBottom: 2, marginLeft: 8 }}>{`Número: ${(type === 'COLLECT' ? data.sender : data.receiver)?.address.number}`}</h4>
                <h4 style={{ marginBottom: 2, marginLeft: 8 }}>{`Bairro: ${(type === 'COLLECT' ? data.sender : data.receiver)?.address.district}`}</h4>
                <h4 style={{ marginBottom: 2, marginLeft: 8 }}>{`Cidade: ${(type === 'COLLECT' ? data.sender : data.receiver)?.address.city}`}</h4>
                <h4 style={{ marginBottom: 2, marginLeft: 8 }}>{`UF: ${(type === 'COLLECT' ? data.sender : data.receiver)?.address.state}`}</h4>
                <h4 style={{ marginBottom: 2, marginLeft: 8 }}>{`CEP: ${(type === 'COLLECT' ? data.sender : data.receiver)?.address.zipCode}`}</h4>
            </div>
        </div>
    </Modal>
);
