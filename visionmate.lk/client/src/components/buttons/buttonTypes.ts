import {ReactNode} from "react";

export interface ButtonProps {
    type?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'link' | 'dark' | 'light' | 'gray' | 'white' | 'dashed' | 'error' | 'extra-light' | 'default';
    shape?: string;
    icon?: string;
    size?: 'small' | 'middle' | 'large' | 'default';
    color?: string;
    outlined?: boolean;
    transparent?: boolean;
    raised?: boolean;
    squared?: boolean;
    social?: boolean;
    load?: boolean;
    ghost?: boolean;
    children?: ReactNode;

    [key: string]: any;
}