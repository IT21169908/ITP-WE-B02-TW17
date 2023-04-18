import React, {useEffect, useState} from 'react';
import {Button, Col, Layout, Row, theme} from 'antd';
import {RootState} from "../../redux/store";
import { LayoutProps } from "../../types/layout-types";
import {FooterStyle, LayoutContainer, SmallScreenAuthInfo, TopMenuSearch} from "./styled-elements";
import {Link, NavLink} from "react-router-dom";
import TopMenu from "./TopMenu";
import AuthInfo from "../../auth/layout/AuthInfo";
import Search from "./Search";
import {ThemeProvider} from "styled-components";
import SideMenuItem from "./SideMenuItem";
import {useAppSelector} from "../../hooks/reduxHooks";

const {Header, Sider, Content} = Layout;

function DashboardLayout({children}: LayoutProps) {
    const [collapsed, setCollapsed] = useState(false);
    const [hide, setHide] = useState(true);

    const ChangeLayoutMode = false;
    const {layoutMode, topMenu, rtl} = useAppSelector((state: RootState) => {
        return {
            rtl: state.ChangeLayoutMode.rtlData,
            topMenu: state.ChangeLayoutMode.topMenu,
            layoutMode: state.ChangeLayoutMode.mode,
        };
    });

    const left = !rtl ? 'left' : 'right';

    useEffect(() => {
        const updateDimensions = () => {
            if (window.innerWidth <= 1200) {
                setCollapsed(true);
            }
        };

        window.addEventListener('resize', updateDimensions);
        updateDimensions();

        return () => {
            window.removeEventListener('resize', updateDimensions);
        };
    }, []);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const toggleCollapsedMobile = () => {
        if (window.innerWidth <= 990) {
            setCollapsed(!collapsed);
        }
    };

    const onShowHide = () => {
        setHide(!hide)
    };

    const SideBarStyle = {
        margin: '63px 0 0 0',
        padding: `${!rtl ? '20px 20px 55px 0' : '20px 0 55px 20px'}`,
        //overflowY: 'auto',
        height: '100vh',
        //position: 'fixed',
        [left]: 0,
        zIndex: 988,
    };

    const renderView = ({style}: { style: object }) => {
        const customStyle = {
            marginRight: 'auto',
            [rtl ? 'marginLeft' : 'marginRight']: '-17px',
        };
        return <div style={{...style, ...customStyle}}/>;
    };

    const renderThumbVertical = ({style}: { style: object }) => {
        const thumbStyle = {
            borderRadius: 6,
            backgroundColor: ChangeLayoutMode ? '#ffffff16' : '#F1F2F6',
            [left]: '2px',
        };
        return <div style={{...style, ...thumbStyle}}/>;
    };

    const renderThumbHorizontal = ({style}: { style: object }) => {
        const thumbStyle = {
            borderRadius: 6,
            backgroundColor: ChangeLayoutMode ? '#ffffff16' : '#F1F2F6',
        };
        return <div style={{...style, ...thumbStyle}}/>;
    };

    return (
        <LayoutContainer>
            <Layout className="layout">
                <Header style={{
                    position: 'fixed',
                    width: '100%',
                    top: 0,
                    [!rtl ? 'left' : 'right']: 0,
                }}>
                    <div className="ninjadash-header-content d-flex">
                        <div className="ninjadash-header-content__left">
                            <div className="navbar-brand align-cener-v">
                                <Link to="/admin" className={topMenu && window.innerWidth > 991 ? 'ninjadash-logo top-menu' : 'ninjadash-logo'}>
                                    <img src={layoutMode === 'lightMode' ? require(`../../static/img/logo_dark.svg`).default : require(`../../static/img/logo_white.svg`).defaul} alt=""/>
                                </Link>
                                {!topMenu || window.innerWidth <= 991 ? (
                                    <Button type="link" onClick={toggleCollapsed}>
                                        <img src={require(`../../static/icon/${collapsed ? 'left-bar.svg' : 'left-bar.svg'}`)} alt="menu"/>
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
                                    <Search/>
                                </div>

                                <Link className="btn-auth" onClick={onShowHide} to="#">
                                    {/*<UilEllipsisV/>*/}UilEllipsisV icon
                                </Link>
                            </div>
                        </div>
                    </div>
                </Header>
                <div className="ninjadash-header-more">
                    <Row>
                        <Col md={0} sm={24} xs={24}>
                            <div className="ninjadash-header-more-inner">
                                <SmallScreenAuthInfo hide={hide}>
                                    <AuthInfo/>
                                </SmallScreenAuthInfo>
                            </div>
                        </Col>
                    </Row>
                </div>

                {!topMenu || window.innerWidth <= 991 ? (
                    <ThemeProvider theme={theme}>
                        <Sider
                            width={280}
                            style={SideBarStyle}
                            collapsed={collapsed}
                            theme={layoutMode === 'lightMode' ? 'light' : 'dark'}
                        >
                            {/*<Scrollbars
                                    className="custom-scrollbar"
                                    autoHide
                                    autoHideTimeout={500}
                                    autoHideDuration={200}
                                    renderThumbHorizontal={renderThumbHorizontal}
                                    renderThumbVertical={renderThumbVertical}
                                    renderView={renderView}
                                    renderTrackVertical={(props) => <div {...props} className="ninjadash-track-vertical"/>}
                                >*/}
                            <SideMenuItem toggleCollapsed={toggleCollapsedMobile}/>
                            {/*</Scrollbars>*/}
                        </Sider>
                    </ThemeProvider>
                ) : null}
                <Content>
                    {children}
                    <FooterStyle className="admin-footer">
                        <Row>
                            <Col md={12} xs={24}>
                                            <span className="admin-footer__copyright">
                                              © 2023<Link to="#">SovWare</Link>
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
                </Content>


            </Layout>
            {window.innerWidth <= 991 ? (
                <span className={collapsed ? 'ninjadash-shade' : 'ninjadash-shade show'} onClick={toggleCollapsed}/>
            ) : (
                ''
            )}
        </LayoutContainer>
    );

}

export default DashboardLayout;
