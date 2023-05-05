import React, {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import DashboardLayout from "../../views/dashboard/layout/DashboardLayout";

const NotFound = lazy(() => import('../../views/errors/NotFound'));
const CreateAppointment = lazy(() => import("../../views/dashboard/patient/appointments/Create"));
const ManageAppointments = lazy(() => import("../../views/dashboard/patient/appointments/Manage"));
const Notifications = lazy(() => import("../../views/dashboard/patient/notifications/Notifications"));

function PatientRoutes() {
    return (
        <DashboardLayout>
            <Routes>
                <Route index path="/*" element={<NotFound/>}/>
                <Route index path="/appointments" element={<ManageAppointments/>}/>
                <Route index path="/appointments/create" element={<CreateAppointment enableEdit={false}/>}/>
                <Route index path="/appointments/:appointment/edit" element={<CreateAppointment enableEdit={true}/>}/>
                <Route index path="/notifications" element={<Notifications/>}/>
            </Routes>
        </DashboardLayout>
    );
}

export default PatientRoutes;
