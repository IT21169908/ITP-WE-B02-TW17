import React, {lazy, memo} from 'react';
import {Route, Routes} from 'react-router-dom';

import NotFound from "../errors/NotFound";
import AuthLayout from "../auth/layout/AuthLayout";

const Login = lazy(() => import('../auth/Login'))

const GuestRoutes: React.FC = memo(() => {
    return (
        <AuthLayout>
            <Routes>
                {/*<Route index element={<Index/>}/>*/}
                <Route index element={<NotFound/>}/>
                <Route path="login" element={<Login/>}/>
                {/*<Route path="register" element={<SignUp/>}/>*/}
                {/*<Route path="forgot-password" element={<ForgotPass/>}/>*/}
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </AuthLayout>
    );
});

export default GuestRoutes;
