import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button, Input, Skeleton } from 'antd';
import { Cards } from "../../../../components/cards/frame/CardFrame";
import { FormLayout } from '../../../../components/forms/Form';
import { AntdNotification } from "../../../../components/notifications/Notification";
import { Main } from '../../../../components/styled-components/styled-containers';
import { PageHeader } from '../../../../components/breadcrumbs/DashboardBreadcrumb';
import { HouseDoor } from "react-bootstrap-icons";
import IAppointment from "../../../../models/Appointment";
import { useNavigate, useParams } from "react-router-dom";
import { AppointmentService } from "../../../../services/AppointmentService";
import { getCurrentDateTime } from "../../../../utils/date-time";

function CreateAppointment({enableEdit}: { enableEdit: boolean }) {

    const navigate = useNavigate();
    const {appointment: appointmentId} = useParams();
    const [appointment, setAppointment] = useState<IAppointment | null>(null);

    useEffect(() => {
        if (!enableEdit) {
            setAppointment(null);
        }
    }, [enableEdit]);

    useEffect(() => {
        async function loadAppointment() {
            try {
                const res = await AppointmentService.getAppointmentById(appointmentId);
                setAppointment(res.data);
            } catch (error: any) {
                AntdNotification.error({
                    message: 'Appointment loading failed!',
                    description: `${error.response.data.error || error.response.data.message} -- ${getCurrentDateTime()}`,
                    duration: 20
                });
                console.error(error.response.data.error || error.response.data.message);
            }
        }

        if (enableEdit) {
            loadAppointment();
        }
    }, [enableEdit, appointmentId]);

    const onSubmitHandler = async (values: IAppointment) => {
        if (enableEdit) {
            if (appointmentId && appointmentId === values._id) {
                try {
                    const res = await AppointmentService.updateAppointment(values);
                    if (res.success) {
                        AntdNotification.success({
                            message: 'Appointment updated successfully!',
                            description: `${getCurrentDateTime()}`,
                            duration: 20
                        });
                        setAppointment(res.data);
                    }
                } catch (error: any) {
                    AntdNotification.error({
                        message: 'Appointment creating failed!',
                        description: `${error.response.data.error || error.response.data.message} -- ${getCurrentDateTime()}`,
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
                const res = await AppointmentService.createAppointment(values);
                if (res.success) {
                    AntdNotification.success({
                        message: 'Appointment created successfully!',
                        description: `${getCurrentDateTime()}`,
                        duration: 20
                    });
                    setAppointment(null);
                    navigate('/patient/appointments');
                }
            } catch (error: any) {
                AntdNotification.error({
                    message: 'Appointment creating failed!',
                    description: `${error.response.data.error || error.response.data.message} -- ${getCurrentDateTime()}`,
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
            href: '/patient',
        },
        {
            title: 'Create Appointments',
        },
    ];

    if (appointmentId && !appointment) {
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
            <PageHeader className="ninjadash-page-header-main" title="Create Appointment" routes={pageHeaderItems} />
            <Main>
                <Row gutter={25} className="justify-content-center">
                    <Col md={6} lg={12} xs={24}>
                        <FormLayout title="Enter Appointment Information" initialValues={appointment} onSubmit={onSubmitHandler} onFinishFailed={onFinishFailed}>
                            <Form.Item className="mb-2" name="_id" label="Id" hidden={true}>
                                <Input type="hidden" />
                            </Form.Item>
                            <Form.Item className="mb-2" name="title" label="Title" rules={[{required: true, message: 'Please input title!'}]}>
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
                            <Form.Item className="mb-2" name="notes" label="Notes" rules={[{required: true, message: 'Please input notes!'}]}>
                                <Input />
                            </Form.Item>
                            <Form.Item className="mb-2" name="appointmentDate" label="Appointment Date" rules={[{required: true, message: 'Please input appointment date!'}]}>
                                <Input />
                            </Form.Item>
                            <Form.Item className="mb-2" name="duration" label="Duration" rules={[{required: true, message: 'Please input duration!'}]}>
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

export default CreateAppointment;
