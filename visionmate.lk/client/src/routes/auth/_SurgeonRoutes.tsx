import React, {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import DashboardLayout from "../../views/dashboard/layout/DashboardLayout";

const Dashboard = lazy(() => import("../../views/dashboard/Dashboard"));

function SurgeonRoutes() {
    return (
        <DashboardLayout>
            <Routes>
                <Route index path="/*" element={<Dashboard/>}/>
            </Routes>
        </DashboardLayout>
    );
}

export default SurgeonRoutes;
