import React from 'react';
import {Link} from 'react-router-dom';
import {CardFrame} from './style';
import {Dropdown} from '../../dropdown/Dropdown';
import Heading from '../../heading/Heading';
import {PropType} from "../../../types/card-frame-types";
import {ThreeDotsVertical} from "react-bootstrap-icons";

function Cards(props: PropType) {
    const {
        title,
        children,
        more,
        moreText,
        size,
        headless,
        caption,
        isbutton,
        bodyStyle,
        headStyle,
        border,
        bodypadding,
        className,
    } = props;
    return (
        <>
            {!headless ? (
                <CardFrame
                    size={size}
                    title={title}
                    bodyStyle={bodyStyle && bodyStyle}
                    headStyle={headStyle && headStyle}
                    bordered={border}
                    className={className}
                    bodypadding={bodypadding && bodypadding}
                    extra={
                        <>
                            {more && (
                                <Dropdown content={more} placement="bottom">
                                    <Link onClick={(e) => e.preventDefault()} to="#">
                                        {!moreText ? <ThreeDotsVertical/> : 'More'}
                                    </Link>
                                </Dropdown>
                            )}

                            {isbutton && isbutton}
                        </>
                    }
                    style={{width: '100%'}}
                >
                    {children}
                </CardFrame>
            ) : (
                <CardFrame
                    bodypadding={bodypadding && bodypadding}
                    bodyStyle={bodyStyle && bodyStyle}
                    size={size}
                    style={{width: '100%'}}
                    bordered={border}
                    className={className}
                >
                    {title && <Heading as="h4">{title}</Heading>}
                    {caption && <p>{caption}</p>}
                    {children}
                </CardFrame>
            )}
        </>
    );
}

Cards.defaultProps = {
    border: false,
};

export {Cards};
