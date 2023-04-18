import React from 'react';
import {Spin} from "antd";

const PreLoader = () => {
    return (
        <div className="spin" style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <Spin tip="Loading..." size="large"></Spin>
        </div>
    );
};

export default PreLoader;