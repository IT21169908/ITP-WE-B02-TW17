import { Avatar, Switch } from 'antd';
import type { MenuProps } from 'antd';
import React, { useState } from 'react';
import { BoxArrowRight, ChevronDown, PersonCircle } from "react-bootstrap-icons";
import { Link } from 'react-router-dom';
import Heading from "../../../components/heading/Heading";
import { Dropdown } from "../../../components/dropdown/Dropdown";
import { Popover } from "../../../components/popup/Popup";
import { useAppDispatch } from "../../../hooks/redux-hooks";
import { changeLayoutMode } from "../../../redux/theme-layout/actionCreator";
import { flagTypes, langState } from "../../../types/localization-types";
import Search from "./Search";
import { useTranslation } from "react-i18next";
import { InfoWrapper, NavAuth, UserDropDown } from "./styled-elements";
import styles from "./layout.module.scss";

const TopController = React.memo(({toggleCollapsed}: { toggleCollapsed: () => void }) => {
    const {i18n} = useTranslation();
    const dispatch = useAppDispatch();

    const [langFlagState, setLangFlagState] = useState<langState>({flag: 'en', lang: 'English'});
    const {flag} = langFlagState;

    const onFlagChangeHandler = async (value: flagTypes, e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setLangFlagState({
            ...langFlagState,
            flag: value,
        });
        await i18n.changeLanguage(value);
    };

    const changeLayout = (mode: string) => {
        dispatch(changeLayoutMode(mode));
    };

    const darkModeActivated = () => {
        document.body.classList.add('dark-mode');
    };

    const darkModeDeactivated = () => {
        document.body.classList.remove('dark-mode');
    };

    const changeThemeHandler = (value: boolean) => {
        if (value) {
            // toggleCollapsed(); // TODO: needed?
            darkModeActivated();
            changeLayout('darkMode');
        } else {
            // toggleCollapsed(); // TODO: needed?
            darkModeDeactivated();
            changeLayout('lightMode');
        }
    };

    const signOutHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        // dispatch(logOut(() => navigate('/')));
    };

    const userContent = (
        <UserDropDown>
            <div className="user-dropdown">
                <figure className="user-dropdown__info">
                    <img src={require('../../../static/img/avatar/auth_user.png')} className={styles.dropCardUserImg} alt="" />
                    <figcaption>
                        <Heading as="h5">Default user</Heading>
                        <p>Admin</p>
                    </figcaption>
                </figure>
                <ul className="user-dropdown__links">
                    <li>
                        <Link to="#">
                            <PersonCircle /> Profile
                        </Link>
                    </li>
                </ul>
                <Link className="user-dropdown__bottomAction" onClick={signOutHandler} to="#">
                    <BoxArrowRight /> Sign Out
                </Link>
            </div>
        </UserDropDown>
    );

    const languageNavLinks: MenuProps['items'] = [
        {
            label: <NavAuth>
                <Link onClick={(e) => onFlagChangeHandler('en', e)} to="#">
                    <img src={require('../../../static/img/flag/en.png')} className={styles.langFlagImg} alt="en" />
                    <span>English</span>
                </Link>
            </NavAuth>,
            key: '0',
        },
        {
            label: <NavAuth>
                <Link onClick={(e) => onFlagChangeHandler('si', e)} to="#">
                    <img src={require('../../../static/img/flag/si.png')} className={styles.langFlagImg} alt="si" />
                    <span>Sinhala</span>
                </Link>
            </NavAuth>,
            key: '1',
        }
    ];

    const menuProps: { items: MenuProps['items'] } = {items: languageNavLinks};

    return (
        <InfoWrapper>
            <Search />
            {/*<Message/>
            <Notification/>
            <Settings/>*/}
            <div className="ninjadash-nav-actions__item ninjadash-nav-actions__language">
                <Dropdown placement="bottomRight" content={menuProps} trigger="click">
                    <Link to="#" className="ninjadash-nav-action-link">
                        <img src={require(`../../../static/img/flag/${flag}.png`)} className={styles.langFlagImg} alt={flag} />
                    </Link>
                </Dropdown>
            </div>
            <Switch onChange={changeThemeHandler} checkedChildren="Dark" unCheckedChildren="Light" />
            <div className="ninjadash-nav-actions__item ninjadash-nav-actions__author">
                <Popover placement="bottomRight" content={userContent} action="click">
                    <Link to="#" className="ninjadash-nav-action-link">
                        <Avatar src="https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png" />
                        <span className="ninjadash-nav-actions__author--name">DefaultUser</span>
                        <ChevronDown />
                    </Link>
                </Popover>
            </div>
        </InfoWrapper>
    );
});

export default TopController;
