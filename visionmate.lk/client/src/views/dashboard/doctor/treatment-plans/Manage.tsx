import JsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import React, { useEffect, useState } from 'react';
import { Button, Col, Input, message, Popconfirm, Row, Skeleton, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PageHeader } from "../../../../components/breadcrumbs/DashboardBreadcrumb";
import { Download, HouseDoor, PencilFill, Plus, Search, Trash } from "react-bootstrap-icons";
import { BorderLessHeading, Main, TopToolBox } from "../../../../components/styled-components/styled-containers";
import { Cards } from "../../../../components/cards/frame/CardFrame";
import { Link, useNavigate } from "react-router-dom";
import ITreatmentPlan from "../../../../models/TreatmentPlan";
import { TreatmentPlanService } from "../../../../services/TreatmentPlanService";
import { getCurrentDateTime } from "../../../../utils/date-time";

interface DataType {
    key: string;
    title: string;
    description: string;
    treatmentPlan: string;
    startDate: string;
    endDate: string;
    patientId?: string | undefined;
    doctorId?: string | undefined;
    diagnosis?: string | undefined;
    medications?: string | undefined;
    procedures?: string | undefined;
    instructions?: string | undefined;
    referral: string;
    progressNotes?: string | undefined;
    action: JSX.Element;
}

const dataTableColumn: ColumnsType<DataType> = [
    {title: 'Title', width: 100, dataIndex: 'title', key: 'title'},
    {title: 'Description', width: 100, dataIndex: 'description', key: 'description'},
    {title: 'Treatment Plan', dataIndex: 'treatmentPlan', key: 'treatmentPlan'},
    {title: 'Start Date', dataIndex: 'startDate', key: 'startDate'},
    {title: 'End Date', dataIndex: 'endDate', key: 'endDate'},
    {title: 'Patient Id', dataIndex: 'patientId', key: 'patientId'},
    {title: 'Doctor Id', dataIndex: 'doctorId', key: 'doctorId'},
    {title: 'Diagnosis', dataIndex: 'diagnosis', key: 'diagnosis'},
    {title: 'Medications', dataIndex: 'medications', key: 'medications'},
    {title: 'Procedures', dataIndex: 'procedures', key: 'procedures'},
    {title: 'Instructions', dataIndex: 'instructions', key: 'instructions'},
    {title: 'Referral', dataIndex: 'referral', key: 'referral'},
    {title: 'Progress Notes', dataIndex: 'progressNotes', key: 'progressNotes'},
    {title: 'Action', dataIndex: 'action', key: 'operation', width: 100},
];

const BreadcrumbItem = [
    {
        title: <div className="d-flex align-items-center"><HouseDoor /> &nbsp; Home</div>,
        href: '/doctor',
    },
    {
        title: 'Manage Treatment Plans',
    },
];

const ManageTreatmentPlans: React.FC = () => {

    const navigate = useNavigate();
    const [treatmentPlans, setTreatmentPlans] = useState<ITreatmentPlan[]>([]);
    const [filteredTreatmentPlans, setFilteredTreatmentPlans] = useState<ITreatmentPlan[]>([]);
    const [tableDataSource, setTableDataSource] = useState<DataType[]>([]);

    const formatDataSource = (treatmentPlans: ITreatmentPlan[]): DataType[] => {
        return treatmentPlans.map((treatmentPlanx) => {
            const {
                _id,
                title,
                description,
                treatmentPlan,
                startDate,
                endDate,
                patientId,
                doctorId,
                diagnosis,
                medications,
                procedures,
                instructions,
                referral,
                progressNotes
            } = treatmentPlanx;

            return {
                key: _id,
                title,
                description,
                treatmentPlan,
                startDate,
                endDate,
                patientId,
                doctorId,
                diagnosis,
                medications,
                procedures,
                instructions,
                referral,
                progressNotes,
                action: (
                    <div className="table-actions">
                        <Link
                            className="btn btn-sm btn-outline-warning fw-bolder me-1 mt-1"
                            to={`/doctor/treatment-plans/${_id}/edit`}
                        >
                            <PencilFill />
                        </Link>
                        <Popconfirm
                            title="Are you sure delete this plan?"
                            onConfirm={() => confirmDelete(_id)}
                            onCancel={cancelDelete}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Link className="btn btn-sm btn-outline-danger fw-bolder mt-1" to="#">
                                <Trash />
                            </Link>
                        </Popconfirm>
                    </div>
                ),
            };
        });
    };

    useEffect(() => {
        let isMounted = true;

        async function loadTreatmentPlans() {
            try {
                const res = await TreatmentPlanService.getAllTreatmentPlans();
                if (isMounted) {
                    setTreatmentPlans(res.data);
                    setFilteredTreatmentPlans(res.data);
                }
            } catch (error: any) {
                console.error(error.response.data);
            }
        }

        loadTreatmentPlans();
        return () => {
            // TODO unset tableDataSource[]
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        setTableDataSource(formatDataSource(filteredTreatmentPlans));
    }, [filteredTreatmentPlans, formatDataSource]);

    const confirmDelete = async (id: string): Promise<void> => {
        try {
            const res = await TreatmentPlanService.deleteTreatmentPlan(id);
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

    const generatePDF = (): void => {
        const doc = new JsPDF('landscape');

        // Add a title to the document
        doc.text("Treatment Plans Report", 14, 20);

        // Create a table
        const tableData = treatmentPlans.map((s) => [
            s.title,
            s.description,
            s.treatmentPlan,
            s.startDate,
            s.endDate,
            s.patientId ?? null,
            s.doctorId ?? null,
            s.diagnosis ?? null,
            s.medications ?? null,
            s.procedures ?? null,
            s.instructions ?? null,
            s.referral ?? null,
            s.progressNotes ?? null,
        ]);
        autoTable(doc, {
            head: [['Title', 'Description', 'Treatment Plan', 'Start Date', 'End Date', 'Patient Id',
                'Doctor Id', 'Diagnosis', 'Medications', 'Procedures', 'Instructions', 'Referral', 'Progress Notes']],
            body: tableData,
        });

        // Save the document
        doc.save(`treatment-plans-report-${getCurrentDateTime()}.pdf`);
    };

    const handleSearch = (e: any) => {
        console.log(e.target.value);
        const data = treatmentPlans.filter((item) => {
            return Object.keys(item).some((key) => {
                if (item[key]) {
                    return item[key].toString().toLowerCase().includes(e.target.value.toLowerCase());
                }
                return null;
                }
            );
        });
        setFilteredTreatmentPlans(data);
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
            <PageHeader className="ninjadash-page-header-main" title="Manage Treatment Plans" routes={BreadcrumbItem} />
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
                                        <Download className="me-2" /> Generate PDF
                                    </Button>
                                    <Link className="btn btn-primary h-auto" type="link" to="/doctor/treatment-plans/create">
                                        <Plus /> Add New
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

export default ManageTreatmentPlans;

