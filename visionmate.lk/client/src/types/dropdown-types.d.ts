import {ReactNode} from "react";
import type {MenuProps} from 'antd';

export interface DropdownProps {
    placement: "bottomRight" | "topLeft" | "topCenter" | "topRight" | "bottomLeft" | "bottomCenter" | "top" | "bottom" | undefined,
    title?: string,
    trigger?: any,
    content?: { items: MenuProps['items'], onClick?: any },
    children?: ReactNode,
    style?: object,
    className?: string,
}
