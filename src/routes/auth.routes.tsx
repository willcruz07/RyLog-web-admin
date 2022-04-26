import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { SignIn } from '../pages/Auth/SignIn';

export const Auth: React.FC = () => (
    <Routes>
        <Route path="/sing-in" element={<SignIn />} />
        <Route
            path="*"
            element={<Navigate to="/sing-in" />}
        />
    </Routes>
);
