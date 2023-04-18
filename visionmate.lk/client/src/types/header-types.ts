import React from "react";

export interface HeaderProps {
    as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    children?: React.ReactNode;
    className?: string;
    id?: string;
}
