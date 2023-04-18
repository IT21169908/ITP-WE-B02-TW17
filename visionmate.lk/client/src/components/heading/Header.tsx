import PropTypes from 'prop-types';
import React from 'react';
import { HeaderProps } from '../../types/header-types';
import * as headings from './styled-elements';

function Header(props: HeaderProps) {
    const {
        as,
        children,
        className,
        id
    } = props;

    const StyledHeading = as ? headings[as.toUpperCase() as keyof typeof headings] : headings.H1;

    return (
        <StyledHeading className={className} id={id}>
            {children}
        </StyledHeading>
    );
}

Header.defaultProps = {
    as: 'h1',
};

Header.propTypes = {
    as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.node]),
    className: PropTypes.string,
    id: PropTypes.string,
};

export default Header;
