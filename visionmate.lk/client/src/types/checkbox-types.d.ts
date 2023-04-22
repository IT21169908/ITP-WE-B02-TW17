import {ReactNode} from "react";

export interface CheckboxProps {
    item?: string[];
    defaultSelect?: any[];
    multiple?: boolean;
    onChange: (checked: boolean, value?: unknown) => void;
    onChangeTrigger?: (...args: any[]) => any;
    defaultChecked?: boolean;
    disabled?: boolean;
    checked?: boolean;
    children?: ReactNode;
}

export interface CheckboxChangeEventTarget extends Omit<CheckboxChangeEvent, 'target'> {
    target: {
        value?: unknown;
        checked: boolean;
    };
}

export interface CheckboxChangeEvent {
    target: CheckboxChangeEventTarget;
}
