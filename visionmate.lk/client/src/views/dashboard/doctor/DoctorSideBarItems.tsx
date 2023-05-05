import {MenuProps} from "antd";
import {NavLink} from "react-router-dom";
import React from "react";
import { HouseCheckFill, Kanban, FileEarmarkPlus, FileEarmarkText } from "react-bootstrap-icons";

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

const DoctorSideBarItems = ({translate, path, toggleCollapsed, topMenu}: { translate: (text: string) => string, path: string, toggleCollapsed: () => void, topMenu: boolean }): MenuProps['items'] => {

    return [
        getItem(
            <NavLink onClick={toggleCollapsed} to={`${path}`}>
                {translate("dashboard")}
                <span className="badge badge-primary menuItem">2</span>
            </NavLink>,
            'dashboard',
            !topMenu && <HouseCheckFill/>,
        ),
        getItem(translate("Treatment plans"), 'treatment-plans', !topMenu && <FileEarmarkText />, [
                getItem(
                    <NavLink onClick={toggleCollapsed} to={`${path}/treatment-plans`}>
                        {translate('Manage')}
                    </NavLink>,
                    'treatment-plans.manage',
                    !topMenu && <Kanban />,
                ),
                getItem(
                    <NavLink onClick={toggleCollapsed} to={`${path}/treatment-plans/create`}>
                        {translate('Create')}
                    </NavLink>,
                    'treatment-plans.create',
                    !topMenu && <FileEarmarkPlus />,
                ),
            ]
        ),
        {type: 'divider'},
    ]
};

export default DoctorSideBarItems;
