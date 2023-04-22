import React from 'react';
import {Row, Col, Form, Input, Button} from 'antd';
import {HorizontalFormStyleWrap} from './style';
import {Cards} from '../cards/frame/CardFrame';
import {BasicFormWrapper} from '../styled-components/styled-containers';

// TODO: Remove this if not used
function HorizontalForm() {
    return (
        <BasicFormWrapper>
            <HorizontalFormStyleWrap>
                <Cards title="Horizontal Form">
                    <Form id="create-specs" name="horizontal-form" layout="horizontal">
                        <Row align="middle">
                            <Col lg={8} md={9} xs={24}>
                                <label htmlFor="name">Name</label>
                            </Col>
                            <Col lg={16} md={15} xs={24}>
                                <Form.Item name="name" initialValue="Duran Clayton">
                                    <Input placeholder="Enter Name"/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={{span: 16, offset: 8}} md={{span: 15, offset: 9}} xs={{span: 24, offset: 0}}>
                                <div className="ninjadash-form-action">
                                    <Button className="btn-signin" type="primary" size="middle">
                                        Save
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Cards>
            </HorizontalFormStyleWrap>
        </BasicFormWrapper>
    );
}

export {HorizontalForm};
