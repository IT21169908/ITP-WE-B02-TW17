import React, {Suspense} from 'react';
import { LayoutProps } from "../../../types/layout-types";
import PreLoader from "../../../components/preloader/PreLoader";

const FrontViewLayout = ({children}: LayoutProps) => {
    return (
        <Suspense fallback={<PreLoader/>}>
            <div></div>
        </Suspense>
    );
};

export default FrontViewLayout;
