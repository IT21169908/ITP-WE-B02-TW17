import React, {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import DashboardLayout from "../../views/dashboard/layout/DashboardLayout";

const NotFound = lazy(() => import('../../views/errors/NotFound'));
const CreateSpectacle = lazy(() => import("../../views/dashboard/admin/spectacles/Create"));
const EditSpectacle = lazy(() => import("../../views/dashboard/admin/spectacles/Create"));
const ManageSpectacles = lazy(() => import("../../views/dashboard/admin/spectacles/Manage"));
const ManageBlogs = lazy(() => import("../../views/dashboard/admin/blogs/Manage"));
const CreateBlog = lazy(() => import("../../views/dashboard/admin/blogs/Create"));
const EditBlog = lazy(() => import("../../views/dashboard/admin/blogs/Create"));
const ManageOrders = lazy(() => import("../../views/dashboard/admin/orders/Manage"));
const ManageSchedules = lazy(() => import("../../views/dashboard/admin/operation-schedules/Manage"));
const CreateSchedule = lazy(() => import("../../views/dashboard/admin/operation-schedules/Create"));
const EditSchedule = lazy(() => import("../../views/dashboard/admin/operation-schedules/Create"));
const ManageTransactions = lazy(() => import("../../views/dashboard/admin/transactions/Manage"));
const CreateTransaction = lazy(() => import("../../views/dashboard/admin/transactions/Create"));
const EditTransaction = lazy(() => import("../../views/dashboard/admin/transactions/Create"));

function AdminRoutes() {
    // TODO: decide whether to apply DashboardLayout. best approach
    return (
        <DashboardLayout>
            <Routes>
                <Route path="/spectacles" element={<ManageSpectacles/>}/>
                <Route path="/spectacles/create" element={<CreateSpectacle enableEdit={false}/>}/>
                <Route path="/spectacles/:spectacle/edit" element={<EditSpectacle enableEdit/>}/>

                <Route path="/blogs" element={<ManageBlogs/>}/>
                <Route path="/blogs/create" element={<CreateBlog enableEdit={false}/>}/>
                <Route path="/blogs/:blog/edit" element={<EditBlog enableEdit/>}/>

                <Route path="/orders" element={<ManageOrders/>}/>

                <Route path="/operations/schedules" element={<ManageSchedules/>}/>
                <Route path="/operations/schedules/create" element={<CreateSchedule enableEdit={false}/>}/>
                <Route path="/operations/schedules/:scheduleId/edit" element={<EditSchedule enableEdit/>}/>

                <Route path="/transactions" element={<ManageTransactions/>}/>
                <Route path="/transactions/create" element={<CreateTransaction enableEdit={false}/>}/>
                <Route path="/transactions/:transaction/edit" element={<EditTransaction enableEdit/>}/>
                <Route path="/*" element={<NotFound/>}/>
            </Routes>
        </DashboardLayout>
    );
}

export default AdminRoutes;
