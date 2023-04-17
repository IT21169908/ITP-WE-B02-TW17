import React, {memo, ReactNode, useCallback} from 'react';
import {CheckboxStyle} from './style';

// const CheckboxGroup = CheckboxStyle.Group;

// TODO: Implement Checkbox multiple selection

interface propTypes {
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

interface CheckboxChangeEventTarget extends Omit<CheckboxChangeEvent, 'target'> {
    target: {
        value?: unknown;
        checked: boolean;
    };
}

interface CheckboxChangeEvent {
    target: CheckboxChangeEventTarget;
}

const areEqual = (prevProps: propTypes, nextProps: propTypes) => {
    // Compare the `data` object's properties
    return (
        prevProps.checked === nextProps.checked
    );
};

export const Checkbox: React.FC<propTypes> = memo((props: propTypes) => {
    console.log("Checkbox Component");
    const {
        // item,
        // defaultSelect,
        checked,
        // multiple,
        onChange,
        // onChangeTrigger,
        defaultChecked,
        disabled,
        children
    } = props;


    /*const plainOptions = item;*/

    // const [state, setState] = useState({
    //     checkedList: defaultSelect,
    //     indeterminate: true,
    //     checkAll: false,
    // });

    // useEffect(() => {
    //     if (onChangeTrigger) {
    //         onChangeTrigger(state.checkedList);
    //     }
    // }, [onChangeTrigger, state]);

    /* const onMultiChange = (checkedList) => {
         setState({
             checkedList,
             indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
             checkAll: checkedList.length === plainOptions.length,
         });
     };*/

    /*   const onCheckAllChange = (e: CheckboxChangeEvent) => {
           setState({
               checkedList: e.target.checked ? plainOptions : [],
               indeterminate: false,
               checkAll: e.target.checked,
           });
       };*/

    const onChecked = useCallback((e: CheckboxChangeEventTarget) => {
        return onChange(e.target.checked, e.target.value);
    }, [onChange]);

    return (
        <CheckboxStyle checked={checked} onChange={onChecked} defaultChecked={defaultChecked} disabled={disabled}>
            {children}
        </CheckboxStyle>
    )
}, areEqual)
