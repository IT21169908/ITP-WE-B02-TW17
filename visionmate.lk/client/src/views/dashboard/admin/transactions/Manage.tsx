import JsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import React, { useEffect, useState } from 'react';
import { Button, Col, Input, message, Popconfirm, Row, Skeleton, Table } from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {PageHeader} from "../../../../components/breadcrumbs/DashboardBreadcrumb";
import { Download, HouseDoor, PencilFill, Plus, Search, Trash } from "react-bootstrap-icons";
import Heading from "../../../../components/heading/Heading";
import { BorderLessHeading, Main, TopToolBox } from "../../../../components/styled-components/styled-containers";
import {Cards} from "../../../../components/cards/frame/CardFrame";
import { Link, useNavigate } from "react-router-dom";
import IAppointmentTransaction from "../../../../models/AppointmentTransaction";
import { TransactionService } from "../../../../services/TransactionService";
import { getCurrentDateTime } from "../../../../utils/date-time";
import { NotFoundWrapper } from "../../patient/shop/style";

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
    const [filteredTransactions, setFilteredTransactions] = useState<IAppointmentTransaction[]>([]);
    const [tableDataSource, setTableDataSource] = useState<DataType[]>([]);
    const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

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

    useEffect(() => {
        let isMounted = true;

        async function loadTransactions() {
            try {
                const res = await TransactionService.getAllTransactions();
                if (isMounted) {
                    setTransaction(res.data);
                    setFilteredTransactions(res.data);
                    setIsLoadingData(false);
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
        setTableDataSource(formatDataSource(filteredTransactions));
    }, [filteredTransactions, formatDataSource]);

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

    const generatePDF = (): void => {
        const doc = new JsPDF('landscape');

        // Add a title to the document
        doc.text("Transactions Report", 14, 20);

        // Create a table
        const tableData = transaction.map((s) => [
            s.appointmentId,
            s.type,
            s.amount,
            s.currency ?? null,
            s.paymentMethod ?? null,
            s.notes ?? null,
            s.transactionType ?? null,
            s.transactionDate ?? null,
            s.transactionStatus ?? null,
            s.accountId ?? null,
        ]);
        autoTable(doc, {
            head: [['Appointment Id', 'Type', 'Amount', 'Currency', 'Payment Method', 'Notes',
                'Transaction Type', 'Transaction Date', 'Transaction Status', 'Account Id']],
            body: tableData,
        });

        // Save the document
        doc.save(`transactions-report-${getCurrentDateTime()}.pdf`);
    };

    const handleSearch = (e: any) => {
        console.log(e.target.value);
        const data = transaction.filter((item) => {
            return Object.keys(item).some((key) => {
                    if (item[key]) {
                        return item[key].toString().toLowerCase().includes(e.target.value.toLowerCase());
                    }
                    return null;
                }
            );
        });
        setFilteredTransactions(data);
    };

    if (isLoadingData) {
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
                        <TopToolBox>
                            <Row gutter={0}>
                                <Col xxl={7} lg={12} xs={24}>
                                    <Input suffix={<Search/>} onChange={handleSearch} placeholder="Search Transactions..."/>
                                </Col>
                            </Row>
                        </TopToolBox>
                        <BorderLessHeading>
                            <Cards isbutton={
                                <>
                                    <Button className="btn btn-warning h-auto me-2" onClick={generatePDF}>
                                        <Download className="me-2" /> Generate PDF
                                    </Button>
                                    <Link className="btn btn-primary h-auto" type="link" to="/admin/transactions/create">
                                        <Plus/> Add New
                                    </Link>
                                </>
                            }>
                                {
                                    tableDataSource.length === 0 ? (
                                        <Col md={24}>
                                            <NotFoundWrapper>
                                                <Heading as="h1">No Transactions Found</Heading>
                                            </NotFoundWrapper>
                                        </Col>
                                    ) : (
                                        <><Table columns={dataTableColumn} dataSource={tableDataSource}/></>
                                    )
                                }
                            </Cards>
                        </BorderLessHeading>
                    </Col>
                </Row>
            </Main>
        </>
    );
};

export default ManageTransactions;

