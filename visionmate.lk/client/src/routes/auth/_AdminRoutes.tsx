import React, {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import DashboardLayout from "../../dashboard/layout/App";

const NotFound = lazy(() => import('../../errors/NotFound'));

function AdminRoutes() {
    // TODO: decide whether to apply DashboardLayout. best approach
    return (
        <DashboardLayout>
            <Routes>
                <Route index path="/admin/*" element={<NotFound/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </DashboardLayout>
    );
}

export default AdminRoutes;
