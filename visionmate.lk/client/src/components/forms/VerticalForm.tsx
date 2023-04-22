import React from 'react';
import {Form, Input, Button} from 'antd';
import {VerticalFormStyleWrap} from './style';
import {Cards} from '../cards/frame/CardFrame';
import {BasicFormWrapper} from '../styled-components/styled-containers';

// TODO: Remove this if not used
function VerticalForm() {
    return (
        <BasicFormWrapper>
            <VerticalFormStyleWrap>
                <Cards title="Vertical Form">
                    <Form name="ninjadash-vertical-form" layout="vertical">
                        <Form.Item name="name" initialValue="Duran Clayton" label="Name">
                            <Input/>
                        </Form.Item>
                        <div className="ninjadash-form-action">
                            <Button className="btn-signin" type="primary" size="large">
                                Save
                            </Button>
                        </div>
                    </Form>
                </Cards>
            </VerticalFormStyleWrap>
        </BasicFormWrapper>
    );
}

export {VerticalForm};
