import React, {ReactNode, useEffect, useState} from 'react';
import {Button, Col, message, Popconfirm, Row, Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {PageHeader} from "../../../../components/breadcrumbs/DashboardBreadcrumb";
import {HouseDoor, Pencil, Plus, Trash, Trash2} from "react-bootstrap-icons";
import {BorderLessHeading, Main} from "../../../../components/styled-components/styled-containers";
import {Cards} from "../../../../components/cards/frame/CardFrame";
import {Link, useNavigate} from "react-router-dom";
import Order from "../../../../models/Order";
import {OrderService} from "../../../../services/OrderService";
import {AntdNotification} from "../../../../components/notifications/Notification";
import {getCurrentDateTime} from "../../../../utils/date-time";
import {NotFoundWrapper} from "../shop/style";
import Heading from "../../../../components/heading/Heading";
import {AppointmentService} from "../../../../services/AppointmentService";

interface DataType {
    key: React.Key;
    _id: string;
    spectacle?: string;
    address: string;
    phone: string;
    email: string;
    paymentMethod: string;
    totalAmount: number;
    shippingFee: number;
    note?: string;
    status: string;
    action: ReactNode;
}

const dataTableColumn: ColumnsType<DataType> = [
    {title: 'Id', dataIndex: '_id', key: '_id'},
    {title: 'Product Name', dataIndex: 'spectacle', key: 'product'},
    {title: 'Address', dataIndex: 'address', key: 'address'},
    {title: 'Phone', dataIndex: 'phone', key: 'phone'},
    {title: 'Email', dataIndex: 'email', key: 'email'},
    {title: 'Payment Method', dataIndex: 'paymentMethod', key: 'paymentMethod'},
    {title: 'Total Amount', dataIndex: 'totalAmount', key: 'totalAmount'},
    {title: 'Shipping Fee', dataIndex: 'shippingFee', key: 'shippingFee'},
    {title: 'Note', dataIndex: 'note', key: 'note'},
    {title: 'Status', dataIndex: 'status', key: 'status'},
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'operation',
        width: 100,
    },
];


const BreadcrumbItem = [
    {
        title: <div className="d-flex align-items-center"><HouseDoor/> &nbsp; Home</div>,
        href: '/patient',
    },
    {
        title: 'Manage My Orders',
    },
];

const ManageOrders: React.FC = () => {
    const navigate = useNavigate()
    const [orders, setOrders] = useState<Order[]>([]);
    const [tableDataSource, setTableDataSource] = useState<DataType[]>([]);

    const formatDataSource = (orders: Order[]): DataType[] => {
        return orders.map((order) => {
            const {
                _id,
                spectacleId,
                address,
                phone,
                email,
                paymentMethod,
                totalAmount,
                shippingFee,
                note,
                status,
            } = order;

            return {
                key: _id,
                _id: `#${_id}`,
                spectacle: spectacleId?.name,
                address,
                phone,
                email,
                paymentMethod,
                totalAmount,
                shippingFee,
                note,
                status,
                action: (
                    <>
                        {
                            status === 'pending' ? (
                                <Popconfirm
                                    title="Are you sure cancel this Order?"
                                    onConfirm={() => deleteOrder(_id)}
                                    onCancel={cancelDelete}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Link className="btn btn-sm btn-outline-danger fw-bolder mt-1" to="#">
                                        <Trash/>
                                    </Link>
                                </Popconfirm>
                            ) : (<></>)
                        }
                    </>
                ),
            };
        });
    };

    useEffect(() => {
        let isMounted = true;

        async function loadOrders() {
            try {
                const res = await OrderService.getAllOrders();
                if (isMounted) {
                    setOrders(res.data);
                }
            } catch (error: any) {
                console.error(error.response.data);
            }
        }

        loadOrders();
        return () => {
            // TODO unset tableDataSource[]
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        setTableDataSource(formatDataSource(orders));
    }, [orders])

    const cancelDelete = () => {
        message.error('Operation cancelled!');
    };
    const deleteOrder = async (_id: string) => {
        const confirmation = window.confirm("Are You sure you want to delete this order")
        if (confirmation) {
            try {
                const res = await OrderService.deleteOrder(_id);
                if (res.success) {
                    AntdNotification.success({
                        message: 'Order Deleted successfully!',
                        description: `${getCurrentDateTime()}`,
                        duration: 20
                    });
                    navigate('/patient/orders')
                }
            } catch (error: any) {
                AntdNotification.error({
                    message: 'Order Delete failed!',
                    description: `${error.response.data.message} -- ${getCurrentDateTime()}`,
                    duration: 20
                });
                //alert(error.response.data.error || error.response.data.message)
                console.log(error.response.data.error)
            }
        }
    }

    console.log("spectacle --> ", orders);

    return (<>
            <PageHeader className="ninjadash-page-header-main" title="Manage My Orders" routes={BreadcrumbItem}/>
            <Main>
                <Row gutter={15}>
                    <Col xs={24}>
                        <BorderLessHeading>
                            <Cards>
                                {
                                    tableDataSource.length === 0 ? (
                                        <Col md={24}>
                                            <NotFoundWrapper>
                                                <Heading as="h1">No Orders Found</Heading>
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
    )
};

export default ManageOrders;