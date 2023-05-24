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
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: 24 }}>
                <div>
                    <h3 style={{ marginBottom: 4 }}>Remetente</h3>
                    <h4 style={{ marginBottom: 2, marginLeft: 8 }}>{`Nome: ${(type === 'COLLECT' ? data.receiver : data.sender).name}`}</h4>
                    <h4 style={{ marginBottom: 2, marginLeft: 8 }}>{`Telefone: ${formattedPhone((type === 'COLLECT' ? data.receiver : data.sender).phone)}`}</h4>
                    <h4 style={{ marginBottom: 2, marginLeft: 8 }}>{`CPF: ${(type === 'COLLECT' ? data.receiver : data.sender)?.cpf ?? ''}`}</h4>
                    <h4 style={{ marginBottom: 2, marginLeft: 8 }}>{`RG: ${(type === 'COLLECT' ? data.receiver : data.sender)?.rg ?? ''}`}</h4>

                    <h3 style={{ marginBottom: 4, marginTop: 24 }}>Endereço</h3>
                    <h4 style={{ marginBottom: 2, marginLeft: 8 }}>{`Rua: ${(type === 'COLLECT' ? data.receiver : data.sender)?.address.street}`}</h4>
                    <h4 style={{ marginBottom: 2, marginLeft: 8 }}>{`Número: ${(type === 'COLLECT' ? data.receiver : data.sender)?.address.number}`}</h4>
                    <h4 style={{ marginBottom: 2, marginLeft: 8 }}>{`Bairro: ${(type === 'COLLECT' ? data.receiver : data.sender)?.address.district}`}</h4>
                    <h4 style={{ marginBottom: 2, marginLeft: 8 }}>{`Cidade: ${(type === 'COLLECT' ? data.receiver : data.sender)?.address?.city?.name}`}</h4>
                    <h4 style={{ marginBottom: 2, marginLeft: 8 }}>{`UF: ${(type === 'COLLECT' ? data.receiver : data.sender)?.address.state}`}</h4>
                    <h4 style={{ marginBottom: 2, marginLeft: 8 }}>{`CEP: ${(type === 'COLLECT' ? data.receiver : data.sender)?.address.zipCode}`}</h4>
                </div>

                <div style={{ marginLeft: 80 }}>
                    <h3 style={{ marginBottom: 4 }}>Destinatário</h3>
                    <h4 style={{ marginBottom: 2, marginLeft: 8 }}>{`Nome: ${(type === 'DELIVERY' ? data.receiver : data.sender).name}`}</h4>
                    <h4 style={{ marginBottom: 2, marginLeft: 8 }}>{`Telefone: ${formattedPhone((type === 'DELIVERY' ? data.receiver : data.sender).phone)}`}</h4>
                    <h4 style={{ marginBottom: 2, marginLeft: 8 }}>{`CPF: ${(type === 'DELIVERY' ? data.receiver : data.sender)?.cpf ?? ''}`}</h4>
                    <h4 style={{ marginBottom: 2, marginLeft: 8 }}>{`RG: ${(type === 'DELIVERY' ? data.receiver : data.sender)?.rg ?? ''}`}</h4>

                    <h3 style={{ marginBottom: 4, marginTop: 24 }}>Endereço</h3>
                    <h4 style={{ marginBottom: 2, marginLeft: 8 }}>{`Rua: ${(type === 'DELIVERY' ? data.receiver : data.sender)?.address.street}`}</h4>
                    <h4 style={{ marginBottom: 2, marginLeft: 8 }}>{`Número: ${(type === 'DELIVERY' ? data.receiver : data.sender)?.address.number}`}</h4>
                    <h4 style={{ marginBottom: 2, marginLeft: 8 }}>{`Bairro: ${(type === 'DELIVERY' ? data.receiver : data.sender)?.address.district}`}</h4>
                    <h4 style={{ marginBottom: 2, marginLeft: 8 }}>{`Cidade: ${(type === 'DELIVERY' ? data.receiver : data.sender)?.address?.city?.name}`}</h4>
                    <h4 style={{ marginBottom: 2, marginLeft: 8 }}>{`UF: ${(type === 'DELIVERY' ? data.receiver : data.sender)?.address.state}`}</h4>
                    <h4 style={{ marginBottom: 2, marginLeft: 8 }}>{`CEP: ${(type === 'DELIVERY' ? data.receiver : data.sender)?.address.zipCode}`}</h4>
                </div>
            </div>
        </div>
    </Modal>
);
