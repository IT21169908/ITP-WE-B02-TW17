import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import { Role } from "../../enums/Role";
import AdminRoutes from "./_AdminRoutes";
import PreLoader from "../../components/preloader/PreLoader";
import DoctorRoutes from "./_DoctorRoutes";
import PatientRoutes from "./_PatientRoutes";
import SurgeonRoutes from "./_SurgeonRoutes";

const NotFound = lazy(() => import('../../views/errors/NotFound'));

function RootAuthRoutes() {
    let authRoute: JSX.Element;
    let userRole = parseInt(Role.ADMIN.toString()); //TODO

    switch (userRole) {
        case Role.ADMIN:
            authRoute = <Route index path="/admin/*" element={<AdminRoutes/>}/>;
            break;
        case Role.PATIENT:
            authRoute = <Route index path="/patient/*" element={<PatientRoutes/>}/>;
            break;
        case Role.SURGEON:
            authRoute = <Route index path="/surgeon/*" element={<SurgeonRoutes/>}/>;
            break;
        case Role.DOCTOR:
            authRoute = <Route index path="/doctor/*" element={<DoctorRoutes/>}/>;
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
