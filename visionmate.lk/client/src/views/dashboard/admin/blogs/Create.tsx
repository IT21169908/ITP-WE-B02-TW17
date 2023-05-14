import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button, Input, Skeleton } from 'antd';
import { Cards } from "../../../../components/cards/frame/CardFrame";
import { FormLayout } from '../../../../components/forms/Form';
import { AntdNotification } from "../../../../components/notifications/Notification";
import { Main } from '../../../../components/styled-components/styled-containers';
import { PageHeader } from '../../../../components/breadcrumbs/DashboardBreadcrumb';
import { HouseDoor } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router-dom";
import IBlog from "../../../../models/Blog";
import { BlogService } from "../../../../services/BlogService";
import { getCurrentDateTime } from "../../../../utils/date-time";

function CreateBlog({enableEdit}: { enableEdit: boolean }) {

    const navigate = useNavigate();
    const {blog: blogId} = useParams();
    const [blog, setBlog] = useState<IBlog | null>(null);

    useEffect(() => {
        if (!enableEdit) {
            setBlog(null);
        }
    }, [enableEdit]);

    useEffect(() => {
        async function loadBlogs() {
            try {
                const res = await BlogService.getBlogById(blogId);
                setBlog(res.data);
            } catch (error: any) {
                AntdNotification.error({
                    message: 'Blogs loading failed!',
                    description: `${error.response.data} -- ${getCurrentDateTime()}`,
                    duration: 20
                });
                console.error(error.response.data);
            }
        }

        if (enableEdit) {
            loadBlogs();
        }
    }, [enableEdit, blogId]);

    const onSubmitHandler = async (values: any) => {

        if (enableEdit) {
            if (blogId && blogId === values._id) {
                try {
                    const res = await BlogService.updateBlog(values);
                    if (res.success) {
                        AntdNotification.success({
                            message: 'Blog updated successfully!',
                            description: `${getCurrentDateTime()}`,
                            duration: 20
                        });
                        setBlog(res.data);
                        navigate('/admin/blogs');
                    }
                } catch (error: any){
                    AntdNotification.error({
                        message: 'Blog creating failed!',
                        description: `${error.response.data} -- ${getCurrentDateTime()}`,
                        duration: 20
                    });
                }
            } else {
                AntdNotification.warning({
                    message: 'Something went wrong!',
                    description: `ID mismatch or not found -- ${getCurrentDateTime()}`,
                    duration: 20
                });
            }
        } else {
            try {
                const res = await BlogService.createBlog(values);
                if (res.success) {
                    AntdNotification.success({
                        message: 'Blog created successfully!',
                        description: `${getCurrentDateTime()}`,
                        duration: 20
                    });
                    setBlog(null);
                    navigate('/admin/blogs');
                }
            } catch (error: any) {
                AntdNotification.error({
                    message: 'Blog creating failed!',
                    description: `${error.response.data} -- ${getCurrentDateTime()}`,
                    duration: 20
                });
            }
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.error(`Failed: ${JSON.stringify(errorInfo)}`);
        AntdNotification.warning({
            message: 'Something went wrong!',
            description: `Form submitting failed -- ${getCurrentDateTime()}`,
            duration: 1
        });
    };

    const pageHeaderItems = [
        {
            title: <div className="d-flex align-items-center"><HouseDoor /> &nbsp; Home</div>,
            href: '/admin',
        },
        {
            title: 'Create Blogs',
        },
    ];

    if (blogId && !blog) {
        AntdNotification.warning({
            message: 'Something went wrong!',
            description: `Check Server Connections -- ${getCurrentDateTime()}`,
            duration: 2
        });
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
            <PageHeader className="ninjadash-page-header-main" title="Create Treatment Plan" routes={pageHeaderItems} />
            <Main>
                <Row gutter={25} className="justify-content-center">
                    <Col md={6} lg={12} xs={24}>
                        <FormLayout title="Enter Blogs Information" initialValues={blog} onSubmit={onSubmitHandler} onFinishFailed={onFinishFailed}>
                            <Form.Item className="mb-2" name="_id" label="Id" hidden={true}>
                                <Input type="hidden" />
                            </Form.Item>
                            <Form.Item className="mb-2" name="title" label="Title" rules={[{required: true, message: 'Please input title!'}]}>
                                <Input />
                            </Form.Item>
                            <Form.Item className="mb-2" name="titleDescription" label="Title Description" rules={[{required: true, message: 'Please input title' +
                                    ' description!'}]}>
                               <Input />
                            </Form.Item>
                            <Form.Item className="mb-2" name="description" label="Description" rules={[{required: true, message: 'Please input description!'}]}>
                                
                                <TextArea rows={4} />
                            </Form.Item>
                            <Form.Item className="mb-2" name="tags" label="Tags" rules={[{required: true, message: 'Please input tags!'}]}>
                                <Input />
                            </Form.Item>
                            <Form.Item className="mb-2" name="reference" label="Reference" rules={[{required: true, message: 'Please input reference!'}]}>
                                <Input />
                            </Form.Item>
                            <Form.Item className="mb-2" name="status" label="Status" rules={[{required: false, message: 'Please input status!'}]}>
                                <Input />
                            </Form.Item>
                            <Form.Item className="mb-2" name="publishedDate" label="Published Date" rules={[{required: false, message: 'Please input published date!'}]}>
                                <Input />
                            </Form.Item>
                            <Form.Item className="ninjadash-form-action mt-4" style={{textAlign: 'right'}}>
                                <Button className="btn-signin w-50" type="primary" htmlType="submit" size="large">
                                    Save
                                </Button>
                            </Form.Item>
                        </FormLayout>
                    </Col>
                </Row>
            </Main>
        </>
    );
}

export default CreateBlog;
