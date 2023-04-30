import React, {ReactNode, useEffect, useState} from 'react';
import {Button, Col, Row, Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {PageHeader} from "../../../../components/breadcrumbs/DashboardBreadcrumb";
import {HouseDoor, Pencil, Plus, Trash2} from "react-bootstrap-icons";
import {BorderLessHeading, Main} from "../../../../components/styled-components/styled-containers";
import {Cards} from "../../../../components/cards/frame/CardFrame";
import {Link} from "react-router-dom";
import Spectacle from "../../../../models/Spectacle";
import {SpectacleService} from "../../../../services/SpectacleService";

interface DataType {
    key: React.Key;
    _id?: string;
    name: ReactNode;
    frameStyle: string;
    frameMaterial: string;
    lensType: string;
    lensMaterial: string;
    lensCoating: string;
    color: string;
    size: string;
    price: number;
    action: ReactNode;
}

const dataTableColumn: ColumnsType<DataType> = [
    //{title: 'Id', dataIndex: '_id', key: '_id'},
    {title: 'Name', dataIndex: 'name', key: 'name'},
    {title: 'Frame Style', dataIndex: 'frameStyle', key: 'frameStyle'},
    {title: 'Frame Material', dataIndex: 'frameMaterial', key: 'frameMaterial'},
    {title: 'Lens Type', dataIndex: 'lensType', key: 'lensType'},
    {title: 'Lens Material', dataIndex: 'lensMaterial', key: 'lensMaterial'},
    {title: 'Lens Coating', dataIndex: 'lensCoating', key: 'lensCoating'},
    {title: 'Color', dataIndex: 'color', key: 'color'},
    {title: 'Size', dataIndex: 'size', key: 'size'},
    {title: 'Price', dataIndex: 'price', key: 'price'},
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'operation',
        width: 100,
    },
];

const formatDataSource = (spectacles: Spectacle[]): DataType[] => {
    return spectacles.map((spectacle) => {
        const {
            _id,
            name,
            frameStyle,
            frameMaterial,
            lensType,
            lensMaterial,
            lensCoating,
            color,
            size,
            price,
        } = spectacle;

        return {
            key: _id,
            //_id: `#${_id}`,
            name: <span className="ninjadash-username">{name}</span>,
            frameStyle,
            frameMaterial,
            lensType,
            lensMaterial,
            lensCoating,
            color,
            size,
            price,
            action: (
                <div className="table-actions">
                    <Link
                        className="btn btn-sm btn-warning text-white me-1"
                        to={`/admin/spectacles/${_id}/edit`}
                    >
                        <Pencil/>
                    </Link>
                    <Link className="btn btn-sm btn-danger text-white" to="#">
                        <Trash2/>
                    </Link>
                </div>
            ),
        };
    });
};


const BreadcrumbItem = [
    {
        title: <div className="d-flex align-items-center"><HouseDoor/> &nbsp; Home</div>,
        href: '/admin',
    },
    {
        title: 'Manage Spectacles',
    },
];

const ManageSpectacles: React.FC = () => {

    const [spectacles, setSpectacles] = useState<Spectacle[]>([]);
    const [tableDataSource, setTableDataSource] = useState<DataType[]>([]);

    useEffect(() => {
        let isMounted = true;

        async function loadSpectacles() {
            try {
                const res = await SpectacleService.getAllSpectacles();
                if (isMounted) {
                    setSpectacles(res.data);
                }
            } catch (error: any) {
                console.error(error.response.data);
            }
        }

        loadSpectacles();
        return () => {
            // TODO unset tableDataSource[]
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        setTableDataSource(formatDataSource(spectacles));
    }, [spectacles])


    if (tableDataSource.length === 0) {
        return <div>Loading...</div>;
    }

    console.log("spectacle --> ", spectacles);

    return (<>
            <PageHeader className="ninjadash-page-header-main" title="Manage Spectacles" routes={BreadcrumbItem}/>
            <Main>
                <Row gutter={15}>
                    <Col xs={24}>
                        <BorderLessHeading>
                            <Cards isbutton={
                                <Link className="btn btn-primary h-auto" type="link" to="/admin/spectacles/create">
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

export default ManageSpectacles;