import React, {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import DashboardLayout from "../../views/dashboard/layout/DashboardLayout";

const NotFound = lazy(() => import('../../views/errors/NotFound'));
const Create = lazy(() => import("../../views/dashboard/surgeon/appointments/Create"));
const ManageAppointments = lazy(() => import("../../views/dashboard/surgeon/appointments/Manage"));

function SurgeonRoutes() {
    return (
        <DashboardLayout>
            <Routes>
                <Route index path="/*" element={<NotFound/>}/>
                <Route index path="/appointments" element={<ManageAppointments/>}/>
                <Route index path="/appointments/create" element={<Create enableEdit={false}/>}/>
                <Route index path="/appointments/:appointment/edit" element={<Create enableEdit/>}/>
            </Routes>
        </DashboardLayout>
    );
}

export default SurgeonRoutes;
