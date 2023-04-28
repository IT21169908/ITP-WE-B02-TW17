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


const sideBarItems = ({translate, path, toggleCollapsed}: { translate: (text: string) => string, path: string, toggleCollapsed: () => void }): MenuProps['items'] => {


    return [
        getItem(
            <NavLink onClick={toggleCollapsed} to={`${path}`}>
                {translate("dashboard")}
                <span className="badge badge-primary menuItem">2</span>
            </NavLink>,
            'dashboard',
            !topMenu && <HouseCheckFill/>,
        ),
        getItem(translate("Manage Spectacles"), 'spectacles', <Eyeglasses/>, [
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

export default sideBarItems;