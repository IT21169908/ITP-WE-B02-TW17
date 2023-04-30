import React, {useEffect, useState} from 'react';
import {Form, Row, Col, Button, Input} from 'antd';
import {FormLayout} from '../../../../components/forms/Form';
import {Main} from '../../../../components/styled-components/styled-containers';
import {PageHeader} from '../../../../components/breadcrumbs/DashboardBreadcrumb';
import {HouseDoor} from "react-bootstrap-icons";
import Spectacle from "../../../../models/Spectacle";
import {useParams} from "react-router-dom";
import {SpectacleService} from "../../../../services/SpectacleService";

function SpectacleCreate({enableEdit}: { enableEdit: boolean }) {
    const {spectacle: spectacle_id} = useParams();
    const [spectacle, setSpectacle] = useState<Spectacle | null>(null);
    const onFinish = async (values: Spectacle) => {
        console.log('Success:', values);
        if (!enableEdit) {
            try {
                const res = await SpectacleService.createSpectacle(values);
                if (res.success) {
                    alert(res.message)
                    setSpectacle(null);
                }
            } catch (error: any) {
                console.error(error.response.data);
            }
        } else {
            if (spectacle_id) {
                try {
                    const res = await SpectacleService.updateSpectacle(spectacle_id, values);
                    if (res.success) {
                        alert(res.message)
                        setSpectacle(res.data);
                    }
                } catch (error: any) {
                    alert(error.response.data.error || error.response.data.message)
                    console.log(error.response.data.error)
                }
            } else {
                alert("Something went wrong!")
            }
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        //if (!enableEdit) {
        setSpectacle(null);
        //}
    }, [enableEdit]);

    useEffect(() => {
        let isMounted = true;

        async function loadSpectacle() {
            try {
                const res = await SpectacleService.getSpectacleById(spectacle_id);
                if (isMounted) {
                    setSpectacle(res.data);
                }
            } catch (error: any) {
                console.error(error.response.data);
            }
        }
        if (enableEdit) {
            loadSpectacle();
        }

        return () => {
            isMounted = false;
        };
    }, [enableEdit, spectacle_id]);

    const items = [
        {
            title: <div className="d-flex align-items-center"><HouseDoor/> &nbsp; Home</div>,
            href: '/admin',
        },
        {
            title: 'Spectacle Create',
        },
    ];
    console.log("spectacle --> ", spectacle)


    if (spectacle_id && !spectacle) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <PageHeader className="ninjadash-page-header-main" title="Add Spectacle" routes={items}/>
            <Main>
                <Row gutter={25}>
                    <Col lg={12} xs={24}>
                        <FormLayout title="Enter Spectacle Information" initialValues={spectacle} onSubmit={onFinish}
                                    onFinishFailed={onFinishFailed}>
                            <Form.Item className="mb-2" name="name" label="Name"
                                       rules={[{required: true, message: 'Please input name!'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item className="mb-2" name="frameStyle" label="Frame Style"
                                       rules={[{required: true, message: 'Please input Frame Style!'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item className="mb-2" name="frameMaterial" label="Frame Material"
                                       rules={[{required: true, message: 'Please input Frame Material!'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item className="mb-2" name="lensType" label="Lens Type"
                                       rules={[{required: true, message: 'Please input Lens Type!'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item className="mb-2" name="lensMaterial" label="Lens Material"
                                       rules={[{required: true, message: 'Please input Lens Material!'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item className="mb-2" name="lensCoating" label="Lens Coating"
                                       rules={[{required: true, message: 'Please input Lens Coating!'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item className="mb-2" name="color" label="Color"
                                       rules={[{required: true, message: 'Please input Color!'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item className="mb-2" name="size" label="Size"
                                       rules={[{required: true, message: 'Please input Size!'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item className="mb-2" name="price" label="Price"
                                       rules={[{required: true, message: 'Please input Price!'}]}>
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
