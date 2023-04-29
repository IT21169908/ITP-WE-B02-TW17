import {MenuProps} from "antd";
import {NavLink} from "react-router-dom";
import React from "react";
import {HouseCheckFill} from "react-bootstrap-icons";


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


const sideBarItems = ({translate, path, toggleCollapsed, topMenu}: { translate: (text: string) => string, path: string, toggleCollapsed: () => void, topMenu: boolean }): MenuProps['items'] => {


    return [
        getItem(
            <NavLink onClick={toggleCollapsed} to={`${path}`}>
                {translate("dashboard")}
                <span className="badge badge-primary menuItem">2</span>
            </NavLink>,
            'dashboard',
            !topMenu && <HouseCheckFill/>,
        ),
        {type: 'divider'},
    ]
};

export default sideBarItems;