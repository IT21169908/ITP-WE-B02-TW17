import {ConfigProvider} from 'antd';
import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import config from './config/config';
import {RootState, store} from "./redux/store";
import RootAuthRoutes from "./routes/auth/RootAuthRoutes";
import GuestRoutes from "./routes/GuestRoutes";
import 'antd/dist/reset.css';
import './styles/index.scss';
import {useAppDispatch, useAppSelector} from "./hooks/redux-hooks";
import {fetchUser} from "./redux/users/actions";
import PreLoader from "./components/preloader/PreLoader";

const {themeColor} = config;

const ProviderConfig = () => {
    const dispatch = useAppDispatch();
    const isLoggedIn = true;
    const isLoaded = true;

    const {rtl, topMenu, mainContent} = useAppSelector((state: RootState) => {
        return {
            rtl: state.ChangeLayoutMode.rtlData,
            topMenu: state.ChangeLayoutMode.topMenu,
            mainContent: state.ChangeLayoutMode.mode,
        };
    });

    //TODO: Check this functionality
    const [path, setPath] = useState(window.location.pathname);

    useEffect(() => {
        setPath(window.location.pathname);
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        const {signal} = controller;
        dispatch(fetchUser({id: '6437e0efe6f77939eaab1e43', signal}));
        return () => {
            controller.abort();
        };
    }, [dispatch, path]);

    return (
        <ConfigProvider direction={rtl ? 'rtl' : 'ltr'}>
            <ThemeProvider theme={{...themeColor, rtl, topMenu, mainContent}}>
                {!isLoaded ? (
                    <PreLoader/>
                ) : (
                    <Router basename={process.env.PUBLIC_URL}>
                        {!isLoggedIn ? (
                            <GuestRoutes/>
                        ) : (
                            <RootAuthRoutes/>
                        )}
                    </Router>
                )}
            </ThemeProvider>
        </ConfigProvider>
    );
}

const App = () => (
    <Provider store={store}>
        <ProviderConfig/>
    </Provider>
);
export default App;
