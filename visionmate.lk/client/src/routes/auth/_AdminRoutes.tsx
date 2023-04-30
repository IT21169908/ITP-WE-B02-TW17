import React, {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import DashboardLayout from "../../views/dashboard/layout/DashboardLayout";

const NotFound = lazy(() => import('../../views/errors/NotFound'));
const CreateSpectacle = lazy(() => import("../../views/dashboard/admin/spectacles/Create"));
const EditSpectacle = lazy(() => import("../../views/dashboard/admin/spectacles/Create"));
const ManageSpectacles = lazy(() => import("../../views/dashboard/admin/spectacles/Manage"));

function AdminRoutes() {
    // TODO: decide whether to apply DashboardLayout. best approach
    return (
        <DashboardLayout>
            <Routes>
                <Route index path="/*" element={<NotFound/>}/>
                <Route index path="/spectacles" element={<ManageSpectacles/>}/>
                <Route index path="/spectacles/create" element={<CreateSpectacle enableEdit={false}/>}/>
                <Route index path="/spectacles/:spectacle/edit" element={<EditSpectacle enableEdit/>}/>
            </Routes>
        </DashboardLayout>
    );
}

export default AdminRoutes;
