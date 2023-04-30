import React, {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import DashboardLayout from "../../views/dashboard/layout/DashboardLayout";

const NotFound = lazy(() => import('../../views/errors/NotFound'));

function PatientRoutes() {
    return (
        <DashboardLayout>
            <Routes>
                <Route index path="/*" element={<NotFound/>}/>
            </Routes>
        </DashboardLayout>
    );
}

export default PatientRoutes;
