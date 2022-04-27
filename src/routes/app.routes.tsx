import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Dashboard } from '../pages/App/Dashboard';
import { Financial } from '../pages/App/Financial';
import { Movement } from '../pages/App/Movement';
import { Partners } from '../pages/App/Partners';
import { Records } from '../pages/App/Records';
import { Settings } from '../pages/App/Settings';

export const App: React.FC = () => (
    <Layout>
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/financial" element={<Financial />} />
            <Route path="/movement" element={<Movement />} />
            <Route path="/records" element={<Partners />} />
            <Route path="/partners" element={<Records />} />
            <Route path="/settings" element={<Settings />} />

            <Route
                path="*"
                element={<Navigate to="/dashboard" />}
            />
        </Routes>
    </Layout>
);
