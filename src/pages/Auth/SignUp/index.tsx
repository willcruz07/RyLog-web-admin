import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { Input } from '../../../components/Input';
import Logo from '../../../assets/img/Logo.png';
import './styles.scss';
import { ISignIn } from '../../../models/Auth';
import { signInApp } from '../../../firebase/auth';
import { getFirebaseErrorMessageTranslation } from '../../../firebase/auth/translate';
import { LoaderFullScreen } from '../../../components/Loader';
import { Message } from '../../../components/Message';

export const SignUp: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorMessageIsVisible, setErrorMessageIsVisible] = useState(false);

    const passwordRef = useRef<HTMLInputElement>(null);

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('E-mail inválido').required('Informe o e-mail'),
        password: Yup.string()
            .required('Informe a senha')
            .min(6, 'A senha deve conter no mínimo 6 caracteres'),
    });

    const handleSubmitSignIn = (signIn: ISignIn) => {
        setLoading(true);
        signInApp(signIn)
            .catch((error) => {
                setErrorMessageIsVisible(true);
                setErrorMessage(getFirebaseErrorMessageTranslation(error.message, 'Não foi possível realizar o login'));
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="background-sign-in">
            <div className="container-login">
                <img src={Logo} alt="Logo" />

                <h4>Informe os dados para realizar o cadastro</h4>

                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={({ email, password }) => {
                        handleSubmitSignIn({ email, password });
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
                                onKeyReturn={() => passwordRef.current?.focus()}
                                type="text"
                                marginBottom={16}
                                required
                            />

                            <Input
                                required
                                label="Senha"
                                icon="lock"
                                onChange={handleChange('password')}
                                value={values.password}
                                error={errors.password}
                                onKeyReturn={() => handleSubmit()}
                                password
                                type="text"
                                marginBottom={16}
                            />

                            <ButtonPrimary
                                title="Entrar"
                                onClick={handleSubmit}
                                loading={loading}
                            />
                        </div>
                    )}
                </Formik>
            </div>

            <LoaderFullScreen
                isVisible={loading}
                title="Verificando usuário e senha..."
            />

            <Message
                title="Atenção!"
                message={errorMessage}
                isVisible={errorMessageIsVisible}
                onClose={setErrorMessageIsVisible}
                type="DANGER"
            />
        </div>
    ); };
