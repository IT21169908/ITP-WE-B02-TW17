import React from "react";

export interface DashboardHeaderProps {
    rtl: boolean;
    topMenu: boolean;
    layoutMode: string;
    toggleCollapsed: () => void;
    collapsed: boolean;
    onShowHide: () => void;
}

export interface HeadingProps {
    as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    children?: React.ReactNode;
    className?: string;
    id?: string;
}
