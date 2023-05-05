import React, { useEffect, useState } from 'react';
import { Col, message, Popconfirm, Row, Skeleton, Table } from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {PageHeader} from "../../../../components/breadcrumbs/DashboardBreadcrumb";
import { HouseDoor, PencilFill, Plus, Trash } from "react-bootstrap-icons";
import {BorderLessHeading, Main} from "../../../../components/styled-components/styled-containers";
import {Cards} from "../../../../components/cards/frame/CardFrame";
import { Link, useNavigate } from "react-router-dom";
import IBlog from "../../../../models/Blog";
import { BlogService } from '../../../../services/BlogService';

interface DataType {
    key:  string;
    title: string;
    titleDescription: string;
    description: string;
    tags: string;
    reference:string;
    status?: string | undefined;
    publishedDate?: string | undefined;
    action: JSX.Element;
}

const dataTableColumn: ColumnsType<DataType> = [
    {title: 'Title', width: 100, dataIndex: 'title', key: 'title'},
    {title: 'Title Description', width: 150, dataIndex: 'titleDescription', key: 'titleDescription'},
    {title: 'Description', dataIndex: 'description', key: 'description'},
    {title: 'Tags', dataIndex: 'tags', key: 'tags'},
    {title: 'Reference', dataIndex: 'reference', key: 'reference'},
    {title: 'Status', dataIndex: 'status', key: 'status'},
    {title: 'Published Date', dataIndex: 'publishedDate', key: 'publishedDate'},
    {title: 'Action', dataIndex: 'action', key: 'operation', width: 100},
];

const BreadcrumbItem = [
    {
        title: <div className="d-flex align-items-center"><HouseDoor/> &nbsp; Home</div>,
        href: '/admin',
    },
    {
        title: 'Manage Blogs',
    },
];

const ManageBlogs: React.FC = () => {

    const navigate = useNavigate();
    const [blogs, setBlogs] = useState<IBlog[]>([]);
    const [tableDataSource, setTableDataSource] = useState<DataType[]>([]);

    useEffect(() => {
        let isMounted = true;

        async function loadBlogs() {
            try {
                const res = await BlogService.getAllBlogs();
                if (isMounted) {
                    setBlogs(res.data);
                }
            } catch (error: any) {
                console.error(error.response.data);
            }
        }

        loadBlogs();
        return () => {
            // TODO unset tableDataSource[]
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        setTableDataSource(formatDataSource(blogs));
    }, [blogs]);

    const confirmDelete = async (id: string): Promise<void> => {
        try {
            const res = await BlogService.deleteBlog(id);
            if (res.success) {
                message.success(`${res.message}`);
                window.location.reload(); // TODO - remove page reload
            }
        } catch (error: any) {
            message.error(`${ error.response.data.error || error.response.data.message }`);
            console.log(error.response.data.error);
        }
    };

    const cancelDelete = () => {
        message.error('Delete canceled!');
    };

    const formatDataSource = (blogs: IBlog[]): DataType[] => {
        return blogs.map((blog) => {
            const {
                _id,
                title,
                titleDescription,
                description,
                tags,
                reference,
                status,
                publishedDate
            } = blog;

            return {
                key: _id,
                title,
                titleDescription,
                description,
                tags,
                reference,
                status,
                publishedDate,
                action: (
                    <div className="table-actions">
                        <Link
                            className="btn btn-sm btn-outline-warning fw-bolder me-1 mt-1"
                            to={`/admin/blogs/${_id}/edit`}
                        >
                            <PencilFill/>
                        </Link>
                        <Popconfirm
                            title="Are you sure delete this blog?"
                            onConfirm={() => confirmDelete(_id)}
                            onCancel={cancelDelete}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Link className="btn btn-sm btn-outline-danger fw-bolder mt-1" to="#">
                                <Trash/>
                            </Link>
                        </Popconfirm>
                    </div>
                ),
            };
        });
    };

    if (tableDataSource.length === 0) {
        return (
            <Row gutter={25} className="justify-content-center">
                <Col md={6} lg={12} xs={24}>
                    <Cards title="Loading..." caption="Loading Skeleton">
                        <Skeleton active paragraph={{rows: 16}} />
                    </Cards>
                </Col>
            </Row>
        );
    }

    return (
        <>
            <PageHeader className="ninjadash-page-header-main" title="Manage Blogs" routes={BreadcrumbItem}/>
            <Main>
                <Row gutter={15}>
                    <Col xs={24}>
                        <BorderLessHeading>
                            <Cards isbutton={
                                <Link className="btn btn-primary h-auto" type="link" to="/admin/blogs/create">
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
    );
};

export default ManageBlogs;

