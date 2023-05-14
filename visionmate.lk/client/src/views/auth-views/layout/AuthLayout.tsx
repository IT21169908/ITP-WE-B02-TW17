import React, {Suspense} from 'react';
import { LayoutProps } from "../../../types/layout-types";
import {AuthenticationWrap} from '../styled-elements';
import PreLoader from "../../../components/preloader/PreLoader";

import logo from "../../../static/logo-dark.png";

const AuthLayout = ({children}: LayoutProps) => {
    return (
        <Suspense fallback={<PreLoader/>}>
            <AuthenticationWrap style={{backgroundImage: `url("${require('../../../static/img/admin-bg-light.png')}")`}}>
                <div className="ninjadash-authentication-wrap">
                    <div className="ninjadash-authentication-brand">
                        <img src={logo} alt=""/>
                    </div>
                    {children}
                </div>
            </AuthenticationWrap>
        </Suspense>
    );
};

export default AuthLayout;
