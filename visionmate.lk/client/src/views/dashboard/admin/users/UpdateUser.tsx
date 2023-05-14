import React, {useEffect, useState} from 'react';
import {Form, Row, Col, Button, Input, message, Select} from 'antd';
import {FormLayout} from '../../../../components/forms/Form';
import {Main} from '../../../../components/styled-components/styled-containers';
import {PageHeader} from '../../../../components/breadcrumbs/DashboardBreadcrumb';
import {HouseDoor} from "react-bootstrap-icons";
import {useNavigate, useParams} from "react-router-dom";
import {AntdNotification} from "../../../../components/notifications/Notification";
import {getCurrentDateTime} from "../../../../utils/date-time";
import User from "../../../../models/User";
import {UserService} from "../../../../services/UserService";

function UpdateUser({enableEdit}: { enableEdit: boolean }) {
    const navigate = useNavigate();
    const {user_id} = useParams();
    const [user, setUser] = useState<User | null>(null);


    useEffect(() => {
        //if (!enableEdit) {
        setUser(null);
        //}
    }, [enableEdit]);

    useEffect(() => {
        let isMounted = true;

        async function loadUser() {
            try {
                const res = await UserService.getUserById(user_id);
                if (isMounted) {
                    setUser(res.data);
                }
            } catch (error: any) {
                console.error(error.response.data);
                message.error("Loading failed!")
            }
        }

        if (enableEdit) {
            loadUser();
        }

        return () => {
            isMounted = false;
        };
    }, [enableEdit, user_id]);

    const items = [
        {
            title: <div className="d-flex align-items-center"><HouseDoor/> &nbsp; Home</div>,
            href: '/admin',
        },
        {
            title: 'Update Create',
        },
    ];
    console.log("user --> ", user)

    const onFinish = async (values: User) => {
        console.log('Success:', values);
        if (enableEdit && user_id) {
            try {
                const res = await UserService.updateUser(user_id, values);
                if (res.success) {
                    AntdNotification.success({
                        message: 'User updated successfully!',
                        description: `${res.message} ${getCurrentDateTime()}`,
                        duration: 20
                    });
                    setUser(res.data);
                }
            } catch (error: any) {
                AntdNotification.error({
                    message: 'User creating failed!',
                    description: `${error.response.data.error || error.response.data.message} -- ${getCurrentDateTime()}`,
                    duration: 20
                });
                console.log(error.response.data.error)
            }

        } else {
            message.error("Something went wrong!")
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        message.error("Something went wrong!")
        console.log('Failed:', errorInfo);
    };

    if (user_id && !user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <PageHeader className="ninjadash-page-header-main" title="Update User" routes={items}/>
            <Main>
                <Row gutter={25}>
                    <Col lg={12} xs={24}>
                        <FormLayout title="Enter User Information" initialValues={user} onSubmit={onFinish}
                                    onFinishFailed={onFinishFailed}>
                            <Form.Item className="mb-2" name="name" label="Name"
                                       rules={[{required: true, message: 'Please input name!'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item className="mb-2" name="email" label="Email Address"
                                       rules={[{required: true, message: 'Please input email!'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item className="mb-2" name="phone" label="Phone Number"
                                       rules={[{required: true, message: 'Please input phone!'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item className="ninjadash-form-action">
                                <Button className="btn-signin" type="primary" htmlType="submit" size="large">
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

export default UpdateUser;
