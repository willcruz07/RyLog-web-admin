import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { SignIn } from '../pages/Auth/SignIn';
import { ForgotPassword } from '../pages/Auth/ForgotPassword';

export const Auth: React.FC = () => (
    <Routes>
        <Route path="/sing-in" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
            path="*"
            element={<Navigate to="/sing-in" />}
        />
    </Routes>
);
