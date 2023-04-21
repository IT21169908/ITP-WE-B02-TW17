import PropTypes from "prop-types";
import React from 'react';
import { AlertProps } from "../../types/alert-types";
import { AlertWrap } from './styled-elements';

function Alert(props: AlertProps) {
    const { type = 'success', icon, message, description, showIcon, outlined, closable, closeText } = props;

    return (
        <AlertWrap
            message={message}
            type={type}
            description={description}
            closable={closable}
            showIcon={showIcon && showIcon}
            outlined={outlined}
            closeText={closeText && closeText}
            icon={icon && icon}
        />
    );
}

Alert.propTypes = {
    type: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    showIcon: PropTypes.bool,
    outlined: PropTypes.bool,
    closable: PropTypes.bool,
    closeText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    icon: PropTypes.node,
};

export default Alert;
