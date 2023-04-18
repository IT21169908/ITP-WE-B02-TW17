import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import PreLoader from "../components/preloader/PreLoader";
import {ErrorWrapper} from "./styled-elements";
import {Button} from "../components/buttons/Button";
import Header from "../components/heading/Header";
import {Main} from "../components/styled-components/styled-containers";

function NotFound() {
    const [state, setState] = useState({
        isLoading: true,
    });
    useEffect(() => {
        setTimeout(() => {
            setState({isLoading: false});
        }, 1500);
    }, []);

    return (
        <Main>
            {state.isLoading ? (
                <PreLoader/>
            ) : (
                <ErrorWrapper>
                    <img src={require(`../static/img/pages/404.svg`).default} alt="404"/>
                    <Header className="error-text" as="h3">
                        404
                    </Header>
                    <p>Sorry! the page you are looking for does not exist.</p>
                    <NavLink to="/admin">
                        <Button size="default" type="primary" to="/admin">
                            Return Home
                        </Button>
                    </NavLink>
                </ErrorWrapper>
            )}
        </Main>
    );
}

export default NotFound;
