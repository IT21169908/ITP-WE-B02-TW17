import React from 'react';
import {Form, Row, Col, Button, Input} from 'antd';
import {FormLayout} from '../../../../components/forms/Form';
import {Main} from '../../../../components/styled-components/styled-containers';
import {PageHeader} from '../../../../components/breadcrumbs/DashboardBreadcrumb';
import {HouseDoor} from "react-bootstrap-icons";

function SpectacleCreate() {

    const items = [
        {
            title: <div className="d-flex align-items-center"><HouseDoor/> &nbsp; Home</div>,
            href: '/admin',
        },
        {
            title: 'Spectacle Create',
        },
    ];
    return (
        <>
            <PageHeader className="ninjadash-page-header-main" title="Add Spectacle" routes={items}/>
            <Main>
                <Row gutter={25}>
                    <Col lg={12} xs={24}>
                        <FormLayout title="Enter Spectacle Information">
                            <Form.Item name="name" initialValue="Duran Clayton" label="Name">
                                <Input/>
                            </Form.Item>
                            <div className="ninjadash-form-action">
                                <Button className="btn-signin" type="primary" size="large">
                                    Save
                                </Button>
                            </div>
                        </FormLayout>
                    </Col>
                </Row>
            </Main>
        </>
    );
}

export default SpectacleCreate;
