import React, {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import DashboardLayout from "../../views/dashboard/layout/DashboardLayout";

const NotFound = lazy(() => import('../../views/errors/NotFound'));
const CreateTreatmentPlan = lazy(() => import("../../views/dashboard/doctor/treatment-plans/Create"));
const ManageTreatmentPlans = lazy(() => import("../../views/dashboard/doctor/treatment-plans/Manage"));

function DoctorRoutes() {
    return (
        <DashboardLayout>
            <Routes>
                <Route index path="/*" element={<NotFound/>}/>
                <Route index path="/treatment-plans" element={<ManageTreatmentPlans/>}/>
                <Route index path="/treatment-plans/create" element={<CreateTreatmentPlan enableEdit={false}/>}/>
                <Route index path="/treatment-plans/:treatmentPlan/edit" element={<CreateTreatmentPlan enableEdit={true}/>}/>
            </Routes>
        </DashboardLayout>
    );
}

export default DoctorRoutes;
