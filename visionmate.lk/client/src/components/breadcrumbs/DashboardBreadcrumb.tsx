import {Breadcrumb} from 'antd';
import {HeaderWrapper, PageHeaderStyle} from './style';
import {PropTypes} from "../../types/breadcrumb-types";
import React from "react";

function PageHeader(props: PropTypes) {
    const {
        title,
        subTitle,
        routes,
        buttons,
        ghost,
        bgColor,
        className
    } = props;


    const breadcrumb = <Breadcrumb separator={">"} items={routes}/>;

    return (
        <HeaderWrapper bgColor={bgColor}>
            <PageHeaderStyle
                className={className}
                title={title}
                subTitle={subTitle}
                breadcrumb={breadcrumb}
                extra={buttons}
                ghost={ghost}
            />
        </HeaderWrapper>
    );
}


export {PageHeader};
