import {MenuProps} from "antd";
import {NavLink} from "react-router-dom";
import React from "react";
import {Cash, Eyeglasses, FileEarmarkPlus, FilePost, HouseCheckFill, Kanban, Truck} from "react-bootstrap-icons";


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


const AdminSideBarItems = ({translate, path, toggleCollapsed, topMenu}: {
    translate: (text: string) => string,
    path: string,
    toggleCollapsed: () => void,
    topMenu: boolean
}): MenuProps['items'] => {


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
        getItem(translate("Blogs"), 'blogs', !topMenu && <FilePost/>, [
                getItem(
                    <NavLink onClick={toggleCollapsed} to={`${path}/blogs`}>
                        {translate('Manage')}
                    </NavLink>,
                    'blogs.manage',
                    !topMenu && <Kanban/>,
                ),
                getItem(
                    <NavLink onClick={toggleCollapsed} to={`${path}/blogs/create`}>
                        {translate('Create')}
                    </NavLink>,
                    'blogs.create',
                    !topMenu && <FileEarmarkPlus/>,
                ),
            ]
        ),
        getItem(translate("Transactions"), 'transactions', !topMenu && <Cash/>, [
                getItem(
                    <NavLink onClick={toggleCollapsed} to={`${path}/transactions`}>
                        {translate('Manage')}
                    </NavLink>,
                    'transactions.manage',
                    !topMenu && <Kanban/>,
                ),
                getItem(
                    <NavLink onClick={toggleCollapsed} to={`${path}/transactions/create`}>
                        {translate('Create')}
                    </NavLink>,
                    'transactions.create',
                    !topMenu && <FileEarmarkPlus/>,
                ),
            ]
        ),
        getItem(
            <NavLink onClick={toggleCollapsed} to={`${path}/orders`}>
                {translate("All Orders")}
            </NavLink>
            , 'my_orders', !topMenu && <Truck/>,),
        {type: 'divider'},
    ]
};

export default AdminSideBarItems;
