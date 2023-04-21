import { Button } from "antd";
import React from 'react';
import { ThreeDotsVertical } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import {Layout} from 'antd';
import { DashboardHeaderProps } from "../../../types/header-types";
import AuthInfo from "../../auth-views/layout/AuthInfo";
import Search from "./Search";
import { TopMenuSearch } from "./styled-elements";
import TopMenu from "./TopMenu";

const {Header: AntdHeader} = Layout;

function Header({rtl, topMenu, layoutMode, toggleCollapsed, collapsed, onShowHide, }: DashboardHeaderProps) {
    return (
        <>
            <AntdHeader style={{
                position: 'fixed',
                width: '100%',
                top: 0,
                [!rtl ? 'left' : 'right']: 0,
            }}>
                <div className="ninjadash-header-content d-flex">
                    <div className="ninjadash-header-content__left">
                        <div className="navbar-brand align-cener-v">
                            <Link to="/admin" className={topMenu && window.innerWidth > 991 ? 'ninjadash-logo top-menu' : 'ninjadash-logo'}>
                                <img src={layoutMode === 'lightMode' ? require(`../../../static/img/logo_dark.svg`).default : require(`../../../static/img/logo_white.svg`).default} alt=""/>
                            </Link>
                            {!topMenu || window.innerWidth <= 991 ? (
                                <Button type="link" onClick={toggleCollapsed}>
                                    <img src={require(`../../../static/icon/${collapsed ? 'left-bar.svg' : 'left-bar.svg'}`)} alt="menu"/>
                                </Button>
                            ) : null}
                        </div>
                    </div>
                    <div className="ninjadash-header-content__right d-flex">
                        <div className="ninjadash-navbar-menu d-flex align-center-v">
                            {topMenu && window.innerWidth > 991 ? <TopMenu/> : ''}
                        </div>
                        <div className="ninjadash-nav-actions">
                            {topMenu && window.innerWidth > 991 ? (
                                <TopMenuSearch>
                                    <div className="top-right-wrap d-flex">
                                        <AuthInfo/>
                                    </div>
                                </TopMenuSearch>
                            ) : (
                                <AuthInfo/>
                            )}
                        </div>
                    </div>
                    <div className="ninjadash-header-content__mobile">
                        <div className="ninjadash-mobile-action">
                            <div className="btn-search">
                                <Search />
                            </div>

                            <Link className="btn-auth" onClick={onShowHide} to="#">
                                <ThreeDotsVertical /> icon
                            </Link>
                        </div>
                    </div>
                </div>
            </AntdHeader>
        </>
    );
}

export default Header;
