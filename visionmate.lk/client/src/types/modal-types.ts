import { ReactNode } from "react";

export interface ModalProps {
    onCancel?: () => void;
    onOk?: () => void;
    visible?: boolean;
    title?: string;
    className?: string;
    type?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'link' | 'dark' | 'light' | 'gray' | 'white' | 'dashed' | 'error' | 'extra-light' | 'default';
    color?: boolean | string;
    footer?: (ReactNode[] | null) | null;
    width?: number;
    children?: ReactNode;
}
