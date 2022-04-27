import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { Input } from '../../../components/Input';
import Logo from '../../../assets/img/Logo.png';
import { ButtonText } from '../../../components/ButtonText';

import './styles.scss';

export const SignIn: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleNavigateForgotPassword = useCallback(() => {
        navigate('/forgot-password');
    }, []);

    return (
        <div className="background-sign-in">
            <div className="container-login">
                <img src={Logo} alt="Logo" />

                <h4>Realize o login para acessar o sistema.</h4>

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

                    <Input
                        required
                        label="Senha"
                        icon="lock"
                        onChange={setPassword}
                        value={password}
                        password
                        type="text"
                        marginBottom={16}
                    />

                    <ButtonText
                        title="Esqueceu a senha?"
                        onClick={handleNavigateForgotPassword}
                        marginBottom={24}

                    />

                    <ButtonPrimary
                        title="Entrar"
                        onClick={() => {}}
                    />
                </div>
            </div>
        </div>
    ); };
