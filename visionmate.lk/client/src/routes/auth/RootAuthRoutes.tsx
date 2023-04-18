import React, {Suspense} from 'react';
import { Role } from "../../enums/Role";
import AdminRoutes from "./_AdminRoutes";
import PreLoader from "../../components/preloader/PreLoader";
import PatientRoutes from "./_PatientRoutes";

function RootAuthRoutes(props: any) {
    let authRoute: JSX.Element;
    let userRole = 1;

    switch (userRole) {
        case Role.ADMIN:
            authRoute = <AdminRoutes/>;
            break;
        case Role.PATIENT:
            authRoute = <PatientRoutes/>;
            break;
        default:
            authRoute = <p>No component found for this value</p>;
            break;
    }

    return (
        <Suspense fallback={<PreLoader/>}>
            {authRoute}
        </Suspense>
    );
}

export default RootAuthRoutes;
