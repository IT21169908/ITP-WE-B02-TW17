import React from 'react';
import {Link} from 'react-router-dom';
import {Content, DropdownStyle} from './style';
import {PropTypes} from "./type";

function Dropdown(props: PropTypes) {
    const {
        content,
        placement,
        title,
        trigger,
        children,
        style,
        className
    } = props;

    return (
        <DropdownStyle
            overlayClassName={className}
            style={style}
            placement={placement}
            title={title}
            overlay={<Content>{content}</Content>}
            trigger={trigger}
        >
            {children}
        </DropdownStyle>
    );
}

const content = (
    <>
        <Link to="#">
            <span>Export to CSV</span>
        </Link>
        <Link to="#">
            <span>Export to XML</span>
        </Link>
        <Link to="#">
            <span>Export to Drive</span>
        </Link>
    </>
);

Dropdown.defaultProps = {
    action: ['hover'],
    placement: 'bottomRight',
    content,
    style: {},
    className: 'ninjadash-dropdown',
};


export {Dropdown};
