import React, {useEffect, useState} from 'react';
import {Form, Row, Col, Button, Input} from 'antd';
import {FormLayout} from '../../../../components/forms/Form';
import {Main} from '../../../../components/styled-components/styled-containers';
import {PageHeader} from '../../../../components/breadcrumbs/DashboardBreadcrumb';
import {HouseDoor} from "react-bootstrap-icons";
import Spectacle from "../../../../models/Spectacle";
import {useParams} from "react-router-dom";
import ISpectacle from "../../../../models/Spectacle";

function SpectacleCreate({enableEdit}: { enableEdit: boolean }) {
    const {spectacle: spectacle_id} = useParams();
    const [spectacle, setSpectacle] = useState<ISpectacle | null>(null);
    const onFinish = (values: Spectacle) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        console.log(spectacle)
        // get spectacle
    }, [spectacle, spectacle_id])

    const items = [
        {
            title: <div className="d-flex align-items-center"><HouseDoor/> &nbsp; Home</div>,
            href: '/admin',
        },
        {
            title: 'Spectacle Create',
        },
    ];

    return (
        <>
            <PageHeader className="ninjadash-page-header-main" title="Add Spectacle" routes={items}/>
            <Main>
                <Row gutter={25}>
                    <Col lg={12} xs={24}>
                        <FormLayout title="Enter Spectacle Information" initialValues={spectacle} onSubmit={onFinish} onFinishFailed={onFinishFailed}>
                            <Form.Item className="mb-2" name="name" label="Name" rules={[{required: true, message: 'Please input name!'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item className="mb-2" name="frame_style" label="Frame Style" rules={[{required: true, message: 'Please input Frame Style!'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item className="mb-2" name="frame_material" label="Frame Material" rules={[{required: true, message: 'Please input Frame Material!'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item className="mb-2" name="lens_type" label="Lens Type" rules={[{required: true, message: 'Please input Lens Type!'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item className="mb-2" name="lens_material" label="Lens Material" rules={[{required: true, message: 'Please input Lens Material!'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item className="mb-2" name="lens_coating" label="Lens Coating" rules={[{required: true, message: 'Please input Lens Coating!'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item className="mb-2" name="color" label="Color" rules={[{required: true, message: 'Please input Color!'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item className="mb-2" name="size" label="Size" rules={[{required: true, message: 'Please input Size!'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item className="mb-2" name="price" label="Price" rules={[{required: true, message: 'Please input Price!'}]}>
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

export default SpectacleCreate;
