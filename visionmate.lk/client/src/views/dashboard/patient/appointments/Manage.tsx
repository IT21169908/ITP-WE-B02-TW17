import JsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import React, { useEffect, useState } from 'react';
import { Button, Col, Input, message, Popconfirm, Row, Skeleton, Table } from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {PageHeader} from "../../../../components/breadcrumbs/DashboardBreadcrumb";
import { Download, HouseDoor, PencilFill, Plus, Search, Trash } from "react-bootstrap-icons";
import { BorderLessHeading, Main, TopToolBox } from "../../../../components/styled-components/styled-containers";
import {Cards} from "../../../../components/cards/frame/CardFrame";
import { Link, useNavigate } from "react-router-dom";
import IAppointment from "../../../../models/Appointment";
import { AppointmentService } from "../../../../services/AppointmentService";
import { getCurrentDateTime } from "../../../../utils/date-time";

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
        title: 'Title',
        width: 100,
        dataIndex: 'title',
        key: 'title',
        // sorter: (a, b) => a.title - b.title,
    },
    {title: 'Description', width: 100, dataIndex: 'description', key: 'description'},
    {title: 'Tags', dataIndex: 'tags', key: 'tags'},
    {title: 'Reference', dataIndex: 'reference', key: 'reference'},
    {title: 'Notes', dataIndex: 'status', key: 'status'},
    {title: 'Status', dataIndex: 'notes', key: 'notes'},
    {title: 'Patient Id', dataIndex: 'patientId', key: 'patientId'},
    {title: 'Doctor Id', dataIndex: 'doctorId', key: 'doctorId'},
    {title: 'Appointment Date', dataIndex: 'appointmentDate', key: 'appointmentDate'},
    {title: 'Duration', dataIndex: 'duration', key: 'duration'},
    {title: 'Invoice Id', dataIndex: 'invoiceId', key: 'invoiceId'},
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
    const [filteredAppointments, setFilteredAppointments] = useState<IAppointment[]>([]);
    const [tableDataSource, setTableDataSource] = useState<DataType[]>([]);

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

    useEffect(() => {
        let isMounted = true;

        async function loadAppointments() {
            try {
                const res = await AppointmentService.getAllAppointments();
                if (isMounted) {
                    setAppointments(res.data);
                    setFilteredAppointments(res.data);
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
        setTableDataSource(formatDataSource(filteredAppointments));
    }, [filteredAppointments, formatDataSource]);

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

    const generatePDF = (): void => {
        const doc = new JsPDF();

        // Add a title to the document
        doc.text("Appointments Report", 14, 20);

        // Create a table
        const tableData = appointments.map((s) => [
            s.title,
            s.description,
            s.tags,
            s.reference,
            s.status,
            s.notes,
            s.patientId,
            s.doctorId,
            s.appointmentDate,
            s.duration,
            s.invoiceId,
        ]);
        autoTable(doc, {
            head: [['Title', 'Description', 'Tags', 'Reference', 'Notes', 'Status', 'Patient Id', 'Doctor Id', 'Appointment Date', 'Duration', 'Invoice Id']],
            body: tableData,
        });

        // Save the document
        doc.save(`appointments-report-${getCurrentDateTime()}.pdf`);
    };

    const handleSearch = (e: any) => {
        console.log(e.target.value)
        const data = appointments.filter((item) => {
            return Object.keys(item).some((key) =>
                item[key].toString().toLowerCase().includes(e.target.value.toLowerCase())
            )
        });
        setFilteredAppointments(data);
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
                        <TopToolBox>
                            <Row gutter={0}>
                                <Col xxl={7} lg={12} xs={24}>
                                    <Input suffix={<Search/>} onChange={handleSearch} placeholder="Search Appointments..."/>
                                </Col>
                            </Row>
                        </TopToolBox>
                        <BorderLessHeading>
                            <Cards isbutton={
                                <>
                                    <Button className="btn btn-warning h-auto me-2" onClick={generatePDF}>
                                        <Download className="me-2"/> Generate PDF
                                    </Button>
                                    <Link className="btn btn-primary h-auto" type="link" to="/patient/appointments/create">
                                        <Plus/> Add New
                                    </Link>
                                </>
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

