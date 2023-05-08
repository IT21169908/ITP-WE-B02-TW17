import React, {lazy, Suspense, useEffect} from 'react';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {Role} from "../../enums/Role";
import AdminRoutes from "./_AdminRoutes";
import PreLoader from "../../components/preloader/PreLoader";
import DoctorRoutes from "./_DoctorRoutes";
import PatientRoutes from "./_PatientRoutes";
import SurgeonRoutes from "./_SurgeonRoutes";
import IUser from "../../models/User";

const NotFound = lazy(() => import('../../views/errors/NotFound'));

interface GuestRoutesProps {
    authUser: IUser | null;
    isLoggedIn: boolean;
}

function RootAuthRoutes({isLoggedIn, authUser}: GuestRoutesProps) {

    const navigate = useNavigate()

    let authRoute: JSX.Element;
    //let userRole = parseInt(Role.DOCTOR.toString()); //TODO

    useEffect(() => {
        if (!isLoggedIn || !authUser) {
            navigate('/login')
        }
    }, [authUser, isLoggedIn, navigate])


    switch (authUser?.role) {
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
            authRoute = <Route element={<Navigate to="/404"/>}/>;
            break;
    }

    return (
        <Suspense fallback={<PreLoader/>}>
            <Routes>
                {authRoute}
            </Routes>
        </Suspense>
    );
}

export default RootAuthRoutes;
