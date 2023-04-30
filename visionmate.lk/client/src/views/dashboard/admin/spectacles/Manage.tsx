import React, {ReactNode} from 'react';
import {Button, Col, Row, Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {PageHeader} from "../../../../components/breadcrumbs/DashboardBreadcrumb";
import {HouseDoor, Pencil, Plus, Trash2} from "react-bootstrap-icons";
import {BorderLessHeading, Main} from "../../../../components/styled-components/styled-containers";
import {Cards} from "../../../../components/cards/frame/CardFrame";
import DataTable from "../../../../components/tables/DataTable";
import {Link} from "react-router-dom";
import ISpectacle from "../../../../models/Spectacle";

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
    action: ReactNode;
}

const dataTableColumn: ColumnsType<DataType> = [
    {
        title: 'Full Name',
        width: 100,
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        width: 100,
        dataIndex: 'age',
        key: 'age',
        sorter: (a, b) => a.age - b.age,
    },
    {title: 'Column 1', dataIndex: 'address', key: '1'},
    {title: 'Column 2', dataIndex: 'address', key: '2'},
    {title: 'Column 3', dataIndex: 'address', key: '3'},
    {title: 'Column 4', dataIndex: 'address', key: '4'},
    {title: 'Column 5', dataIndex: 'address', key: '5'},
    {title: 'Column 6', dataIndex: 'address', key: '6'},
    {title: 'Column 7', dataIndex: 'address', key: '7'},
    {title: 'Column 8', dataIndex: 'address', key: '8'},
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'operation',
        width: 100,
    },
];

const tableDataSource: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York Park',
        action: (
            <div className="table-actions">
                <Link className="btn btn-sm btn-warning text-white me-1" to="/admin/spectacles/644d1e61ed372e583e3e4735/edit">
                    <Pencil/>
                </Link>
                <Link className="btn btn-sm btn-danger text-white" to="#">
                    <Trash2/>
                </Link>
            </div>
        ),
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 40,
        address: 'London Park',
        action: (
            <div className="table-actions">
                <Link className="btn btn-sm btn-warning text-white me-1" to="/admin/spectacles/644d1e70ed372e583e3e4738/edit">
                    <Pencil/>
                </Link>
                <Link className="btn btn-sm btn-danger text-white" to="#">
                    <Trash2/>
                </Link>
            </div>
        ),
    },
];

const BreadcrumbItem = [
    {
        title: <div className="d-flex align-items-center"><HouseDoor/> &nbsp; Home</div>,
        href: '/admin',
    },
    {
        title: 'Manage Spectacles',
    },
];

const ManageSpectacles: React.FC = () => {
    return (<>
            <PageHeader className="ninjadash-page-header-main" title="Manage Spectacles" routes={BreadcrumbItem}/>
            <Main>
                <Row gutter={15}>
                    <Col xs={24}>
                        <BorderLessHeading>
                            <Cards isbutton={
                                <Link className="btn btn-primary h-auto" type="link" to="/admin/spectacles/create">
                                   <Plus/> Add New
                                </Link>
                            }>
                                <Table columns={dataTableColumn} dataSource={tableDataSource}/>
                            </Cards>
                        </BorderLessHeading>
                    </Col>
                </Row>
            </Main>
        </>
    )
};

export default ManageSpectacles;