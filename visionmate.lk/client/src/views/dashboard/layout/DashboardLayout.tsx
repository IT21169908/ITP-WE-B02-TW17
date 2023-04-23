import React, {useEffect, useState} from 'react';
import {Col, Layout, Row, theme} from 'antd';
import Scrollbars from "react-custom-scrollbars-2";
import {RootState} from "../../../redux/store";
import {LayoutProps} from "../../../types/layout-types";
import Footer from "./Footer";
import Header from "./Header";
import {LayoutContainer, SmallScreenAuthInfo} from "./styled-elements";
import TopController from "./TopController";
import {ThemeProvider} from "styled-components";
import SideMenuItem from "./SideMenuItem";
import {useAppSelector} from "../../../hooks/redux-hooks";

const {Sider, Content} = Layout;

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
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    const toggleCollapsed = () => setCollapsed(!collapsed);

    const toggleCollapsedMobile = () => {
        if (window.innerWidth <= 990) {
            setCollapsed(!collapsed);
        }
    };

    const onShowHide = () => setHide(!hide);

    const renderView = ({style}: { style: object }) => {
        const customStyle = {
            marginRight: 'auto', [rtl ? 'marginLeft' : 'marginRight']: '-17px',
        };
        return <div style={{...style, ...customStyle}}/>;
    };

    const renderThumbVertical = ({style}: { style: object }) => {
        const thumbStyle = {
            borderRadius: 6, backgroundColor: ChangeLayoutMode ? '#ffffff16' : '#f1f2f6', [left]: '2px',
        };
        return <div style={{...style, ...thumbStyle}}/>;
    };

    const renderThumbHorizontal = ({style}: { style: object }) => {
        const thumbStyle = {
            borderRadius: 6, backgroundColor: ChangeLayoutMode ? '#ffffff16' : '#f1f2f6',
        };
        return <div style={{...style, ...thumbStyle}}/>;
    };

    return (
        <LayoutContainer>
            <Layout className="layout">
                <Header collapsed={collapsed} layoutMode={layoutMode}
                        onShowHide={onShowHide} rtl={rtl} toggleCollapsed={toggleCollapsed} topMenu={topMenu}/>
                <div className="ninjadash-header-more">
                    <Row>
                        <Col md={0} sm={24} xs={24}>
                            <div className="ninjadash-header-more-inner">
                                <SmallScreenAuthInfo hide={hide}>
                                    <TopController toggleCollapsed={toggleCollapsedMobile}/>
                                </SmallScreenAuthInfo>
                            </div>
                        </Col>
                    </Row>
                </div>

                <Layout>
                    {!topMenu || window.innerWidth <= 991 ? (
                        <ThemeProvider theme={theme}>
                            <Sider
                                width={280}
                                style={{
                                    margin: '63px 0 0 0',
                                    padding: `${!rtl ? '20px 20px 55px 0' : '20px 0 55px 20px'}`,
                                    height: '100vh',
                                    position: "fixed",
                                    overflow: 'auto',
                                    left: 0,
                                    top: 0,
                                    bottom: 0,
                                    [left]: 0,
                                    zIndex: 988,
                                }}
                                collapsed={collapsed}
                                theme={layoutMode === 'lightMode' ? 'light' : 'dark'}
                            >
                                <Scrollbars
                                    className="custom-scrollbar"
                                    autoHide
                                    autoHideTimeout={500}
                                    autoHideDuration={200}
                                    renderThumbHorizontal={renderThumbHorizontal}
                                    renderThumbVertical={renderThumbVertical}
                                    renderView={renderView}
                                    renderTrackVertical={(props) => <div {...props} className="ninjadash-track-vertical"/>}
                                >
                                    <SideMenuItem toggleCollapsed={toggleCollapsedMobile}/>
                                </Scrollbars>
                            </Sider>
                        </ThemeProvider>
                    ) : null}
                    <Layout className="atbd-main-layout">
                        <Content>
                            {children}
                            <Footer/>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
            {window.innerWidth <= 991 ? (<span className={collapsed ? 'ninjadash-shade' : 'ninjadash-shade show'} onClick={toggleCollapsed}/>) : ('')}
        </LayoutContainer>
    );
}

export default DashboardLayout;
