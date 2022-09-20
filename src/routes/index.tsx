import React, { useCallback, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { BrowserRouter } from 'react-router-dom';
import { LoaderFullScreen } from '../components/Loader';
import { Message } from '../components/Message';
import { auth } from '../firebase/config';
import { getUserData } from '../firebase/firestore/User';
import { useAppContext } from '../hooks/AppContext';
import { clearUser, setUser } from '../store/user/actions';
import { App } from './app.routes';
import { Auth } from './auth.routes';
import { useMenuContext } from '../hooks/MenuContextProvider';
import { checkUserDeviceIsMobile } from '../utils/LIB';

export const Routes: React.FC = () => {
    const [showMessageUser, setShowMessageUser] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);

    const { state, dispatch } = useAppContext();
    const { openMenu } = useMenuContext();

    useEffect(() => {
        if (!checkUserDeviceIsMobile()) {
            openMenu();
        }
    }, []);

    const checkOnAuthStateUser = useCallback((user: User | null) => {
        if (user && user.email) {
            getUserData(user.email)
                .then((u) => {
                    if (u?.admin) {
                        dispatch(setUser(u));
                    } else {
                        setShowMessageUser(true);
                        dispatch(clearUser());
                        signOut(auth);
                    }
                })
                .finally(() => setLoading(false));
        } else {
            dispatch(clearUser());
            setLoading(false);
        }
    }, [state.newUserInProgress.status]);

    useEffect(() => {
        const subscribe = onAuthStateChanged(auth, checkOnAuthStateUser);

        return subscribe;
    }, []);

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
