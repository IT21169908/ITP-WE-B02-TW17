import React, {ReactNode, useEffect, useState} from 'react';
import {Button, Col, message, Popconfirm, Row, Table, Modal, Select, Space, Form, Input} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {PageHeader} from "../../../../components/breadcrumbs/DashboardBreadcrumb";
import {Download, HouseDoor, Pencil, PencilFill, Plus, Search, Trash, Trash2} from "react-bootstrap-icons";
import {BorderLessHeading, Main, TopToolBox} from "../../../../components/styled-components/styled-containers";

import {Cards} from "../../../../components/cards/frame/CardFrame";
import {Link, useNavigate} from "react-router-dom";
import Order from "../../../../models/Order";
import {OrderService} from "../../../../services/OrderService";
import {AntdNotification} from "../../../../components/notifications/Notification";
import {getCurrentDateTime} from "../../../../utils/date-time";

import Heading from "../../../../components/heading/Heading";
import {NotFoundWrapper} from "../../patient/shop/style";
import JsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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
    {title: 'User', dataIndex: 'user', key: 'user'},
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
        href: '/admin',
    },
    {
        title: 'Manage All Orders',
    },
];

const ManageOrders: React.FC = () => {
    const navigate = useNavigate()
    const [orders, setOrders] = useState<Order[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const [tableDataSource, setTableDataSource] = useState<DataType[]>([]);

    const [editModalVisible, setEditModalVisible] = useState(false)
    const [modalData, setModalData] = useState<Order | null>(null)
    const [newOrderStatus, setNewOrderStatus] = useState<"pending" | "processing" | "shipped" | "delivered" | null>(null)

    const statusHandleChange = (value: "pending" | "processing" | "shipped" | "delivered") => {
        console.log(`selected ${value}`);
        setNewOrderStatus(value)
    };
    const showEditModal = (order: Order) => {
        setEditModalVisible(true);
        setModalData(order);
    };

    const handleOk = async () => {
        if (modalData && newOrderStatus) {
            try {
                const res = await OrderService.updateOrderStatus(modalData._id, newOrderStatus);
                setEditModalVisible(false);
                setModalData(null);
                setNewOrderStatus(null);
                AntdNotification.success({
                    message: 'Order status changed successfully!',
                    description: `${res.message} -- ${getCurrentDateTime()}`,
                    duration: 20
                });
                // Update orders array with new status value
                const updatedOrders = orders.map(order => {
                    if (order._id === modalData._id) {
                        return {
                            ...order,
                            status: newOrderStatus
                        };
                    }
                    return order;
                });
                setOrders(updatedOrders);
                setFilteredOrders(updatedOrders);
            } catch (error: any) {
                AntdNotification.error({
                    message: 'Something went wrong!',
                    description: `${error.response.data} -- ${getCurrentDateTime()}`,
                    duration: 20
                });
                console.error(error.response.data);
            }
        } else {
            message.error('Please check with your data!');
        }
    };

    const handleCancel = () => {
        console.log(`newOrderStatus ${newOrderStatus}`);
        setEditModalVisible(false);
        setModalData(null);
        setNewOrderStatus(null);
    };


    useEffect(() => {
        let isMounted = true;

        async function loadOrders() {
            try {
                const res = await OrderService.getAllOrders();
                if (isMounted) {
                    setOrders(res.data);
                    setFilteredOrders(res.data);
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

    const formatDataSource = (orders: Order[]): DataType[] => {
        return orders.map((order) => {
            const {
                _id,
                spectacleId,
                userId,
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
                user: userId?.name,
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
                        <Button
                            className="btn btn-sm btn-outline-warning fw-bolder me-1 mt-1"
                            onClick={() => showEditModal(order)}
                        >
                            <PencilFill/>
                        </Button>

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
        setTableDataSource(formatDataSource(filteredOrders));
    }, [filteredOrders])
    const cancelDelete = () => {
        message.error('Operation cancelled!');
    };

    const deleteOrder = async (_id: string) => {
        try {
            const res = await OrderService.deleteOrderByAdmin(_id);
            if (res.success) {
                AntdNotification.success({
                    message: 'Order Deleted successfully!',
                    description: `${getCurrentDateTime()}`,
                    duration: 20
                });
                const updatedOrders = orders.filter(order => order._id !== _id);
                setOrders(updatedOrders);
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

    console.log("orders --> ", orders);

    const generatePDF = (): void => {
        const doc = new JsPDF("landscape");

        // Add a title to the document
        doc.text("Order Report", 14, 20);

        // Create a table
        const tableData = orders.map((s) => [
            s._id,
            s.userId?.name,
            s.spectacleId?.name || "",
            s.address,
            s.phone,
            s.email,
            s.paymentMethod,
            s.totalAmount.toString(),
            s.shippingFee.toString(),
            s.note || "",
            s.status,
        ]);
        autoTable(doc, {
            head: [["Id", "User", "Product Name", "Address", "Phone", "Email", "Payment Method", "Total Amount", "Shipping Fee", "Note", "Status"]],
            body: tableData,
        })

        // Save the document
        doc.save(`order-report-${getCurrentDateTime()}.pdf`);
    };
    const handleSearch = (e: any) => {
        console.log(e.target.value)
        const data = orders.filter((item) => {
            return Object.keys(item).some((key) =>
                item[key]!.toString().toLowerCase().includes(e.target.value.toLowerCase())
            )
        });
        setFilteredOrders(data);
    };
    return (<>
            <PageHeader className="ninjadash-page-header-main" title="Manage My Orders" routes={BreadcrumbItem}/>
            <Main>
                <Row gutter={15}>
                    <Col xs={24}>
                        <TopToolBox>
                            <Row gutter={0}>
                                <Col xxl={7} lg={12} xs={24}>
                                    <Input suffix={<Search/>} onChange={handleSearch} placeholder="Search this table"/>
                                </Col>
                            </Row>
                        </TopToolBox>
                        <BorderLessHeading>
                            <Cards isbutton={
                                <>
                                    <Button className="btn btn-warning h-auto me-2" onClick={generatePDF}>
                                        <Download className="me-2"/> Export PDF
                                    </Button>
                                </>
                            }>
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
                                <Modal
                                    title={`Change Order status | ID ${modalData?._id}`}
                                    open={editModalVisible}
                                    onOk={handleOk}
                                    onCancel={handleCancel}
                                    closable={false}
                                    maskClosable={false}
                                    destroyOnClose={true}
                                >
                                    <Cards headless>
                                        <Space wrap>
                                            <label htmlFor="my-select">Order Status:</label>
                                            <Select
                                                defaultValue={modalData?.status}
                                                onChange={statusHandleChange}
                                                options={[
                                                    {value: 'pending', label: 'pending'},
                                                    {value: 'processing', label: 'processing'},
                                                    {value: 'shipped', label: 'shipped'},
                                                    {value: 'delivered', label: 'delivered'},
                                                ]}
                                            />

                                        </Space>
                                    </Cards>
                                </Modal>
                            </Cards>
                        </BorderLessHeading>
                    </Col>
                </Row>
            </Main>
        </>
    )
};

export default ManageOrders;