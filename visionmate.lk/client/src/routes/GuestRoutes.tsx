import React, {lazy, memo} from 'react';
import { Route, Routes } from 'react-router-dom';

import NotFound from "../views/errors/NotFound";
import AuthLayout from "../views/auth-views/layout/AuthLayout";
import FrontViewLayout from "../views/front-views/layout/FrontViewLayout";

const Login = lazy(() => import('../views/auth-views/Login'));
const Register = lazy(() => import('../views/auth-views/Register'));

const GuestRoutes: React.FC = memo(() => {
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
