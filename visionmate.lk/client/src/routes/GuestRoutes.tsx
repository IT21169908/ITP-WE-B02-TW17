import React, {lazy, memo} from 'react';
import { Route, Routes } from 'react-router-dom';

import NotFound from "../views/errors/NotFound";
import AuthLayout from "../views/auth-views/layout/AuthLayout";
import FrontViewLayout from "../views/front-views/layout/FrontViewLayout";

const Login = lazy(() => import('../views/auth-views/Login'));
const Register = lazy(() => import('../views/auth-views/Register'));

const GuestRoutes: React.FC = memo(() => {
    return (
        // <Routes>
        //     {/*<Route path='/other' component={Other} />*/}
        //     <Route path='/404' element={<NotFound/>}/>
        //     <Route path="*" element={<NotFound/>}/>
        //     <Route path='/'>
        //         <AuthLayout>
        //             <Routes>
        //                 <Route path="login" element={<Login/>}/>
        //                 <Route path="register" element={<Register/>}/>
        //                 {/*<Route path="forgot-password" element={<ForgotPass/>}/>*/}
        //             </Routes>
        //         </AuthLayout>
        //     </Route>
        //     <Route>
        //         <FrontViewLayout>
        //             <Routes>
        //                 <Route index element={<NotFound/>}/>
        //                 {/*<Route path='/' exact component={Home} />*/}
        //                 {/*<Route path='/about' component={About} />*/}
        //             </Routes>
        //         </FrontViewLayout>
        //     </Route>
        // </Routes>

        <Routes>
            {/*<Route index element={<Index/>}/>*/}
            <Route index element={<NotFound/>}/>
            <Route path="login" element={<AuthLayout><Login/></AuthLayout>}/>
            <Route path="register" element={<AuthLayout><Register/></AuthLayout>}/>
            {/*<Route path="forgot-password" element={<AuthLayout><ForgotPass/></AuthLayout>}/>*/}
            <Route path="*" element={<NotFound/>}/>

            {/*<Route path='/' element={<FrontViewLayout><Home/></FrontViewLayout>}/>*/}
            {/*<Route path='/about' element={<FrontViewLayout><About/></FrontViewLayout>}/>*/}
        </Routes>
    );
});

export default GuestRoutes;
