import React, {ReactNode, Suspense} from 'react';
import {AuthenticationWrap} from '../style';
import PreLoader from "../../components/PreLoader";

interface LayoutProps {
    children?: ReactNode;
}

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
