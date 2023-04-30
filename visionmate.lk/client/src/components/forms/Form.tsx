import React from 'react';
import {Form} from 'antd';
import {HorizontalFormStyleWrap, VerticalFormStyleWrap} from './style';
import {Cards} from '../cards/frame/CardFrame';
import {BasicFormWrapper} from '../styled-components/styled-containers';

// TODO: Refactor this
interface FormType {
    children: React.ReactNode,
    id?: string,
    initialValues?: any,
    onSubmit?: any,
    onFinishFailed?: any,
    title: string,
    className?: string,
    layout?: 'horizontal' | 'vertical'
}

function FormLayout({children, id, title, className, layout, onSubmit, onFinishFailed, initialValues, ...rest}: FormType) {
    return (
        <BasicFormWrapper>
            {layout === 'vertical' ? (
                <VerticalFormStyleWrap>
                    <Cards title={title}>
                        <Form id={id} name="horizontal-form" onFinish={onSubmit} onFinishFailed={onFinishFailed} initialValues={initialValues} className={className} layout={layout}>
                            {children}
                        </Form>
                    </Cards>
                </VerticalFormStyleWrap>
            ) : (
                <HorizontalFormStyleWrap>
                    <Cards title="Horizontal Form">
                        <Form id={id} name="horizontal-form" className={className} layout={layout} initialValues={initialValues}>
                            {children}
                        </Form>
                    </Cards>
                </HorizontalFormStyleWrap>
            )}
        </BasicFormWrapper>
    );
}

FormLayout.defaultProps = {
    layout: 'vertical',
} as FormType

export {FormLayout};
