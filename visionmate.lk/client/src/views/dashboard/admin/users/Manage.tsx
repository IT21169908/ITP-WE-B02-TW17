import React, {ReactNode, useEffect, useState} from 'react';
import {Button, Col, Input, message, Popconfirm, Row, Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {PageHeader} from "../../../../components/breadcrumbs/DashboardBreadcrumb";
import {Download, HouseDoor, Pencil, Plus, Search, Trash2} from "react-bootstrap-icons";
import {BorderLessHeading, Main, TopToolBox} from "../../../../components/styled-components/styled-containers";
import {Cards} from "../../../../components/cards/frame/CardFrame";
import {Link} from "react-router-dom";
import {NotFoundWrapper} from "../../patient/shop/style";
import Heading from "../../../../components/heading/Heading";
import JsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import {getCurrentDateTime} from "../../../../utils/date-time";
import User from "../../../../models/User";
import {RoleName} from "../../../../enums/Role";
import {UserService} from "../../../../services/UserService";

interface DataType {
    key: React.Key;
    _id?: string;
    name: string;
    email: string;
    phone?: string;
    role: string;
    lastLoggedIn?: string;
    action: ReactNode;
}

const dataTableColumn: ColumnsType<DataType> = [
    //{title: 'Id', dataIndex: '_id', key: '_id'},
    {title: '_id', dataIndex: '_id', key: '_id'},
    {title: 'name', dataIndex: 'name', key: 'name'},
    {title: 'email', dataIndex: 'email', key: 'email'},
    {title: 'phone', dataIndex: 'phone', key: 'phone'},
    {title: 'role', dataIndex: 'role', key: 'role'},
    {title: 'lastLoggedIn', dataIndex: 'lastLoggedIn', key: 'lastLoggedIn'},
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'operation',
        width: 100,
    },
];


const BreadcrumbItem = [
    {
        title: <div className="d-flex align-items-center"><HouseDoor/> &nbsp; Home</div>,
        href: '/admin',
    },
    {
        title: 'Manage Users',
    },
];

const ManageUsers: React.FC = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [tableDataSource, setTableDataSource] = useState<DataType[]>([]);

    const formatDataSource = (users: User[]): DataType[] => {
        return users.map((user) => {
            const {
                _id,
                name,
                email,
                phone,
                role,
                lastLoggedIn
            } = user;

            return {
                key: _id,
                _id,
                name,
                email,
                phone,
                role: RoleName[role],
                lastLoggedIn,
                action: (
                    <div className="table-actions">
                        <Link
                            className="btn btn-sm btn-warning text-white me-1"
                            to={`/admin/users/${_id}/edit`}
                        >
                            <Pencil/>
                        </Link>
                        <Popconfirm
                            title="Are You sure you want to delete this user?"
                            onConfirm={() => deleteUser(_id)}
                            onCancel={() => message.error('Delete canceled!')}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Link className="btn btn-sm btn-danger text-white" to="#">
                                <Trash2/>
                            </Link>
                        </Popconfirm>
                    </div>
                ),
            };
        });
    };

    useEffect(() => {
        async function loadUsers() {
            try {
                const res = await UserService.getAllUsers();
                if (isMounted) {
                    setUsers(res.data);
                    setFilteredUsers(res.data);
                }
            } catch (error: any) {
                console.error(error.response.data);
            }
        }

        let isMounted = true;

        loadUsers();
        return () => {
            // TODO unset tableDataSource[]
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        setTableDataSource(formatDataSource(filteredUsers));
    }, [filteredUsers])


    const deleteUser = async (_id: string) => {
        try {
            const res = await UserService.deleteUser(_id);
            if (res.success) {
                message.success(`${res.message}`);
                // TODO: REFACTOR this. Do not use filter, when large no of records exist
                const updatedUsers = users.filter(user => user._id !== _id);
                setUsers(updatedUsers);
                setTableDataSource(formatDataSource(updatedUsers));
            }
        } catch (error: any) {
            message.error(`${error.response.data.error || error.response.data.message}`)
            console.log(error.response.data.error)
        }
    }

    const generatePDF = (): void => {
        const doc = new JsPDF();

        // Add a title to the document
        doc.text("User Report", 14, 20);

        // Create a table
        const tableData = users.map((user) => [
            user._id,
            user.name,
            user.email,
            user.phone,
            RoleName[user.role],
            user.lastLoggedIn,
        ]);
        autoTable(doc, {
            head: [['_id', 'name', 'email', 'phone', 'RoleName', 'lastLoggedIn']],
            body: tableData,
        })

        // Save the document
        doc.save(`users-report-${getCurrentDateTime()}.pdf`);
    };

    const handleSearch = (e: any) => {
        console.log(e.target.value)
        const data = users.filter((item) => {
            return Object.keys(item).some((key) => {
                if (item[key] !== undefined) {
                    return item[key]!.toString().toLowerCase().includes(e.target.value.toLowerCase())
                }
                return false;
            })
        });
        setFilteredUsers(data);
    };
    return (<>
            <PageHeader className="ninjadash-page-header-main" title="Manage Users" routes={BreadcrumbItem}/>
            <Main>
                <Row gutter={15}>
                    <Col xs={24}>
                        <TopToolBox>
                            <Row gutter={0}>
                                <Col xxl={7} lg={12} xs={24}>
                                    <Input suffix={<Search/>} onChange={handleSearch} placeholder="Search this table"/>
                                </Col>
                            </Row>
                        </TopToolBox>
                        <BorderLessHeading>
                            <Cards isbutton={
                                <>
                                    <Button className="btn btn-warning h-auto me-2" onClick={generatePDF}>
                                        <Download className="me-2"/> Export PDF
                                    </Button>
                                    <Link className="btn btn-primary h-auto" type="link" to="/admin/users/create">
                                        <Plus/> Add New
                                    </Link>
                                </>
                            }>
                                {
                                    tableDataSource.length === 0 ? (
                                        <Col md={24}>
                                            <NotFoundWrapper>
                                                <Heading as="h1">No Users Found</Heading>
                                            </NotFoundWrapper>
                                        </Col>
                                    ) : (
                                        <><Table columns={dataTableColumn} dataSource={tableDataSource}/></>
                                    )
                                }
                            </Cards>
                        </BorderLessHeading>
                    </Col>
                </Row>
            </Main>
        </>
    )
};

export default ManageUsers;