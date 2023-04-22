import {Menu, MenuProps, Switch} from 'antd';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {NavLink} from 'react-router-dom';
import {changeDirectionMode, changeLayoutMode, changeMenuMode} from '../../../redux/theme-layout/actionCreator';
import {useAppDispatch, useAppSelector} from "../../../hooks/redux-hooks";
import {RootState} from "../../../redux/store";
import {GraphUpArrow, HouseCheckFill} from "react-bootstrap-icons";

function MenuItems({toggleCollapsed}: { toggleCollapsed: () => void }) {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    type MenuItem = Required<MenuProps>['items'][number];

    function getItem(label: React.ReactNode, key?: React.Key | null, icon?: React.ReactNode, children?: MenuItem[], type?: 'group',): MenuItem {
        return {
            key,
            icon,
            children,
            label,
            type,
        } as MenuItem;
    }

    const {topMenu} = useAppSelector((state: RootState) => {
        return {
            topMenu: state.ChangeLayoutMode.topMenu,
        };
    });

    // TODO: check this
    const path = '/admin';
    const pathName = window.location.pathname;
    const pathArray = pathName.split(path);
    const mainPath = pathArray[1];
    const mainPathSplit = mainPath ? mainPath.split('/') : [];

    const [openKeys, setOpenKeys] = React.useState(
        !topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : [],
    );
    const onOpenChange = (keys: any) => {
        setOpenKeys(keys[keys.length - 1] !== 'recharts' ? [keys.length && keys[keys.length - 1]] : keys);
    };

    const onClick = (item: any) => {
        if (item.keyPath.length === 1) setOpenKeys([]);
    };

    const changeLayout = (mode: string) => {
        dispatch(changeLayoutMode(mode));
    };
    const changeNavbar = (topMode: boolean) => {
        const html = document.querySelector('html');
        if (html) {
            if (topMode) {
                html.classList.add('ninjadash-topmenu');
            } else {
                html.classList.remove('ninjadash-topmenu');
            }
        }
        dispatch(changeMenuMode(topMode));
    };
    const changeLayoutDirection = (rtlMode: boolean) => {
        const html = document.querySelector('html');
        if (html) {
            if (rtlMode) {
                html.setAttribute('dir', 'rtl');
            } else {
                html.setAttribute('dir', 'ltr');
            }
        }
        dispatch(changeDirectionMode(rtlMode));
    };

    const darkmodeActivated = () => {
        document.body.classList.add('dark-mode');
    };

    const darkmodeDiactivated = () => {
        document.body.classList.remove('dark-mode');
    };

    const changeTheme = (value: boolean) => {
        if (value) {
            toggleCollapsed();
            darkmodeActivated();
            changeLayout('darkMode');
        } else {
            toggleCollapsed();
            darkmodeDiactivated();
            changeLayout('lightMode');
        }
    };

    const items: MenuProps['items'] = [
        getItem(t('dashboard'), 'dashboard', !topMenu && <HouseCheckFill/>,
            [
                getItem(
                    <NavLink onClick={toggleCollapsed} to={`${path}`}>
                        {t('demo')} {t('1')}
                    </NavLink>,
                    'demo-1',
                    null,
                ),
            ]
        ),
        getItem(
            <NavLink onClick={toggleCollapsed} to={`${path}/pages/changelog`}>
                {t('changelog')}
                <span className="badge badge-primary menuItem">1.0</span>
            </NavLink>,
            'changelog',
            !topMenu && <GraphUpArrow/>,
        ),
        {type: 'divider'},
    ];

    return (
        <>
            <Menu
                onOpenChange={onOpenChange}
                onClick={onClick}
                style={{width: '100%'}}
                mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
                // // eslint-disable-next-line no-nested-ternary
                defaultSelectedKeys={
                    !topMenu
                        ? [
                            `${
                                mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
                            }`,
                        ]
                        : []
                }
                defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
                overflowedIndicator={<>overflowedIndicator</>}
                openKeys={openKeys}
                items={items}
            />

            <Switch
                onChange={changeTheme}
                checkedChildren="Dark"
                unCheckedChildren="Light"
            /> Theme
        </>
    );
}


export default MenuItems;
