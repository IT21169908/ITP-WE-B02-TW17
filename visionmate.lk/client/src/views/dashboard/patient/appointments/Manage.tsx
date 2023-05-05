import React, { useEffect, useState } from 'react';
import { Col, message, Popconfirm, Row, Skeleton, Table } from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {PageHeader} from "../../../../components/breadcrumbs/DashboardBreadcrumb";
import { HouseDoor, PencilFill, Plus, Trash } from "react-bootstrap-icons";
import {BorderLessHeading, Main} from "../../../../components/styled-components/styled-containers";
import {Cards} from "../../../../components/cards/frame/CardFrame";
import { Link, useNavigate } from "react-router-dom";
import IAppointment from "../../../../models/Appointment";
import { AppointmentService } from "../../../../services/AppointmentService";

interface DataType {
    key: string;
    title: string;
    description: string;
    tags: string;
    reference: string;
    notes: string;
    status: string;
    patientId: string;
    doctorId: string;
    appointmentDate: string;
    duration: string;
    invoiceId: string;
    action: JSX.Element;
}

const dataTableColumn: ColumnsType<DataType> = [
    {
        title: 'title',
        width: 100,
        dataIndex: 'title',
        key: 'title',
        // sorter: (a, b) => a.title - b.title,
    },
    {title: 'description', width: 100, dataIndex: 'description', key: 'description'},
    {title: 'tags', dataIndex: 'tags', key: 'tags'},
    {title: 'reference', dataIndex: 'reference', key: 'reference'},
    {title: 'notes', dataIndex: 'status', key: 'status'},
    {title: 'status', dataIndex: 'notes', key: 'notes'},
    {title: 'patientId', dataIndex: 'patientId', key: 'patientId'},
    {title: 'doctorId', dataIndex: 'doctorId', key: 'doctorId'},
    {title: 'appointmentDate', dataIndex: 'appointmentDate', key: 'appointmentDate'},
    {title: 'duration', dataIndex: 'duration', key: 'duration'},
    {title: 'invoiceId', dataIndex: 'invoiceId', key: 'invoiceId'},
    {title: 'Action', dataIndex: 'action', key: 'operation', width: 100},
];

const BreadcrumbItem = [
    {
        title: <div className="d-flex align-items-center"><HouseDoor/> &nbsp; Home</div>,
        href: '/patient',
    },
    {
        title: 'Manage Appointments',
    },
];

const ManageAppointments: React.FC = () => {

    const navigate = useNavigate();
    const [appointments, setAppointments] = useState<IAppointment[]>([]);
    const [tableDataSource, setTableDataSource] = useState<DataType[]>([]);

    useEffect(() => {
        let isMounted = true;

        async function loadAppointments() {
            try {
                const res = await AppointmentService.getAllAppointments();
                if (isMounted) {
                    setAppointments(res.data);
                }
            } catch (error: any) {
                console.error(error.response.data);
            }
        }

        loadAppointments();
        return () => {
            // TODO unset tableDataSource[]
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        setTableDataSource(formatDataSource(appointments));
    }, [appointments]);

    const confirmDelete = async (id: string): Promise<void> => {
        try {
            const res = await AppointmentService.deleteAppointment(id);
            if (res.success) {
                message.success(`${res.message}`);
                navigate('/patient/appointments');
            }
        } catch (error: any) {
            message.error(`${ error.response.data.error || error.response.data.message }`);
            console.log(error.response.data.error);
        }
    };

    const cancelDelete = () => {
        message.error('Delete canceled!');
    };

    const formatDataSource = (appointments: IAppointment[]): DataType[] => {
        return appointments.map((appointment) => {
            const {
                _id,
                title,
                description,
                tags,
                reference,
                notes,
                status,
                patientId,
                doctorId,
                appointmentDate,
                duration,
                invoiceId
            } = appointment;

            return {
                key: _id,
                title,
                description,
                tags,
                reference,
                notes,
                status,
                patientId,
                doctorId,
                appointmentDate,
                duration,
                invoiceId,
                action: (
                    <div className="table-actions">
                        <Link
                            className="btn btn-sm btn-outline-warning fw-bolder me-1 mt-1"
                            to={`/doctor/treatment-plans/${_id}/edit`}
                        >
                            <PencilFill/>
                        </Link>
                        <Popconfirm
                            title="Are you sure delete this plan?"
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
            <PageHeader className="ninjadash-page-header-main" title="Manage Appointments" routes={BreadcrumbItem}/>
            <Main>
                <Row gutter={15}>
                    <Col xs={24}>
                        <BorderLessHeading>
                            <Cards isbutton={
                                <Link className="btn btn-primary h-auto" type="link" to="/patient/appointments/create">
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

export default ManageAppointments;

