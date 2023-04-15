import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const NotFound = lazy(() => import('../../errors/NotFound'));

function AdminRoutes() {
    return (
        <>
            <Routes>
                {/*<Route path="/admin/*" element={<ProtectedRoute path="/*" Component={Admin} />} />*/}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default AdminRoutes;
