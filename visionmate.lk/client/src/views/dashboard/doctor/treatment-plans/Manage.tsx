import React, { useEffect, useState } from 'react';
import { Col, message, Popconfirm, Row, Skeleton, Table } from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {PageHeader} from "../../../../components/breadcrumbs/DashboardBreadcrumb";
import { HouseDoor, Pencil, PencilFill, Plus, Trash } from "react-bootstrap-icons";
import {BorderLessHeading, Main} from "../../../../components/styled-components/styled-containers";
import {Cards} from "../../../../components/cards/frame/CardFrame";
import { Link, useNavigate } from "react-router-dom";
import ITreatmentPlan from "../../../../models/TreatmentPlan";
import { TreatmentPlanService } from "../../../../services/TreatmentPlanService";

interface DataType {
    key:  string;
    title: string;
    description: string;
    treatmentPlan: string;
    startDate: string;
    endDate: string;
    patientId?:  string | undefined;
    doctorId?:  string | undefined;
    diagnosis?:  string | undefined;
    medications?:  string | undefined;
    procedures?:  string | undefined;
    instructions?:  string | undefined;
    referral: string;
    progressNotes?:  string | undefined;
    action: JSX.Element;
}

const dataTableColumn: ColumnsType<DataType> = [
    {title: 'title', width: 100, dataIndex: 'title', key: 'title'},
    {title: 'description', width: 100, dataIndex: 'description', key: 'description'},
    {title: 'treatmentPlan', dataIndex: 'treatmentPlan', key: 'treatmentPlan'},
    {title: 'startDate', dataIndex: 'startDate', key: 'startDate'},
    {title: 'endDate', dataIndex: 'endDate', key: 'endDate'},
    {title: 'patientId', dataIndex: 'patientId', key: 'patientId'},
    {title: 'doctorId', dataIndex: 'doctorId', key: 'doctorId'},
    {title: 'diagnosis', dataIndex: 'diagnosis', key: 'diagnosis'},
    {title: 'medications', dataIndex: 'medications', key: 'medications'},
    {title: 'procedures', dataIndex: 'procedures', key: 'procedures'},
    {title: 'instructions', dataIndex: 'instructions', key: 'instructions'},
    {title: 'referral', dataIndex: 'referral', key: 'referral'},
    {title: 'progressNotes', dataIndex: 'progressNotes', key: 'progressNotes'},
    {title: 'Action', dataIndex: 'action', key: 'operation', width: 100},
];

const BreadcrumbItem = [
    {
        title: <div className="d-flex align-items-center"><HouseDoor/> &nbsp; Home</div>,
        href: '/doctor',
    },
    {
        title: 'Manage Treatment Plans',
    },
];

const ManageTreatmentPlans: React.FC = () => {

    const navigate = useNavigate();
    const [treatmentPlans, setTreatmentPlans] = useState<ITreatmentPlan[]>([]);
    const [tableDataSource, setTableDataSource] = useState<DataType[]>([]);

    useEffect(() => {
        let isMounted = true;

        async function loadTreatmentPlans() {
            try {
                const res = await TreatmentPlanService.getAllTreatmentPlans();
                if (isMounted) {
                    setTreatmentPlans(res.data);
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
        setTableDataSource(formatDataSource(treatmentPlans));
    }, [treatmentPlans]);

    const confirmDelete = async (id: string): Promise<void> => {
        try {
            const res = await TreatmentPlanService.deleteTreatmentPlan(id);
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
            <PageHeader className="ninjadash-page-header-main" title="Manage Treatment Plans" routes={BreadcrumbItem}/>
            <Main>
                <Row gutter={15}>
                    <Col xs={24}>
                        <BorderLessHeading>
                            <Cards isbutton={
                                <Link className="btn btn-primary h-auto" type="link" to="/doctor/treatment-plans/create">
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

export default ManageTreatmentPlans;

