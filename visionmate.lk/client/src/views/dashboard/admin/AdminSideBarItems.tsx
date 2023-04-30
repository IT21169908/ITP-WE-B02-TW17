import {MenuProps} from "antd";
import {NavLink} from "react-router-dom";
import React from "react";
import {Eyeglasses, HouseCheckFill} from "react-bootstrap-icons";
import topMenu from "../layout/TopMenu";


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


const AdminSideBarItems = ({translate, path, toggleCollapsed, topMenu}: { translate: (text: string) => string, path: string, toggleCollapsed: () => void, topMenu: boolean }): MenuProps['items'] => {


    return [
        getItem(
            <NavLink onClick={toggleCollapsed} to={`${path}`}>
                {translate("dashboard")}
                <span className="badge badge-primary menuItem">2</span>
            </NavLink>,
            'dashboard',
            !topMenu && <HouseCheckFill/>,
        ),
        getItem(translate("Spectacles"), 'spectacles', !topMenu && <Eyeglasses/>, [
                getItem(
                    <NavLink onClick={toggleCollapsed} to={`${path}/spectacles`}>
                        {translate('Manage')}
                    </NavLink>,
                    'spectacles.manage',
                    null,
                ),
                getItem(
                    <NavLink onClick={toggleCollapsed} to={`${path}/spectacles/create`}>
                        {translate('Create')}
                    </NavLink>,
                    'spectacles.create',
                    null,
                ),
            ]
        ),
        {type: 'divider'},
    ]
};

export default AdminSideBarItems;
