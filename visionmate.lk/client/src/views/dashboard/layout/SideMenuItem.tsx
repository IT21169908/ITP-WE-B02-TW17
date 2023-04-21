import {Menu} from 'antd';
import React, {ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import {NavLink} from 'react-router-dom';
import {changeDirectionMode, changeLayoutMode, changeMenuMode} from '../../../redux/theme-layout/actionCreator';
import {ItemType} from "antd/es/menu/hooks/useItems";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux-hooks";
import {RootState} from "../../../redux/store";

function MenuItems({toggleCollapsed}: { toggleCollapsed: () => void }) {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    // const t = (text: string) => {
    //     return text;
    // }

    interface getItemInterface {
        label: ReactNode,
        key: string,
        icon: ReactNode,
        children?: ItemType[],
        type?: string
    }

    function getItem(label: ReactNode, key: string, icon: ReactNode, children?: ItemType[], type?: string): getItemInterface {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
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

    const items = [
        getItem(t('dashboard'), 'dashboard', !topMenu && <></>,
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
    ];

    return (
        <Menu
            onOpenChange={onOpenChange}
            onClick={onClick}
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
    );
}


export default MenuItems;
