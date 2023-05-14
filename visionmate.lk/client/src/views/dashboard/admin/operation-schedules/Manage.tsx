import React, {useEffect, useState} from 'react';
import {Button, Col, Input, message, Popconfirm, Row, Skeleton, Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {PageHeader} from "../../../../components/breadcrumbs/DashboardBreadcrumb";
import {Download, HouseDoor, PencilFill, Plus, Search, Trash} from "react-bootstrap-icons";
import {BorderLessHeading, Main, TopToolBox} from "../../../../components/styled-components/styled-containers";
import {Cards} from "../../../../components/cards/frame/CardFrame";
import {Link, useNavigate} from "react-router-dom";
import {ScheduleService} from "../../../../services/ScheduleService";
import Schedule from "../../../../models/Schedule";
import {NotFoundWrapper} from "../../patient/shop/style";
import Heading from "../../../../components/heading/Heading";
import JsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {getCurrentDateTime} from "../../../../utils/date-time";

interface DataType {
    key: string;
    _id: string;
    schedule: string;
    surgeonId?: string;
    patientId?: string;
    scheduleDate?: string;
    remark?: string;
    status?: string;
    action: JSX.Element;
}

const dataTableColumn: ColumnsType<DataType> = [
    {title: 'Schedule Id', dataIndex: '_id', key: '_id'},
    {title: 'schedule', dataIndex: 'schedule', key: 'schedule'},
    {title: 'surgeonId', dataIndex: 'surgeonId', key: 'surgeonId'},
    {title: 'patientId', dataIndex: 'patientId', key: 'patientId'},
    {title: 'schedule Date', dataIndex: 'scheduleDate', key: 'scheduleDate'},
    {title: 'remark', dataIndex: 'remark', key: 'remark'},
    {title: 'status', dataIndex: 'status', key: 'status'},
    {title: 'Action', dataIndex: 'action', key: 'operation'},
];

const BreadcrumbItem = [
    {
        title: <div className="d-flex align-items-center"><HouseDoor/> &nbsp; Home</div>,
        href: '/admin',
    },
    {
        title: 'Manage Schedules',
    },
];

const ManageSchedules: React.FC = () => {

    const navigate = useNavigate();
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [filteredschedules, setFilteredschedules] = useState<Schedule[]>([]);
    const [tableDataSource, setTableDataSource] = useState<DataType[]>([]);

    useEffect(() => {
        let isMounted = true;

        async function loadSchedules() {
            try {
                const res = await ScheduleService.getAllSchedules();
                if (isMounted) {
                    setSchedules(res.data);
                    setFilteredschedules(res.data);
                }
            } catch (error: any) {
                console.error(error.response.data);
            }
        }

        loadSchedules();
        return () => {
            // TODO unset tableDataSource[]
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        setTableDataSource(formatDataSource(filteredschedules));
    }, [schedules]);

    const confirmDelete = async (id: string): Promise<void> => {
        try {
            const res = await ScheduleService.deleteSchedule(id);
            if (res.success) {
                message.success(`${res.message}`);
                window.location.reload(); // TODO - remove page reload
            }
        } catch (error: any) {
            message.error(`${error.response.data.error || error.response.data.message}`);
            console.log(error.response.data.error);
        }
    };

    const cancelDelete = () => {
        message.error('Delete canceled!');
    };

    const formatDataSource = (schedules: Schedule[]): DataType[] => {
        return schedules.map((item) => {
            const {
                _id,
                schedule,
                surgeonId,
                patientId,
                scheduleDate,
                remark,
                status,
            } = item;

            return {
                key: _id,
                _id,
                schedule,
                surgeonId,
                patientId,
                scheduleDate,
                remark,
                status,
                action: (
                    <div className="table-actions">
                        <Link
                            className="btn btn-sm btn-outline-warning fw-bolder me-1 mt-1"
                            to={`/admin/operations/schedules/${_id}/edit`}
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
                        <Skeleton active paragraph={{rows: 16}}/>
                    </Cards>
                </Col>
            </Row>
        );
    }

    const generatePDF = (): void => {
        const doc = new JsPDF("landscape");

        // Add a title to the document
        doc.text("Spectacle Report", 14, 20);

        // Create a table
        const tableData = schedules.map((s) => [
            s._id,
            s.schedule,
            s.surgeonId,
            s.patientId,
            s.scheduleDate,
            s.remark,
            s.status,
        ]);
        autoTable(doc, {
            head: [['Id', 'schedule', 'surgeonId', 'patientId', 'schedule Date', 'remark', 'status']],
            body: tableData,
        })

        // Save the document
        doc.save(`schedule-report-${getCurrentDateTime()}.pdf`);
    };


    const handleSearch = (e: any) => {
        console.log(e.target.value)
        const data = schedules.filter((item) => {
            return Object.keys(item).some((key) =>
                item[key].toString().toLowerCase().includes(e.target.value.toLowerCase())
            )
        });
        setFilteredschedules(data);
    };
    return (
        <>
            <PageHeader className="ninjadash-page-header-main" title="Manage Schedules" routes={BreadcrumbItem}/>
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
                                    <Link className="btn btn-primary h-auto" type="link"
                                          to="/admin/operations/schedules/create">
                                        <Plus/> Add New
                                    </Link>
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
                                        <>
                                            <Table columns={dataTableColumn} dataSource={tableDataSource}/>
                                        </>
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

export default ManageSchedules;

