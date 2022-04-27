import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { Input } from '../../../components/Input';
import Logo from '../../../assets/img/Logo.png';
import { ButtonText } from '../../../components/ButtonText';

import './styles.scss';

export const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleNavigateSignIn = useCallback(() => {
        navigate('sign-in');
    }, []);

    return (
        <div className="background-forgot-password">
            <div className="container-email">
                <img src={Logo} alt="Logo" />

                <h4>Informe o email para redefinir a senha.</h4>

                <div className="container-login__inputs">
                    <Input
                        label="E-mail"
                        icon="email"
                        onChange={setEmail}
                        value={email}
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
                        onClick={() => {}}
                    />
                </div>
            </div>
        </div>
    ); };
