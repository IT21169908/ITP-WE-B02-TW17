import {Avatar} from 'antd';
import React, {useState} from 'react';
import { ArrowDown, BoxArrowRight, PersonCircle } from "react-bootstrap-icons";
import {Link} from 'react-router-dom';
import Heading from "../../../components/heading/Heading";
import {InfoWrapper, NavAuth, UserDropDown} from "./styled-elements";
import {Dropdown} from "../../../components/dropdown/Dropdown";
import {Popover} from "../../../components/popup/Popup";
import Search from "../../dashboard/layout/Search";


const AuthInfo = React.memo(() => {
    //const dispatch = useDispatch();

    const [state, setState] = useState({
        flag: 'en',
    });
    //const navigate = useNavigate();

    const {flag} = state;

    const SignOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        // dispatch(logOut(() => navigate('/')));
    };

    const userContent = (
        <UserDropDown>
            <div className="user-dropdown">
                <figure className="user-dropdown__info">
                    <img src={require('../../../static/img/avatar/chat-auth.png')} alt=""/>
                    <figcaption>
                        <Heading as="h5">Abdullah Bin Talha</Heading>
                        <p>UI Expert</p>
                    </figcaption>
                </figure>
                <ul className="user-dropdown__links">
                    <li>
                        <Link to="#">
                            <PersonCircle /> Profile
                        </Link>
                    </li>
                </ul>
                <Link className="user-dropdown__bottomAction" onClick={SignOut} to="#">
                    <BoxArrowRight /> Sign Out
                </Link>
            </div>
        </UserDropDown>
    );

    const onFlagChangeHandle = (value: string, e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setState({
            ...state,
            flag: value,
        });
        //i18n.changeLanguage(value);
    };

    const country = (
        <NavAuth>
            <Link onClick={(e) => onFlagChangeHandle('en', e)} to="#">
                <img src={require('../../../static/img/flag/en.png')} alt=""/>
                <span>English</span>
            </Link>
        </NavAuth>
    );

    return (
        <InfoWrapper>
            <Search/>
            {/*<Message/>
            <Notification/>
            <Settings/>*/}
            <div className="ninjadash-nav-actions__item ninjadash-nav-actions__language">
                <Dropdown placement="bottomRight" content={country} trigger="click">
                    <Link to="#" className="ninjadash-nav-action-link">
                        <img src={require(`../../../static/img/flag/${flag}.png`)} alt=""/>
                    </Link>
                </Dropdown>
            </div>
            <div className="ninjadash-nav-actions__item ninjadash-nav-actions__author">
                <Popover placement="bottomRight" content={userContent} action="click">
                    <Link to="#" className="ninjadash-nav-action-link">
                        <Avatar src="https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png"/>
                        <span className="ninjadash-nav-actions__author--name">Md. Rafiq</span>
                        <ArrowDown />
                    </Link>
                </Popover>
            </div>
        </InfoWrapper>
    );
});

export default AuthInfo;
