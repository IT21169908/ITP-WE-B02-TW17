import React from 'react';
import AdminRoutes from "./_AdminRoutes";

function AuthRoutes(props: any) {
    let authRoute: JSX.Element;
    const role = 1;

    switch (role) {
        case 1:
            authRoute = <AdminRoutes />;
            break;
        default:
            authRoute = <p>No component found for this value</p>;
            break;
    }
    return (<>{authRoute}</>);
}

export default AuthRoutes;
