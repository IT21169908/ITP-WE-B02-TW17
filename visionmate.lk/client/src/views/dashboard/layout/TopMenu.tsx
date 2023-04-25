import React, {useLayoutEffect} from 'react';
import { Calendar3, Chat, Envelope } from "react-bootstrap-icons";
import {NavLink, Link} from 'react-router-dom';

import {TopMenuStyle} from './styled-elements';


const activeDefault = () => {
    const active = document.querySelector('.ninjadash-top-menu a.active');
    if (active) {
        const megaMenu = active.closest('.megaMenu-wrapper');
        const hasSubMenuLeft = active.closest('.has-subMenu-left');
        if (!megaMenu) {
            const ul = active.closest('ul')
            if (ul && ul.previousSibling instanceof HTMLElement) {
                ul.previousSibling.classList.add('active');
                if (hasSubMenuLeft) {
                    const subMenuUl = hasSubMenuLeft.closest('ul')
                    if (subMenuUl && subMenuUl.previousSibling instanceof HTMLElement) {
                        subMenuUl.previousSibling.classList.add('active');
                    }
                }
            }
        } else {
            const ul = active.closest('.megaMenu-wrapper')
            if (ul && ul.previousSibling instanceof HTMLElement) {
                ul.previousSibling.classList.add('active');
            }
        }
    }
};

function TopMenu() {
    const path = '/admin';

    useLayoutEffect(() => {
        window.addEventListener('load', activeDefault);
        return () => window.removeEventListener('load', activeDefault);
    }, []);

    const addParentActive = (event: React.MouseEvent<HTMLAnchorElement>) => {
        document.querySelectorAll('.parent').forEach((element) => {
            element.classList.remove('active');
        });

        const hasSubMenuLeft = event.currentTarget.closest('.has-subMenu-left');
        const megaMenu = event.currentTarget.closest('.megaMenu-wrapper');
        if (!megaMenu) {
            const ul = event.currentTarget.closest('ul')
            if (ul && ul.previousSibling instanceof HTMLElement) {
                ul.previousSibling.classList.add('active');
            }
            if (hasSubMenuLeft) {
                const subMenuUl = hasSubMenuLeft.closest('ul')
                if (subMenuUl && subMenuUl.previousSibling instanceof HTMLElement) {
                    subMenuUl.previousSibling.classList.add('active');
                }
            }
        } else {
            const ul = event.currentTarget.closest('.megaMenu-wrapper')
            if (ul && ul.previousSibling instanceof HTMLElement) {
                ul.previousSibling.classList.add('active');
            }
        }
    };
    return (
        <TopMenuStyle>
            <div className="ninjadash-top-menu">
                <ul>
                    <li className="">
                        <Link to="/admin" className="parent">
                            Dashboard
                        </Link>
                    </li>

                    <li className="has-subMenu">
                        <Link to="#" className="parent">
                            Apps
                        </Link>
                        <ul className="subMenu">
                            <li className="has-subMenu-left">
                                <Link to="#" className="parent">
                                    <Envelope/>Email
                                </Link>
                                <ul className="subMenu">
                                    <li>
                                        <NavLink onClick={addParentActive} to={`${path}/email/inbox`}>
                                            Inbox
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink onClick={addParentActive} to={`${path}/email/single/1585118055048`}>
                                            Read Email
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <NavLink onClick={addParentActive} to={`${path}/main/chat/private/rofiq@gmail.com`}>
                                    <Chat />Chat
                                </NavLink>
                            </li>

                            <li>
                                <NavLink onClick={addParentActive} to={`${path}/app/calendar/month`}>
                                    <Calendar3 /> Calendar
                                </NavLink>
                            </li>

                        </ul>
                    </li>
                </ul>
            </div>
        </TopMenuStyle>
    );
}

export default TopMenu;
