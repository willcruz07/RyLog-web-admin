import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContentAnimate } from '../../../components/ContentAnimate';
import { RegistrationCardButton } from '../../../components/RegistrationCard';
import { Typography } from '../../../components/Typography';

import './styles.scss';

export const Records: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigateDeliveryMan = useCallback(() => {
        navigate('deliveryman');
    }, []);

    const handleNavigateCities = useCallback(() => {
        navigate('cities');
    }, []);

    const handleNavigateDelivery = useCallback(() => {
        navigate('delivery');
    }, []);

    const handleNavigateCollect = useCallback(() => {
        navigate('collect');
    }, []);

    return (
        <ContentAnimate>
            <Typography
                text="Cadastros"
                type="Title"
            />

            <div className="container-grid-records">
                <RegistrationCardButton
                    title="Entregadores"
                    subtitle="Cadastro de entregadores"
                    icon="deliveryman"
                    action={handleNavigateDeliveryMan}
                />

                <RegistrationCardButton
                    title="Rotas"
                    subtitle="Cadastro de rotas de coletas e entregas"
                    icon="map"
                    action={handleNavigateCities}
                />

                <RegistrationCardButton
                    title="Coletas"
                    subtitle="Direcionar coletas para os entregadores"
                    icon="collect"
                    action={handleNavigateCollect}
                />

                <RegistrationCardButton
                    title="Entregas"
                    subtitle="Direcionar entregas para os entregadores"
                    icon="delivery"
                    action={handleNavigateDelivery}
                />
            </div>
        </ContentAnimate>
    );
};
