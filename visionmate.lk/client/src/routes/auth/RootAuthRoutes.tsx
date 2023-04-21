import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import { Role } from "../../enums/Role";
import AdminRoutes from "./_AdminRoutes";
import PreLoader from "../../components/preloader/PreLoader";
import PatientRoutes from "./_PatientRoutes";

const NotFound = lazy(() => import('../../views/errors/NotFound'));

function RootAuthRoutes() {
    let authRoute: JSX.Element;
    let userRole = 1;

    switch (userRole) {
        case Role.ADMIN:
            authRoute = <Route index path="/admin/*" element={<AdminRoutes/>}/>;
            break;
        case Role.PATIENT:
            authRoute = <Route index path="/patient/*" element={<PatientRoutes/>}/>;
            break;
        default:
            authRoute = <Route path="/" element={<Navigate to="/404" />} />;
            break;
    }

    return (
        <Suspense fallback={<PreLoader/>}>
            <Routes>
                {authRoute}
                <Route index path="*" element={<NotFound/>}/>;
            </Routes>
        </Suspense>
    );
}

export default RootAuthRoutes;
