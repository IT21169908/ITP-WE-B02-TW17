import React, {useEffect, useState} from 'react';
import {Form, Row, Col, Button, Input, message, Select} from 'antd';
import {FormLayout} from '../../../../components/forms/Form';
import {Main} from '../../../../components/styled-components/styled-containers';
import {PageHeader} from '../../../../components/breadcrumbs/DashboardBreadcrumb';
import {HouseDoor} from "react-bootstrap-icons";
import Spectacle from "../../../../models/Spectacle";
import {useNavigate, useParams} from "react-router-dom";
import {SpectacleService} from "../../../../services/SpectacleService";
import {AntdNotification} from "../../../../components/notifications/Notification";
import {getCurrentDateTime} from "../../../../utils/date-time";

function SpectacleCreate({enableEdit}: { enableEdit: boolean }) {
    const navigate = useNavigate();
    const {spectacle: spectacle_id} = useParams();
    const [spectacle, setSpectacle] = useState<Spectacle | null>(null);


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
                console.error(error.response.data.error || error.response.data.message);
                message.error("Loading failed!")
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

    const onFinish = async (values: Spectacle) => {
        console.log('Success:', values);
        if (!enableEdit) {
            try {
                const res = await SpectacleService.createSpectacle(values);
                if (res.success) {
                    AntdNotification.success({
                        message: 'Spectacle created successfully!',
                        description: `${res.message} ${getCurrentDateTime()}`,
                        duration: 20
                    });
                    setSpectacle(null);
                    navigate('/admin/spectacles')
                }
            } catch (error: any) {
                console.error(error.response.data.error || error.response.data.message);
                AntdNotification.error({
                    message: 'Spectacles loading failed!',
                    description: `${error.response.data.error || error.response.data.message} -- ${getCurrentDateTime()}`,
                    duration: 20
                });
            }
        } else {
            if (spectacle_id) {
                try {
                    const res = await SpectacleService.updateSpectacle(spectacle_id, values);
                    if (res.success) {
                        AntdNotification.success({
                            message: 'Spectacle updated successfully!',
                            description: `${res.message} ${getCurrentDateTime()}`,
                            duration: 20
                        });
                        setSpectacle(res.data);
                    }
                } catch (error: any) {
                    AntdNotification.error({
                        message: 'Spectacle creating failed!',
                        description: `${error.response.data.error || error.response.data.message} -- ${getCurrentDateTime()}`,
                        duration: 20
                    });
                    console.log(error.response.data.error)
                }
            } else {
                message.error("Something went wrong!")
            }
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        message.error("Something went wrong!")
        console.log('Failed:', errorInfo);
    };

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
                                <Select>
                                    <Select.Option value="Full Rim">Full Rim</Select.Option>
                                    <Select.Option value="Half Rim">Half Rim</Select.Option>
                                    <Select.Option value="Rimless">Rimless</Select.Option>
                                    <Select.Option value="Round">Round</Select.Option>
                                    <Select.Option value="Square">Square</Select.Option>
                                    <Select.Option value="Rectangle">Rectangle</Select.Option>
                                    <Select.Option value="Cat Eye">Cat Eye</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item className="mb-2" name="frameMaterial" label="Frame Material"
                                       rules={[{required: true, message: 'Please input Frame Material!'}]}>
                                <Select>
                                    <Select.Option value="Metal">
                                        Metal (e.g. stainless steel, titanium, aluminum)
                                    </Select.Option>
                                    <Select.Option value="Plastic">
                                        Plastic (e.g. acetate, propionate, nylon)
                                    </Select.Option>
                                    <Select.Option value="Combination">
                                        Combination (e.g. metal and plastic)
                                    </Select.Option>
                                    <Select.Option value="Rimless">
                                        Rimless (e.g. titanium, stainless steel)
                                    </Select.Option>
                                    <Select.Option value="Wood">
                                        Wood (e.g. bamboo, rosewood)
                                    </Select.Option>
                                    <Select.Option value="Horn">
                                        Horn (e.g. buffalo horn, ox horn)
                                    </Select.Option>
                                    <Select.Option value="Carbon Fiber">
                                        Carbon Fiber (e.g. reinforced polymer, graphite)
                                    </Select.Option>
                                    <Select.Option value="Memory Metal">
                                        Memory Metal (e.g. Flexon, Trilaston)
                                    </Select.Option>
                                    <Select.Option value="Precious Metals">
                                        Precious Metals (e.g. gold, silver)
                                    </Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item className="mb-2" name="lensType" label="Lens Type"
                                       rules={[{required: true, message: 'Please input Lens Type!'}]}>
                                <Select>
                                    <Select.Option value="Single">Single</Select.Option>
                                    <Select.Option value="Bifocal">Bifocal</Select.Option>
                                    <Select.Option value="Trifocal">Trifocal</Select.Option>
                                    <Select.Option value="Progressive">Progressive</Select.Option>
                                    <Select.Option value="Photochromic">Photochromic</Select.Option>
                                    <Select.Option value="Polarized">Polarized</Select.Option>
                                    <Select.Option value="High-Index">High-Index</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item className="mb-2" name="lensMaterial" label="Lens Material"
                                       rules={[{required: true, message: 'Please input Lens Material!'}]}>
                                <Select>
                                    <Select.Option value="Glass">Glass</Select.Option>
                                    <Select.Option value="Plastic">Plastic</Select.Option>
                                    <Select.Option value="Polycarbonate">Polycarbonate</Select.Option>
                                    <Select.Option value="Trivex">Trivex</Select.Option>
                                    <Select.Option value="High-index plastic">High-index plastic</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item className="mb-2" name="lensCoating" label="Lens Coating"
                                       rules={[{required: true, message: 'Please input Lens Coating!'}]}>
                                <Select>
                                    <Select.Option value="Anti-Reflective (AR) Coating">Anti-Reflective (AR)
                                        Coating</Select.Option>
                                    <Select.Option value="Scratch-Resistant Coating">Scratch-Resistant
                                        Coating</Select.Option>
                                    <Select.Option value="UV-Blocking Coating">UV-Blocking Coating</Select.Option>
                                    <Select.Option value="Blue-Light Blocking Coating">Blue-Light Blocking
                                        Coating</Select.Option>
                                    <Select.Option value="Tinted Coating">Tinted Coating</Select.Option>
                                    <Select.Option value="Mirror Coating">Mirror Coating</Select.Option>
                                    <Select.Option value="Polarized Coating">Polarized Coating</Select.Option>
                                    <Select.Option value="Hydrophobic Coating">Hydrophobic Coating</Select.Option>
                                    <Select.Option value="Oleophobic Coating">Oleophobic Coating</Select.Option>
                                    <Select.Option value="Photochromic Coating">Photochromic Coating</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item className="mb-2" name="color" label="Color"
                                       rules={[{required: true, message: 'Please input Color!'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item className="mb-2" name="size" label="Size"
                                       rules={[{required: true, message: 'Please input Size!'}]}>
                                <Select>
                                    <Select.Option value="Small">Small: lens width less than 50 mm</Select.Option>
                                    <Select.Option value="Medium">Medium: lens width between 50-54 mm</Select.Option>
                                    <Select.Option value="Large">Large: lens width between 55-59 mm</Select.Option>
                                    <Select.Option value="Extra Large">Extra Large: lens width greater than 59 mm</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item className="mb-2" name="price" label="Price"
                                       rules={[
                                           {required: true, message: 'Please input Price!'},
                                           { pattern: /^(\d+(\.\d{1,2})?)?$/, message: 'Please input a valid Price!' }
                                       ]}>
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
