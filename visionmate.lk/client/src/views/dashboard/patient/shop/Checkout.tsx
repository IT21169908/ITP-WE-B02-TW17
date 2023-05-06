import React, {lazy, Suspense, useEffect, useState} from 'react';
import {Row, Form, Col, Skeleton, Spin, Input} from 'antd';

import {CartCheckFill, HouseDoor} from "react-bootstrap-icons";
import {PageHeader} from "../../../../components/breadcrumbs/DashboardBreadcrumb";
import {Main} from "../../../../components/styled-components/styled-containers";
import {Cards} from "../../../../components/cards/frame/CardFrame";
import {OrderService} from "../../../../services/OrderService";
import Spectacle from "../../../../models/Spectacle";
import {useNavigate, useParams} from "react-router-dom";
import {FormLayout} from "../../../../components/forms/Form";
import {Button} from "../../../../components/buttons/Button";
import TextArea from "antd/lib/input/TextArea";
import {AntdNotification} from "../../../../components/notifications/Notification";
import {getCurrentDateTime} from "../../../../utils/date-time";

const OrderSummary = lazy(() => import('./OrderSummery'));

function Checkout() {
    const navigate = useNavigate();

    const PageRoutes = [
        {
            title: <div className="d-flex align-items-center"><HouseDoor/> &nbsp; Home</div>,
            href: '/patient',
        },
        {
            title: <div className="d-flex align-items-center"><CartCheckFill/> &nbsp; Shop</div>,
            href: '/patient/shop',
        },
        {
            title: 'Checkout'
        }
    ];

    const {product_id} = useParams();
    const [product, setProduct] = useState<Spectacle | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function loadProduct() {
            try {
                const res = await OrderService.getSpectacleByIdForPatient(product_id);
                if (isMounted) {
                    setProduct(res.data);
                }
            } catch (error: any) {
                console.error(error.response.data);
            }
        }

        loadProduct();

        return () => {
            isMounted = false;
        };
    }, []);

    const onSubmitHandler = async (values: {
        address: string,
        phone: string,
        email: string,
        note: string,
    }) => {
        console.log(values)
        if (product_id) {
            const data = {
                ...values,
                spectacleId: product_id as string,
                paymentMethod: "cod",
            }
            try {
                const res = await OrderService.placeOrder(data);
                if (res.success) {
                    AntdNotification.success({
                        message: 'Order placed successfully!',
                        description: `${getCurrentDateTime()}`,
                        duration: 20
                    });
                    navigate('/patient/orders')
                }
            } catch (error: any) {
                console.error(error.response.data);
                AntdNotification.error({
                    message: 'Order placed failed!',
                    description: `${error.response.data} -- ${getCurrentDateTime()}`,
                    duration: 20
                });
            }
        }
    }

    if (!product) {
        return (<Col xs={24}>
            <div className="spin">
                <Spin/>
            </div>
        </Col>)
    }

    let subtotal = product.price;

    return (
        <>
            <PageHeader className="ninjadash-page-header-main" title="Checkout" routes={PageRoutes}/>
            <Main>
                <div className="checkoutWraper">
                    <Row gutter={15}>
                        <Col md={24}>
                            <Cards headless>
                                <Row gutter={30}>
                                    <Col xxl={17} xs={24}>
                                        <FormLayout title="Order Product" onSubmit={onSubmitHandler}>
                                            <Form.Item className="mb-2" name="address" label="Address"
                                                       rules={[{
                                                           required: true,
                                                           message: 'Please Enter Address!'
                                                       }]}>
                                                <Input/>
                                            </Form.Item>
                                            <Form.Item className="mb-2" name="phone" label="Phone"
                                                       rules={[
                                                           {
                                                               required: true,
                                                               message: 'Please Enter Phone Number!'
                                                           },
                                                           {
                                                               pattern: /^(\+[0-9]{1,3}[- ]?)?([0-9]{10})$/,
                                                               message: 'Please input a valid phone number!'
                                                           }
                                                       ]}>
                                                <Input/>
                                            </Form.Item>
                                            <Form.Item className="mb-2" name="email" label="Email"
                                                       rules={[{
                                                           required: true,
                                                           message: 'Please Enter Email Address!',
                                                           type: 'email',
                                                       }]}>
                                                <Input/>
                                            </Form.Item>
                                            <Form.Item className="mb-2" name="note" label="Order Note"
                                                       rules={[{required: false, message: 'Please Enter Order Note!'}]}>
                                                <TextArea rows={4}/>
                                            </Form.Item>
                                            <Form.Item className="ninjadash-form-action mt-4"
                                                       style={{textAlign: 'right'}}>

                                                <Button className="btn-proceed" type="secondary" size="large"
                                                        htmlType="submit">
                                                    Place Order
                                                </Button>
                                            </Form.Item>
                                        </FormLayout>
                                    </Col>
                                    <Col xxl={7} xs={24}>
                                        <Suspense
                                            fallback={
                                                <Cards headless>
                                                    <Skeleton paragraph={{rows: 10}} active/>
                                                </Cards>
                                            }
                                        >
                                            <OrderSummary subtotal={subtotal} product={product}/>
                                        </Suspense>
                                    </Col>
                                </Row>
                            </Cards>
                        </Col>
                    </Row>
                </div>
            </Main>
        </>
    );
}

export default Checkout;
