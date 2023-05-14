import {ConfigProvider} from 'antd';
import React, {Suspense, useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import config from './config/config';
import {RootState, store} from "./redux/store";
import RootAuthRoutes from "./routes/auth/RootAuthRoutes";
import GuestRoutes from "./routes/GuestRoutes";
import 'antd/dist/reset.css';
import './styles/index.scss';
import {useAppDispatch, useAppSelector} from "./hooks/redux-hooks";
import PreLoader from "./components/preloader/PreLoader";
import {authorization} from "./redux/auth/actions";
import LandingPage from "./views/front-views/LandingPage";
import NotFound from "./views/errors/NotFound";
import PublicRoutes from "./routes/PublicRoutes";

const {themeColor} = config;

const ProviderConfig = () => {
    const dispatch = useAppDispatch();

    const {isLoaded, isLoggedIn, authUser, rtl, topMenu, mainContent} = useAppSelector((state: RootState) => {
        return {
            isLoaded: !state.auth.isLoading,
            authUser: state.auth.user,
            isLoggedIn: state.auth.isLoggedIn,
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
        dispatch(authorization({signal}));

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
                    <>
                        <Router basename={process.env.PUBLIC_URL}>
                            {/*<Routes>*/}
                            {/*<Route index path="/" element={<LandingPage/>}/>*/}
                            {/*<GuestRoutes isLoggedIn/>*/}
                            {isLoggedIn && (
                                <RootAuthRoutes isLoggedIn authUser={authUser}/>
                            )}
                            <PublicRoutes isLoggedIn/>
                            {/*<Route path="*" errorElement={<NotFound/>}/>;*/}
                            {/*</Routes>*/}
                        </Router>
                    </>
                )
                }
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
