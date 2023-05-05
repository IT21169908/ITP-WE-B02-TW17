import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button, Input, Skeleton, DatePicker } from 'antd';
import { Cards } from "../../../../components/cards/frame/CardFrame";
import { FormLayout } from '../../../../components/forms/Form';
import { AntdNotification } from "../../../../components/notifications/Notification";
import { Main } from '../../../../components/styled-components/styled-containers';
import { PageHeader } from '../../../../components/breadcrumbs/DashboardBreadcrumb';
import { HouseDoor } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router-dom";
import ITreatmentPlan from "../../../../models/TreatmentPlan";
import { TreatmentPlanService } from "../../../../services/TreatmentPlanService";
import { getCurrentDateTime } from "../../../../utils/date-time";

function CreateTreatmentPlan({enableEdit}: { enableEdit: boolean }) {

    const { RangePicker } = DatePicker;
    const navigate = useNavigate();
    const {treatmentPlan: treatmentPlanId} = useParams();
    const [treatmentPlan, setTreatmentPlan] = useState<ITreatmentPlan | null>(null);

    useEffect(() => {
        if (!enableEdit) {
            setTreatmentPlan(null);
        }
    }, [enableEdit]);

    useEffect(() => {
        async function loadTreatmentPlan() {
            try {
                const res = await TreatmentPlanService.getTreatmentPlanById(treatmentPlanId);
                setTreatmentPlan(res.data);
            } catch (error: any) {
                AntdNotification.error({
                    message: 'TreatmentPlan loading failed!',
                    description: `${error.response.data} -- ${getCurrentDateTime()}`,
                    duration: 20
                });
                console.error(error.response.data);
            }
        }

        if (enableEdit) {
            loadTreatmentPlan();
        }
    }, [enableEdit, treatmentPlanId]);

    const onSubmitHandler = async (values: any) => {

        values = {
            ...values,
            startDate: values.dateRange[0],
            endDate: values.dateRange[1],
        }
        delete values['dateRange'];

        if (enableEdit) {
            if (treatmentPlanId && treatmentPlanId === values._id) {
                try {
                    const res = await TreatmentPlanService.updateTreatmentPlan(values);
                    if (res.success) {
                        AntdNotification.success({
                            message: 'TreatmentPlan updated successfully!',
                            description: `${getCurrentDateTime()}`,
                            duration: 20
                        });
                        setTreatmentPlan(res.data);
                    }
                } catch (error: any) {
                    AntdNotification.error({
                        message: 'TreatmentPlan creating failed!',
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
                const res = await TreatmentPlanService.createTreatmentPlan(values);
                if (res.success) {
                    AntdNotification.success({
                        message: 'TreatmentPlan created successfully!',
                        description: `${getCurrentDateTime()}`,
                        duration: 20
                    });
                    setTreatmentPlan(null);
                    navigate('/doctor/treatment-plans');
                }
            } catch (error: any) {
                AntdNotification.error({
                    message: 'TreatmentPlan creating failed!',
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
            href: '/doctor',
        },
        {
            title: 'Create Treatment Plans',
        },
    ];

    if (treatmentPlanId && !treatmentPlan) {
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
                        <FormLayout title="Enter Treatment Plan Information" initialValues={treatmentPlan} onSubmit={onSubmitHandler} onFinishFailed={onFinishFailed}>
                            <Form.Item className="mb-2" name="_id" label="Id" hidden={true}>
                                <Input type="hidden" />
                            </Form.Item>
                            <Form.Item className="mb-2" name="title" label="Title" rules={[{required: true, message: 'Please input title!'}]}>
                                <Input />
                            </Form.Item>
                            <Form.Item className="mb-2" name="description" label="Description" rules={[{required: true, message: 'Please input description!'}]}>
                                <TextArea rows={4} />
                            </Form.Item>
                            <Form.Item className="mb-2" name="treatmentPlan" label="Treatment Plan" rules={[{required: true, message: 'Please input treatment plan!'}]}>
                                <Input />
                            </Form.Item>
                            {/*<Form.Item className="mb-2" name="startDate" label="Start Date" rules={[{required: true, message: 'Please input start date!'}]}>*/}
                            {/*    <Input />*/}
                            {/*</Form.Item>*/}
                            {/*<Form.Item className="mb-2" name="endDate" label="End Date" rules={[{required: true, message: 'Please input end date!'}]}>*/}
                            {/*    <Input />*/}
                            {/*</Form.Item>*/}
                            <Form.Item name="dateRange" label="Start Date - End Date" rules={[{required: true, message: 'Please input start date - end date!'}]}>
                                <RangePicker />
                            </Form.Item>
                            {/*<Form.Item className="mb-2" name="patientId" label="Patient Id" rules={[{required: false, message: 'Please input patient id!'}]}>*/}
                            {/*    <Input />*/}
                            {/*</Form.Item>*/}
                            {/*<Form.Item className="mb-2" name="doctorId" label="Doctor Id" rules={[{required: false, message: 'Please input doctor id!'}]}>*/}
                            {/*    <Input />*/}
                            {/*</Form.Item>*/}
                            <Form.Item className="mb-2" name="diagnosis" label="Diagnosis" rules={[{required: false, message: 'Please input diagnosis!'}]}>
                                <Input />
                            </Form.Item>
                            <Form.Item className="mb-2" name="medications" label="Medications" rules={[{required: false, message: 'Please input medications!'}]}>
                                <Input />
                            </Form.Item>
                            <Form.Item className="mb-2" name="procedures" label="Procedures" rules={[{required: false, message: 'Please input procedures!'}]}>
                                <Input />
                            </Form.Item>
                            <Form.Item className="mb-2" name="instructions" label="Instructions" rules={[{required: false, message: 'Please input instructions!'}]}>
                                <Input />
                            </Form.Item>
                            <Form.Item className="mb-2" name="referral" label="Referral" rules={[{required: false, message: 'Please input referral!'}]}>
                                <Input />
                            </Form.Item>
                            <Form.Item className="mb-2" name="progressNotes" label="Progress Notes" rules={[{required: false, message: 'Please input progress notes!'}]}>
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

export default CreateTreatmentPlan;
