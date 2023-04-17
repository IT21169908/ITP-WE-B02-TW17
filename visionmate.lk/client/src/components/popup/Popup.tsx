import React from 'react';
import {Link} from 'react-router-dom';
import {Content, PopoverStyle, Title} from './style';
import './style.module.css';
import {PropTypes} from "./type";

function Popover(props: PropTypes) {
    const {content, placement, title, action, children} = props;
    const content1 = <Content>{content}</Content>;

    return (
        <PopoverStyle
            placement={placement}
            title={title && <Title>{title}</Title>}
            content={content1}
            trigger={action}
        >
            {children}
        </PopoverStyle>
    );
}

const content = (
    <>
        <Link to="#">
            {/*<UilCheck/>*/}
            <span>Btn Dropdown one</span>
        </Link>
        <Link to="#">
            {/*<UilCheck/>*/}
            <span>Btn Dropdown two</span>
        </Link>
        <Link to="#">
            {/*<UilCheck/>*/}
            <span>Btn Dropdown three</span>
        </Link>
    </>
);

Popover.defaultProps = {
    action: 'hover',
    placement: 'bottom',
    content,
};


export {Popover};
