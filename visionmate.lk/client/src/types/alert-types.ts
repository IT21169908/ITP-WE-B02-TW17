import React from "react";

export interface AlertProps {
    type?: 'success' | 'info' | 'warning' | 'error';
    message?: string | React.ReactNode;
    description?: string | React.ReactNode;
    showIcon?: boolean;
    outlined?: boolean;
    closable?: boolean;
    closeText?: string | React.ReactNode;
    icon?: React.ReactNode;
    shape?: string;
}

export interface AlertWrapProps {
    type?: 'success' | 'info' | 'warning' | 'error';
    message?: string | React.ReactNode;
    description?: string | React.ReactNode;
    showIcon?: boolean;
    outlined?: boolean;
    closable?: boolean;
    closeText?: string | React.ReactNode;
    icon?: React.ReactNode;
    shape?: string;
}

