import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { Input } from '../../../components/Input';
import Logo from '../../../assets/img/Logo.png';
import { ButtonText } from '../../../components/ButtonText';

import './styles.scss';
import { IForgotPassword } from '../../../models/Auth';
import { sendEmailForgotPassword } from '../../../firebase/auth';
import { LoaderFullScreen } from '../../../components/Loader';
import { Message } from '../../../components/Message';
import { getFirebaseErrorMessageTranslation } from '../../../firebase/auth/translate';
import { TAlert } from '../../../models/types';

export const ForgotPassword: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const [typeMessage, setTypeMessage] = useState<TAlert>('SUCCESS');

    const [message, setMessage] = useState('');
    const [messageIsVisible, setMessageIsVisible] = useState(false);

    const navigate = useNavigate();

    const handleNavigateSignIn = useCallback(() => {
        navigate('sign-in');
    }, []);

    const validationSchema = Yup.object().shape({ email: Yup.string().email('E-mail inválido').required('Informe o e-mail') });

    const handleForgotPassword = (email: IForgotPassword) => {
        setLoading(true);

        sendEmailForgotPassword(email)
            .then((response) => {
                setTypeMessage('INFO');
                setMessage(response.message);
            })
            .catch((error) => {
                setTypeMessage('DANGER');
                setMessage(getFirebaseErrorMessageTranslation(error.message, 'Não foi possível enviar o email de redefinição'));
            })
            .finally(() => {
                setLoading(false);
                setMessageIsVisible(true);
            });
    };

    return (
        <div className="background-forgot-password">
            <div className="container-email">
                <img src={Logo} alt="Logo" />

                <h4>Informe o email para redefinir a senha.</h4>

                <Formik
                    initialValues={{ email: '' }}
                    validationSchema={validationSchema}
                    onSubmit={({ email }) => {
                        handleForgotPassword({ email });
                    }}
                >
                    {({ handleSubmit, handleChange, values, errors }) => (

                        <div className="container-login__inputs">
                            <Input
                                label="E-mail"
                                icon="email"
                                onChange={handleChange('email')}
                                value={values.email}
                                error={errors.email}
                                type="text"
                                marginBottom={16}
                                required
                            />

                            <ButtonText
                                title="Voltar e realizar o login"
                                marginBottom={24}
                                onClick={handleNavigateSignIn}

                            />

                            <ButtonPrimary
                                title="Enviar"
                                onClick={handleSubmit}
                            />
                        </div>
                    )}
                </Formik>
            </div>
            <LoaderFullScreen isVisible={loading} title="Enviando email de redefinição..." />

            <Message
                title={typeMessage !== 'SUCCESS' ? 'Atenção!' : ''}
                message={message}
                isVisible={messageIsVisible}
                onClose={setMessageIsVisible}
                type={typeMessage}
            />
        </div>
    );
};
