import React, {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import DashboardLayout from "../../views/dashboard/layout/DashboardLayout";

const NotFound = lazy(() => import('../../views/errors/NotFound'));
const CreateAppointment = lazy(() => import("../../views/dashboard/patient/appointments/Create"));
const ManageAppointments = lazy(() => import("../../views/dashboard/patient/appointments/Manage"));
const Notifications = lazy(() => import("../../views/dashboard/patient/notifications/Notifications"));
const Shop = lazy(() => import("../../views/dashboard/patient/shop/Shop"));
const Checkout = lazy(() => import("../../views/dashboard/patient/shop/Checkout"));

function PatientRoutes() {
    return (
        <DashboardLayout>
            <Routes>
                <Route index path="/*" element={<NotFound/>}/>
                <Route index path="/appointments" element={<ManageAppointments/>}/>
                <Route index path="/appointments/create" element={<CreateAppointment enableEdit={false}/>}/>
                <Route index path="/appointments/:appointment/edit" element={<CreateAppointment enableEdit={true}/>}/>
                <Route index path="/notifications" element={<Notifications/>}/>
                <Route index path="/shop" element={<Shop/>}/>
                <Route index path="/shop/checkout/:product_id" element={<Checkout/>}/>
            </Routes>
        </DashboardLayout>
    );
}

export default PatientRoutes;
