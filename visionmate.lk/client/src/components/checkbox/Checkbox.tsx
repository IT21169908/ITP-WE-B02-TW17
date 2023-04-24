import React, {memo, useCallback} from 'react';
import { CheckboxChangeEventTarget, CheckboxProps } from '../../types/checkbox-types';
import {CheckboxStyle} from './styled-elements';

// const CheckboxGroup = CheckboxStyle.Group;

// TODO: Implement Checkbox multiple selection

const areEqual = (prevProps: CheckboxProps, nextProps: CheckboxProps) => {
    // Compare the `data` object's properties
    return (
        prevProps.checked === nextProps.checked
    );
};

export const Checkbox: React.FC<CheckboxProps> = memo((props: CheckboxProps) => {
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
