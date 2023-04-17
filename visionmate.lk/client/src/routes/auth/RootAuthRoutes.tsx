import React, {Suspense} from 'react';
import AdminRoutes from "./_AdminRoutes";
import PreLoader from "../../components/PreLoader";
import PatientRoutes from "./_PatientRoutes";

function RootAuthRoutes(props: any) {
    let authRoute: JSX.Element;
    let role = 1;

    switch (role) {
        case 1:
            authRoute = <AdminRoutes/>;
            break;
        case 2:
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
