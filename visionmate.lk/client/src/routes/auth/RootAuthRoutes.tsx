import React, {lazy, Suspense, useEffect} from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Role, RoleName } from "../../enums/Role";
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

    const navigate = useNavigate();
    const location = useLocation();

    let authRoute: JSX.Element;
    //let userRole = parseInt(Role.DOCTOR.toString()); //TODO

    useEffect(() => {
        if (!isLoggedIn || !authUser) {
            navigate('/login')
        } else if ((location.pathname.includes("login")|| location.pathname.includes("register")) || (isLoggedIn && authUser)) {
            if ( !location.pathname.includes(RoleName[authUser.role].toLowerCase())) {
                switch (authUser.role) {
                    case Role.ADMIN:
                        navigate('/admin');
                        break;
                    case Role.PATIENT:
                        navigate('/patient');
                        break;
                    case Role.SURGEON:
                        navigate('/surgeon');
                        break;
                    case Role.DOCTOR:
                        navigate('/doctor');
                        break;
                    default:
                        break;
                }
            }
        }
    }, [authUser, isLoggedIn, location.pathname, navigate]);


    switch (authUser?.role) {
        case Role.ADMIN:
            authRoute = <Route path="/admin/*" element={<AdminRoutes/>}/>;
            break;
        case Role.PATIENT:
            authRoute = <Route path="/patient/*" element={<PatientRoutes/>}/>;
            break;
        case Role.SURGEON:
            authRoute = <Route path="/surgeon/*" element={<SurgeonRoutes/>}/>;
            break;
        case Role.DOCTOR:
            authRoute = <Route path="/doctor/*" element={<DoctorRoutes/>}/>;
            break;
        default:
            authRoute = <Route element={<Navigate to="/404"/>}/>;
            break;
    }

    return (
        <Suspense fallback={<PreLoader/>}>
            <Routes>
                {authRoute}
                <Route path="*" errorElement element={<NotFound/>}/>
            </Routes>
        </Suspense>
    );
}

export default RootAuthRoutes;
