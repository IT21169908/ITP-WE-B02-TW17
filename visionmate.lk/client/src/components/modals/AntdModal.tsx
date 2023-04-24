import React from 'react';
import { ModalProps } from "../../types/modal-types";
import { Button } from "../buttons/Button";
import { ModalStyled } from './styled-elements';

function Modal(props: ModalProps) {
    const { onCancel, className, onOk, visible, title, type, color, footer, width, children } = props;

    return (
        <ModalStyled
            title={title}
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            type={color ? type : 'default'}
            width={width}
            className={className}
            footer={
                footer || footer === null
                    ? footer
                    : [
                        <Button type="secondary" key="back" onClick={onCancel}>
                            Cancel
                        </Button>,
                        <Button type={type ? type :  'default'} key="submit" onClick={onOk}>
                            Save Change
                        </Button>,
                    ]
            }
        >
            {children}
        </ModalStyled>
    );
}

Modal.defaultProps = {
    width: 620,
    className: 'atbd-modal',
};

const alertModal = ModalStyled;
export { Modal, alertModal };
