import React from "react";

interface RouteItemType {
    key?: React.Key;
    title: React.ReactNode;
    label?: React.ReactNode;
    path?: string;
    href?: string;
}

type ItemType = RouteItemType

export interface PropTypes {
    className?: string,
    title?: string,
    routes: ItemType[],
    subTitle?: string,
    bgColor?: string,
    buttons?: [],
    ghost?: boolean,
}

export interface HeaderWrapperPropTypes {
    bgColor?: string,
}