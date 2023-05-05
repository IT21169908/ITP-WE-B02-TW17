import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button, Input, Skeleton } from 'antd';
import { Cards } from "../../../../components/cards/frame/CardFrame";
import { FormLayout } from '../../../../components/forms/Form';
import { AntdNotification } from "../../../../components/notifications/Notification";
import { Main } from '../../../../components/styled-components/styled-containers';
import { PageHeader } from '../../../../components/breadcrumbs/DashboardBreadcrumb';
import { HouseDoor } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router-dom";
import IAppointmentTransaction from "../../../../models/AppointmentTransaction";
import { TransactionService } from "../../../../services/TransactionService";
import { getCurrentDateTime } from "../../../../utils/date-time";

function CreateTransaction({enableEdit}: { enableEdit: boolean }) {

    const navigate = useNavigate();
    const {transaction: transactionId} = useParams();
    const [transaction, setTransaction] = useState<IAppointmentTransaction | null>(null);

    useEffect(() => {
        if (!enableEdit) {
            setTransaction(null);
        }
    }, [enableEdit]);

    useEffect(() => {
        async function loadTransactions() {
            try {
                const res = await TransactionService.getTransactionById(transactionId);
                setTransaction(res.data);
            } catch (error: any) {
                AntdNotification.error({
                    message: 'Transactions loading failed!',
                    description: `${error.response.data} -- ${getCurrentDateTime()}`,
                    duration: 20
                });
                console.error(error.response.data);
            }
        }

        if (enableEdit) {
            loadTransactions();
        }
    }, [enableEdit, transactionId]);

    const onSubmitHandler = async (values: any) => {

        if (enableEdit) {
            if (transactionId && transactionId === values._id) {
                try {
                    const res = await TransactionService.updateTransaction(values);
                    if (res.success) {
                        AntdNotification.success({
                            message: 'Transaction updated successfully!',
                            description: `${getCurrentDateTime()}`,
                            duration: 20
                        });
                        setTransaction(res.data);
                    }
                } catch (error: any) {
                    AntdNotification.error({
                        message: 'Transaction creating failed!',
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
                const res = await TransactionService.createTransaction(values);
                if (res.success) {
                    AntdNotification.success({
                        message: 'Transaction created successfully!',
                        description: `${getCurrentDateTime()}`,
                        duration: 20
                    });
                    setTransaction(null);
                    navigate('/admin/transactions');
                }
            } catch (error: any) {
                AntdNotification.error({
                    message: 'Transaction creating failed!',
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
            title: 'Create Transactions',
        },
    ];

    if (transactionId && !transaction) {
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
            <PageHeader className="ninjadash-page-header-main" title="Create Transaction" routes={pageHeaderItems} />
            <Main>
                <Row gutter={25} className="justify-content-center">
                    <Col md={6} lg={12} xs={24}>
                        <FormLayout title="Enter Transactions Information" initialValues={transaction} onSubmit={onSubmitHandler} onFinishFailed={onFinishFailed}>
                            <Form.Item className="mb-2" name="_id" label="Id" hidden={true}>
                                <Input type="hidden" />
                            </Form.Item>
                            <Form.Item className="mb-2" name="appointmentId" label="Appointment Id" rules={[{required: true, message: 'Please input appointment Id!'}]}>
                                <Input />
                            </Form.Item>
                            <Form.Item className="mb-2" name="type" label="Type" rules={[{required: true, message: 'Please input type!'}]}>
                                <Input />
                            </Form.Item>
                            <Form.Item className="mb-2" name="amount" label="Amount" rules={[{required: true, message: 'Please input amount!'}]}>
                                <Input />
                            </Form.Item>
                            <Form.Item className="mb-2" name="currency" label="Currency" rules={[{required: true, message: 'Please input currency!'}]}>
                                <Input />
                            </Form.Item>
                            <Form.Item className="mb-2" name="paymentMethod" label="Payment Method" rules={[{required: false, message: 'Please input payment method!'}]}>
                                <Input />
                            </Form.Item>
                            <Form.Item className="mb-2" name="notes" label="Notes" rules={[{required: false, message: 'Please input notes!'}]}>
                                <Input />
                            </Form.Item>
                            <Form.Item className="mb-2" name="transactionType" label="Transaction Type" rules={[{required: false, message: 'Please input transaction type!'}]}>
                                <Input />
                            </Form.Item>
                            <Form.Item className="mb-2" name="transactionDate" label="Transaction Date" rules={[{required: false, message: 'Please input transaction date!'}]}>
                                <Input />
                            </Form.Item>
                            <Form.Item className="mb-2" name="transactionStatus" label="Transaction Status" rules={[{required: false, message: 'Please input transaction' +
                                    ' status!'}]}>
                                <Input />
                            </Form.Item>
                            <Form.Item className="mb-2" name="accountId" label="Account Id" rules={[{required: false, message: 'Please input account Id!'}]}>
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

export default CreateTransaction;
