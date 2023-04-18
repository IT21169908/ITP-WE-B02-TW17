import React, {Suspense} from 'react';
import { LayoutProps } from "../../types/layout-types";
import {AuthenticationWrap} from '../styled-elements';
import PreLoader from "../../components/preloader/PreLoader";

const AuthLayout = ({children}: LayoutProps) => {
    return (
        <Suspense fallback={<PreLoader/>}>
            <AuthenticationWrap style={{backgroundImage: `url("${require('../../static/img/admin-bg-light.png')}")`}}>
                <div className="ninjadash-authentication-wrap">
                    <div className="ninjadash-authentication-brand">
                        <img src={require(`../../static/img/logo_dark.svg`).default} alt=""/>
                    </div>
                    {children}
                </div>
            </AuthenticationWrap>
        </Suspense>
    );
};

export default AuthLayout;
