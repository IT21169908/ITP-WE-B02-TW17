import {MenuProps} from "antd";
import {NavLink} from "react-router-dom";
import React from "react";
import {
    Eyeglasses,
    HouseCheckFill,
    Bell,
    Kanban,
    FileEarmarkPlus,
    BellFill,
    CartCheckFill, Truck
} from "react-bootstrap-icons";

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


const PatientSideBarItems = ({translate, path, toggleCollapsed, topMenu}: {
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
        getItem(translate("Appointments"), 'appointments', !topMenu && <Eyeglasses/>, [
                getItem(
                    <NavLink onClick={toggleCollapsed} to={`${path}/appointments`}>
                        {translate('Manage')}
                    </NavLink>,
                    'appointments.manage',
                    !topMenu && <Kanban/>,
                ),
                getItem(
                    <NavLink onClick={toggleCollapsed} to={`${path}/appointments/create`}>
                        {translate('Create')}
                    </NavLink>,
                    'appointments.create',
                    !topMenu && <FileEarmarkPlus/>,
                ),
            ]
        ),
        getItem(translate("Notifications"), 'notifications', !topMenu && <Bell/>, [
                getItem(
                    <NavLink onClick={toggleCollapsed} to={`${path}/notifications`}>
                        {translate('Manage')}
                    </NavLink>,
                    'notifications.manage',
                    !topMenu && <BellFill/>,
                ),
            ]
        ),
        getItem(
            <NavLink onClick={toggleCollapsed} to={`${path}/shop`}>
                {translate("Shop")}
            </NavLink>
            , 'shop', !topMenu && <CartCheckFill/>,),
        getItem(
            <NavLink onClick={toggleCollapsed} to={`${path}/orders`}>
                {translate("My Orders")}
            </NavLink>
            , 'my_orders', !topMenu && <Truck/>,),
        {type: 'divider'},
    ]
};

export default PatientSideBarItems;
