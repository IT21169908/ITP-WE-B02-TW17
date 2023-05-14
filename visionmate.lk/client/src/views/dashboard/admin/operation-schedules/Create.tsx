import React, {useEffect, useState} from 'react';
import {Form, Row, Col, Button, Input, Skeleton, Select, DatePicker} from 'antd';
import {Cards} from "../../../../components/cards/frame/CardFrame";
import {FormLayout} from '../../../../components/forms/Form';
import {AntdNotification} from "../../../../components/notifications/Notification";
import {Main} from '../../../../components/styled-components/styled-containers';
import {PageHeader} from '../../../../components/breadcrumbs/DashboardBreadcrumb';
import {HouseDoor} from "react-bootstrap-icons";
import {useNavigate, useParams} from "react-router-dom";
import {ScheduleService} from "../../../../services/ScheduleService";
import {getCurrentDateTime} from "../../../../utils/date-time";
import Schedule from "../../../../models/Schedule";

function CreateSchedule({enableEdit}: { enableEdit: boolean }) {

    const navigate = useNavigate();
    const {scheduleId} = useParams();
    const [schedule, setSchedule] = useState<Schedule | null>(null);

    useEffect(() => {
        if (!enableEdit) {
            setSchedule(null);
        }
    }, [enableEdit]);

    useEffect(() => {
        async function loadSchedules() {
            try {
                const res = await ScheduleService.getScheduleById(scheduleId);
                setSchedule(res.data);
            } catch (error: any) {
                AntdNotification.error({
                    message: 'Schedules loading failed!',
                    description: `${error.response.data.error || error.response.data.message} -- ${getCurrentDateTime()}`,
                    duration: 20
                });
                console.error(error.response.data.error || error.response.data.message);
            }
        }

        if (enableEdit) {
            loadSchedules();
        }
    }, [enableEdit, scheduleId]);

    const onSubmitHandler = async (values: any) => {

        if (enableEdit) {
            if (scheduleId) {
                try {
                    const res = await ScheduleService.updateSchedule({...values, _id: scheduleId});
                    if (res.success) {
                        AntdNotification.success({
                            message: 'Schedule updated successfully!',
                            description: `${getCurrentDateTime()}`,
                            duration: 20
                        });
                        setSchedule(res.data);
                    }
                } catch (error: any) {
                    AntdNotification.error({
                        message: 'Schedule creating failed!',
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
                const res = await ScheduleService.createSchedule(values);
                if (res.success) {
                    AntdNotification.success({
                        message: 'Schedule created successfully!',
                        description: `${getCurrentDateTime()}`,
                        duration: 20
                    });
                    setSchedule(null);
                    navigate('/admin/operations/schedules');
                }
            } catch (error: any) {
                AntdNotification.error({
                    message: 'Schedule creating failed!',
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
            title: <div className="d-flex align-items-center"><HouseDoor/> &nbsp; Home</div>,
            href: '/admin',
        },
        {
            title: 'Create Schedules',
        },
    ];

    if (scheduleId && !schedule) {
        AntdNotification.warning({
            message: 'Something went wrong!',
            description: `Check Server Connections -- ${getCurrentDateTime()}`,
            duration: 2
        });
        return (
            <Row gutter={25} className="justify-content-center">
                <Col md={6} lg={12} xs={24}>
                    <Cards title="Loading..." caption="Loading Skeleton">
                        <Skeleton active paragraph={{rows: 16}}/>
                    </Cards>
                </Col>
            </Row>
        );
    }

    return (
        <>
            <PageHeader className="ninjadash-page-header-main" title="Create Schedule" routes={pageHeaderItems}/>
            <Main>
                <Row gutter={25} className="justify-content-center">
                    <Col md={6} lg={12} xs={24}>
                        <FormLayout title="Enter Schedules Information" initialValues={schedule ? schedule : {
                            surgeonId: '644df7205bdac44eda81f520',
                            patientId: '64457297aafeed944ad52b50'
                        }}
                                    onSubmit={onSubmitHandler} onFinishFailed={onFinishFailed}>

                            <Form.Item className="mb-2" name="schedule" label="Schedule name"
                                       rules={[{required: true, message: 'Please input Schedule Name!'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item className="mb-2" name="surgeonId" label="Surgeon"
                                       rules={[{required: true, message: 'Please select surgeon!'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item className="mb-2" name="patientId" label="Patient"
                                       rules={[{required: true, message: 'Please select patient!'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item className="mb-2" name="scheduleDate" label="Schedule Date"
                                       rules={[{required: true, message: 'Please Enter schedule date!'}]}>
                                <Input/>
                                {/*<DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>*/}
                            </Form.Item>
                            <Form.Item className="mb-2" name="remark" label="Remark"
                                       rules={[{required: false, message: 'Please input your remarks!'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item className="mb-2" name="status" label="Status"
                                       rules={[{required: false, message: 'Please operation status!'}]}>
                                <Select
                                    options={[
                                        {value: 'pending', label: 'pending'},
                                        {value: 'cancelled', label: 'cancelled'},
                                        {value: 'finished', label: 'finished'},
                                    ]}
                                />
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

export default CreateSchedule;
