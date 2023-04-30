import {Menu, MenuProps} from 'antd';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {changeDirectionMode, changeMenuMode} from '../../../redux/theme-layout/actionCreator';
import {useAppDispatch, useAppSelector} from "../../../hooks/redux-hooks";
import {RootState} from "../../../redux/store";
import {Role} from "../../../enums/Role";
import AdminSideBarItems from "../admin/AdminSideBarItems";
import PatientSideBarItems from "../patient/PatientSideBarItems";
import SurgeonSideBarItems from "../surgeon/SurgeonSideBarItems";

function SideMenuItem({toggleCollapsed}: { toggleCollapsed: () => void }) {

    const dispatch = useAppDispatch();
    const {t} = useTranslation();

    const translate = (text: string) => t(text)
    let userRole = parseInt(Role.SURGEON.toString()); //TODO
    let items: MenuProps['items'];


    const {topMenu} = useAppSelector((state: RootState) => {
        return {
            topMenu: state.ChangeLayoutMode.topMenu,
        };
    });

    // TODO: check this
    let path = '/admin';
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

    switch (userRole) {
        case Role.ADMIN:
            path = "/admin";
            items = AdminSideBarItems({translate, path, toggleCollapsed, topMenu});
            break;
        case Role.PATIENT:
            path = "/patient";
            items = PatientSideBarItems({translate, path, toggleCollapsed, topMenu});
            break;
        case Role.SURGEON:
            path = "/surgeon";
            items = SurgeonSideBarItems({translate, path, toggleCollapsed, topMenu});
            break;
        default:
            break;
    }

    return (
        <>
            <Menu
                onOpenChange={onOpenChange}
                onClick={onClick}
                style={{width: '100%'}}
                mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
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
        </>
    );
}


export default SideMenuItem;
