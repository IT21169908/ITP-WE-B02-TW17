import React, {lazy, Suspense} from 'react';
import PreLoader from "../components/preloader/PreLoader";
import {Navigate, Route, Routes} from "react-router-dom";
import GuestRoutes from "./GuestRoutes";

const LandingPage = lazy(() => import('../views/front-views/LandingPage'));
const NotFound = lazy(() => import('../views/errors/NotFound'));

interface GuestRoutesProps {
    isLoggedIn: boolean;
}

const PublicRoutes = ({isLoggedIn}: GuestRoutesProps) => {
    let authRoute: JSX.Element = <Route element={<Navigate to="/404"/>}/>;

    if (isLoggedIn) {
        authRoute = <Route index path="/portal/*" element={<GuestRoutes isLoggedIn/>}/>
    }

    return (
        <Suspense fallback={<PreLoader/>}>
            <Routes>
                {authRoute}
                <Route index path="/" element={<LandingPage/>}/>
                <Route path="*" errorElement={<NotFound/>}/>
            </Routes>
        </Suspense>
    );
};

export default PublicRoutes;