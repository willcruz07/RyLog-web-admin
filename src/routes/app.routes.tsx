import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Financial } from '../pages/App/Financial';
import { Movement } from '../pages/App/Movement';
import { RegistrationOfCollect } from '../pages/App/Movement/Collect';
import { RegistrationOfDelivery } from '../pages/App/Movement/Delivery';
import { Partners } from '../pages/App/Partners';
import { Records } from '../pages/App/Records';
import { RegistrationOfCities } from '../pages/App/Records/Cities';
import { RegistrationOfDeliveryman } from '../pages/App/Records/Deliveryman';
import { Settings } from '../pages/App/Settings';

export const App: React.FC = () => (
    <Layout>
        <Routes>
            {/* <Route path="dashboard" element={<Dashboard />} /> */}
            <Route path="financial" element={<Financial />} />
            <Route path="movement">
                <Route index element={<Movement />} />
                <Route path="delivery" element={<RegistrationOfDelivery />} />
                <Route path="collect" element={<RegistrationOfCollect />} />
            </Route>
            <Route path="records">
                <Route index element={<Records />} />
                <Route path="deliveryman" element={<RegistrationOfDeliveryman />} />
                <Route path="cities" element={<RegistrationOfCities />} />
            </Route>
            <Route path="partners" element={<Partners />} />
            <Route path="settings" element={<Settings />} />

            <Route
                path="*"
                element={<Navigate to="/movement" />}
            />
        </Routes>
    </Layout>
);
