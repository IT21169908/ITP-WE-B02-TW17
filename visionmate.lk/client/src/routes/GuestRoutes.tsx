import React, {lazy, memo} from 'react';
import {Route, Routes} from 'react-router-dom';


import NotFound from "../views/errors/NotFound";
import AuthLayout from "../views/auth-views/layout/AuthLayout";

const Login = lazy(() => import('../views/auth-views/Login'));
const Register = lazy(() => import('../views/auth-views/Register'));

interface GuestRoutesProps {
    isLoggedIn: boolean;
}

const GuestRoutes: React.FC<GuestRoutesProps> = memo(({isLoggedIn}) => {

    return (
        <Routes>
            <Route index element={<NotFound/>}/>
            <Route path="login" element={<AuthLayout><Login/></AuthLayout>}/>
            <Route path="register" element={<AuthLayout><Register/></AuthLayout>}/>
            {/*<Route path="forgot-password" element={<AuthLayout><ForgotPass/></AuthLayout>}/>*/}

            {/*<Route path='/' element={<FrontViewLayout><Home/></FrontViewLayout>}/>*/}
            {/*<Route path='/about' element={<FrontViewLayout><About/></FrontViewLayout>}/>*/}
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
});

export default GuestRoutes;
