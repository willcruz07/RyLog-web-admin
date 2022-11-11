import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContentAnimate } from '../../../components/ContentAnimate';
import { RegistrationCardButton } from '../../../components/RegistrationCard';
import { Typography } from '../../../components/Typography';

export const Movement: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigateDelivery = useCallback(() => {
        navigate('delivery');
    }, []);

    const handleNavigateCollect = useCallback(() => {
        navigate('collect');
    }, []);

    return (
        <ContentAnimate>
            <Typography
                text="Movimentações"
                type="Title"
            />
            <div className="container-grid-records">
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
