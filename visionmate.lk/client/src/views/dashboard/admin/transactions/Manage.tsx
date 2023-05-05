import React, { useEffect, useState } from 'react';
import { Col, message, Popconfirm, Row, Skeleton, Table } from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {PageHeader} from "../../../../components/breadcrumbs/DashboardBreadcrumb";
import { HouseDoor, PencilFill, Plus, Trash } from "react-bootstrap-icons";
import {BorderLessHeading, Main} from "../../../../components/styled-components/styled-containers";
import {Cards} from "../../../../components/cards/frame/CardFrame";
import { Link, useNavigate } from "react-router-dom";
import IAppointmentTransaction from "../../../../models/AppointmentTransaction";
import { TransactionService } from "../../../../services/TransactionService";

interface DataType {
    key:  string;
    appointmentId: string;
    type: string;
    amount: number;
    currency?: string | undefined;
    paymentMethod?: string | undefined;
    notes?: string | undefined;
    transactionType?: string | undefined;
    transactionDate?: string | undefined;
    transactionStatus?: string | undefined;
    accountId?: string | undefined;
    action: JSX.Element;
}

const dataTableColumn: ColumnsType<DataType> = [
    {title: 'Appointment Id', width: 100, dataIndex: 'appointmentId', key: 'appointmentId'},
    {title: 'Type', width: 150, dataIndex: 'type', key: 'type'},
    {title: 'Amount', dataIndex: 'amount', key: 'amount'},
    {title: 'Currency', dataIndex: 'currency', key: 'currency'},
    {title: 'Payment Method', dataIndex: 'paymentMethod', key: 'paymentMethod'},
    {title: 'Notes', dataIndex: 'notes', key: 'notes'},
    {title: 'Transaction Type', dataIndex: 'transactionType', key: 'transactionType'},
    {title: 'Transaction Date', dataIndex: 'transactionDate', key: 'transactionDate'},
    {title: 'Transaction Status', dataIndex: 'transactionStatus', key: 'transactionStatus'},
    {title: 'Account Id', dataIndex: 'accountId', key: 'accountId'},
    {title: 'Action', dataIndex: 'action', key: 'operation', width: 100},
];

const BreadcrumbItem = [
    {
        title: <div className="d-flex align-items-center"><HouseDoor/> &nbsp; Home</div>,
        href: '/admin',
    },
    {
        title: 'Manage Transactions',
    },
];

const ManageTransactions: React.FC = () => {

    const navigate = useNavigate();
    const [transaction, setTransaction] = useState<IAppointmentTransaction[]>([]);
    const [tableDataSource, setTableDataSource] = useState<DataType[]>([]);

    useEffect(() => {
        let isMounted = true;

        async function loadTransactions() {
            try {
                const res = await TransactionService.getAllTransactions();
                if (isMounted) {
                    setTransaction(res.data);
                }
            } catch (error: any) {
                console.error(error.response.data);
            }
        }

        loadTransactions();
        return () => {
            // TODO unset tableDataSource[]
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        setTableDataSource(formatDataSource(transaction));
    }, [transaction]);

    const confirmDelete = async (id: string): Promise<void> => {
        try {
            const res = await TransactionService.deleteTransaction(id);
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

    const formatDataSource = (transactions: IAppointmentTransaction[]): DataType[] => {
        return transactions.map((transaction) => {
            const {
                _id,
                appointmentId,
                type,
                amount,
                currency,
                paymentMethod,
                notes,
                transactionType,
                transactionDate,
                transactionStatus,
                accountId
            } = transaction;

            return {
                key: _id,
                appointmentId,
                type,
                amount,
                currency,
                paymentMethod,
                notes,
                transactionType,
                transactionDate,
                transactionStatus,
                accountId,
                action: (
                    <div className="table-actions">
                        <Link
                            className="btn btn-sm btn-outline-warning fw-bolder me-1 mt-1"
                            to={`/admin/transactions/${_id}/edit`}
                        >
                            <PencilFill/>
                        </Link>
                        <Popconfirm
                            title="Are you sure delete this transaction?"
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
            <PageHeader className="ninjadash-page-header-main" title="Manage Transactions" routes={BreadcrumbItem}/>
            <Main>
                <Row gutter={15}>
                    <Col xs={24}>
                        <BorderLessHeading>
                            <Cards isbutton={
                                <Link className="btn btn-primary h-auto" type="link" to="/admin/transactions/create">
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

export default ManageTransactions;

