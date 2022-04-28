import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Dashboard } from '../pages/App/Dashboard';
import { Financial } from '../pages/App/Financial';
import { Movement } from '../pages/App/Movement';
import { Partners } from '../pages/App/Partners';
import { Records } from '../pages/App/Records';
import { RegistrationOfCities } from '../pages/App/Records/Cities';
import { RegistrationOfDeliveryman } from '../pages/App/Records/Deliveryman';
import { Settings } from '../pages/App/Settings';

export const App: React.FC = () => (
    <Layout>
        <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="financial" element={<Financial />} />
            <Route path="movement" element={<Movement />} />
            <Route path="records">
                <Route index element={<Records />} />
                <Route path="deliveryman" element={<RegistrationOfDeliveryman />} />
                <Route path="cities" element={<RegistrationOfCities />} />
            </Route>
            <Route path="partners" element={<Partners />} />
            <Route path="settings" element={<Settings />} />

            <Route
                path="*"
                element={<Navigate to="/dashboard" />}
            />
        </Routes>
    </Layout>
);
