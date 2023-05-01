import React, { useEffect, useState } from 'react';
import { Col, Row, Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {PageHeader} from "../../../../components/breadcrumbs/DashboardBreadcrumb";
import {HouseDoor, Pencil, Plus, Trash2} from "react-bootstrap-icons";
import {BorderLessHeading, Main} from "../../../../components/styled-components/styled-containers";
import {Cards} from "../../../../components/cards/frame/CardFrame";
import {Link} from "react-router-dom";
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
    {
        title: 'description',
        width: 100,
        dataIndex: 'description',
        key: 'description',
    },
    {title: 'tags', dataIndex: 'tags', key: '1'},
    {title: 'reference', dataIndex: 'reference', key: '2'},
    {title: 'notes', dataIndex: 'status', key: '3'},
    {title: 'status', dataIndex: 'notes', key: '4'},
    {title: 'patientId', dataIndex: 'patientId', key: '5'},
    {title: 'doctorId', dataIndex: 'doctorId', key: '6'},
    {title: 'appointmentDate', dataIndex: 'appointmentDate', key: '7'},
    {title: 'duration', dataIndex: 'duration', key: '8'},
    {title: 'invoiceId', dataIndex: 'invoiceId', key: '9'},
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'operation',
        width: 100,
    },
];

const tableDataSource: DataType[] = [
    {
        key: '1',
        title: 'title',
        description: 'description',
        tags: 'tags',
        reference: 'reference',
        notes: 'notes',
        status: 'status',
        patientId: 'patientId',
        doctorId: 'doctorId',
        appointmentDate: 'appointmentDate',
        duration: 'duration',
        invoiceId: 'invoiceId',
        action: (
            <div className="table-actions">
                <Link className="btn btn-sm btn-warning text-white me-1" to="/surgeon/appointments/644cc13e5bfb877d576f7b2e/edit">
                    <Pencil/>
                </Link>
                <Link className="btn btn-sm btn-danger text-white" to="#">
                    <Trash2/>
                </Link>
            </div>
        ),
    },
    {
        key: '2',
        title: 'title',
        description: 'description',
        tags: 'tags',
        reference: 'reference',
        notes: 'notes',
        status: 'status',
        patientId: 'patientId',
        doctorId: 'doctorId',
        appointmentDate: 'appointmentDate',
        duration: 'duration',
        invoiceId: 'invoiceId',
        action: (
            <div className="table-actions">
                <Link className="btn btn-sm btn-warning text-white me-1" to="/surgeon/appointments/644cc1905bfb877d576f7b31/edit">
                    <Pencil/>
                </Link>
                <Link className="btn btn-sm btn-danger text-white" to="#">
                    <Trash2/>
                </Link>
            </div>
        ),
    }
];


const BreadcrumbItem = [
    {
        title: <div className="d-flex align-items-center"><HouseDoor/> &nbsp; Home</div>,
        href: '/surgeon',
    },
    {
        title: 'Manage Appointments',
    },
];

const ManageAppointments: React.FC = () => {

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
    }, [appointments])


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
                            className="btn btn-sm btn-warning text-white me-1"
                            to={`/surgeon/appointments/${_id}/edit`}
                        >
                            <Pencil/>
                        </Link>
                        <Link className="btn btn-sm btn-danger text-white" onClick={() => deleteAppointment(_id)} to="#">
                            <Trash2/>
                        </Link>
                    </div>
                ),
            };
        });
    };

    const deleteAppointment = async (_id: string) => {
        const confirmation = window.confirm("Are You sure you want to delete this appointment")
        if (confirmation) {
            try {
                const res = await AppointmentService.deleteAppointment(_id);
                if (res.success) {
                    alert(res.message)
                    window.location.reload()
                }
            } catch (error: any) {
                alert(error.response.data.error || error.response.data.message)
                console.log(error.response.data.error)
            }
        }
    }

    if (tableDataSource.length === 0) {
        return <div>Loading...</div>;
    }

    return (<>
            <PageHeader className="ninjadash-page-header-main" title="Manage Appointments" routes={BreadcrumbItem}/>
            <Main>
                <Row gutter={15}>
                    <Col xs={24}>
                        <BorderLessHeading>
                            <Cards isbutton={
                                <Link className="btn btn-primary h-auto" type="link" to="/surgeon/appointments/create">
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
    )
};

export default ManageAppointments;

