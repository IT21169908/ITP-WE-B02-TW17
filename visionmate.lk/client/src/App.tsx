import {ConfigProvider, Spin} from 'antd';
import React, {useEffect, useState} from 'react';
import {Provider, useSelector} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import config from './config/config';
import {RootState, store} from "./redux/store";
import AuthRoutes from "./routes/auth/AuthRoutes";
import GuestRoutes from "./routes/GuestRoutes";
import 'antd/dist/reset.css';
import './styles/index.scss';
import {useAppDispatch} from "./hooks/reduxHooks";
import {fetchUser, removeUser} from "./redux/users/actions";

const {themeColor} = config;

const ProviderConfig = () => {
    const dispatch = useAppDispatch();
    const isLoggedIn = true;
    const isLoaded = true;

    const {rtl, topMenu, mainContent} = useSelector((state: RootState) => {
        return {
            rtl: state.ChangeLayoutMode.rtlData,
            topMenu: state.ChangeLayoutMode.topMenu,
            mainContent: state.ChangeLayoutMode.mode,
        };
    });

    //TODO: Check this functionality
    const [path, setPath] = useState(window.location.pathname);

    useEffect(() => {
        let unmounted = false;
        if (!unmounted) {
            setPath(window.location.pathname);
        }
        dispatch(fetchUser('6437e0efe6f77939eaab1e43'))
        // dispatch(removeUser())
        // dispatch(getUser('6437e0efe6f77939eaab1e43'));
        return () => {
            unmounted = true
        };
    }, [dispatch, path]);

    return (
        <ConfigProvider direction={rtl ? 'rtl' : 'ltr'}>
            <ThemeProvider theme={{...themeColor, rtl, topMenu, mainContent}}>
                {!isLoaded ? (
                    <div className="spin" style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
                        <Spin tip="Loading..." size="large"></Spin>
                    </div>
                ) : (
                    <Router basename={process.env.PUBLIC_URL}>
                        {!isLoggedIn ? (
                            <GuestRoutes/>
                        ) : (
                            <AuthRoutes/>
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
