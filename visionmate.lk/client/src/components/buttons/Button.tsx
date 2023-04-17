import React, {ReactNode, useState} from 'react';
import {ButtonStyled, ButtonStyledGroup} from './style';
import {ButtonProps} from "./buttonTypes";

// @Todo props spreading

function Button(props: ButtonProps) {
    const {
        type,
        shape,
        icon,
        size,
        outlined,
        ghost,
        transparent,
        raised,
        squared,
        color,
        social,
        load,
        children,
        ...rest
    } = props;

    const [state, setState] = useState({
        loading: false,
    });

    const enterLoading = () => {
        setState({loading: true});
    };

    return (
        <ButtonStyled
            squared={squared}
            outlined={outlined ? 1 : 0}
            ghost={ghost}
            transparent={transparent ? 1 : 0}
            raised={raised ? 1 : 0}
            data={type}
            size={size}
            shape={shape}
            type={type}
            icon={icon}
            color={color}
            social={social}
            onClick={load && enterLoading}
            loading={state.loading}
            {...rest}
        >
            {children}
        </ButtonStyled>
    );
}


function BtnGroup({children}: { children: ReactNode }) {
    return <ButtonStyledGroup>{children}</ButtonStyledGroup>;
}

export {Button, BtnGroup};
