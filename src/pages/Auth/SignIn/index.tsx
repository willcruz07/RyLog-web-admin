import React, { useState } from 'react';
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { Input } from '../../../components/Input';
import Logo from '../../../assets/img/Logo.png';

import './styles.scss';
import { ButtonText } from '../../../components/ButtonText';

export const SignIn: React.FC = () => {
    const [email, setEmail] = useState('');

    return (
        <div className="background-sign-in">
            <div className="container-login">
                <img src={Logo} alt="Logo" />

                <div className="container-login__inputs">
                    <Input
                        label="Email"
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
                        onChange={setEmail}
                        value={email}
                        password
                        type="text"
                        marginBottom={16}
                    />

                    <ButtonText
                        title="Esqueceu a senha?"
                        marginBottom={24}

                    />

                    <ButtonPrimary
                        title="Entrar"

                    />
                </div>
            </div>
        </div>
    ); };
