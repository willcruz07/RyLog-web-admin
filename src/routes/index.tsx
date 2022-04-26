import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { LoaderFullScreen } from '../components/Loader';
import { Message } from '../components/Message';
import { useAppContext } from '../hooks/AppContext';
import { App } from './app.routes';
import { Auth } from './auth.routes';

export const Routes: React.FC = () => {
    const [showMessageUser, setShowMessageUser] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);

    const { state, dispatch } = useAppContext();

    if (loading) return <LoaderFullScreen isVisible title="Verificando usuário..." />;

    return (
        <>
            <BrowserRouter>
                {state.user.logged ? <App /> : <Auth />}
            </BrowserRouter>

            <Message
                isVisible={showMessageUser}
                message="Este usuário não tem permissão para acessar o sistema, Entre em contato com o administrador."
                title="Atenção!"
                onClose={() => setShowMessageUser(false)}
                type="DANGER"
            />
        </>
    );
};
