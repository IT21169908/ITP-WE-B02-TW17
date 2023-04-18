import React, {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import DashboardLayout from "../../dashboard/layout/DashboardLayout";

const NotFound = lazy(() => import('../../errors/NotFound'));

function AdminRoutes() {
    return (
        <DashboardLayout>
            <Routes>
                <Route index path="/patient/*" element={<NotFound/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </DashboardLayout>
    );
}

export default AdminRoutes;
