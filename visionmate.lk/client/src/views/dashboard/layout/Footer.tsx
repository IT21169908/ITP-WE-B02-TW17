import { Col, Row } from "antd";
import React from 'react';
import { Link, NavLink } from "react-router-dom";
import { FooterStyle } from "./styled-elements";

function Footer() {
    return (
        <>
            <FooterStyle className="admin-footer">
                <Row>
                    <Col md={12} xs={24}>
                        <span className="admin-footer__copyright">
                          © 2023<Link to="#">VisionMate</Link>
                        </span>
                    </Col>
                    <Col md={12} xs={24}>
                        <div className="admin-footer__links">
                            <NavLink to="#">About</NavLink>
                            <NavLink to="#">Team</NavLink>
                            <NavLink to="#">Contact</NavLink>
                        </div>
                    </Col>
                </Row>
            </FooterStyle>
        </>
    );
}

export default Footer;
