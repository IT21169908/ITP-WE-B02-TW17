import React, {ReactNode} from "react";
import {ItemType} from "antd/lib/menu/hooks/useItems";

export interface PropType {
    title?: React.ReactNode,
    size?: "small" | "default",
    more?: { items: ItemType[] | undefined, onClick?: any } | undefined,
    bodyStyle?: object,
    headStyle?: object,
    isbutton?: ReactNode,
    headless?: boolean,
    border?: boolean,
    caption?: string,
    bodypadding?: string,
    className?: string,
    moreText?: boolean,
    children: ReactNode,
}