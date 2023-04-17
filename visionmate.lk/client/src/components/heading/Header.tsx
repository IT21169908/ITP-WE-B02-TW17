import PropTypes from 'prop-types';
import React from 'react';
import * as headings from './style';

interface Props {
    as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    children?: React.ReactNode;
    className?: string;
    id?: string;
}

function Header(props: Props) {
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
