import { Select } from "antd/lib";
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { Row, Col, Form, Input, Button } from 'antd';
import { Facebook, Twitter, Github } from 'react-bootstrap-icons';
import { useAppDispatch } from "../../hooks/redux-hooks";
import { signUp } from "../../redux/auth/actionCreator";
import { AuthFormWrap } from "./styled-elements";

function SignUp() {
    const dispatch = useAppDispatch();

    const [form] = Form.useForm();
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (e: any) => {
        setIsChecked(e.target.checked);
    };

    // const handleSubmit = (userData: RegisterFormValues) => {
    //     AuthService.signUpWithEmail(userData).then(res => {
    //         // dispatch(setToken(res.data));
    //         if (res.success) {
    //             console.log(`res.success => ${res.message}`);
    //             // setRequestState(RequestState.SUCCESS);
    //             // history.push(RouteNames.ROOT);
    //             alert(res);
    //         } else {
    //             console.log(`res.error => ${res.error}`);
    //             // MySwal.fire({
    //             //   title: <p>{res.error}</p>,
    //             //   icon: 'error'
    //             // });
    //             alert(res.error);
    //         }
    //     }).catch(error => {
    //         console.log(`AuthService.signUpWithEmail catch err => ${error.message}`);
    //         alert(error.message);
    //     });
    //     form.resetFields();
    // };

    const handleSubmit = useCallback(
        (value: { name: string, email: string, password: string, confirmPassword: string, phone: string, role: number }) => {
            const controller = new AbortController();
            const {signal} = controller;
            dispatch(signUp({...value, signal}));
            return () => {
                controller.abort();
            };
        },
        [dispatch],
    );


    return (
        <Row justify="center">
            <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
                <AuthFormWrap>
                    <div className="ninjadash-authentication-top">
                        <h2 className="ninjadash-authentication-top__title">Sign Up VisionMate</h2>
                    </div>
                    <div className="ninjadash-authentication-content">
                        <Form name="register" form={form}  onFinish={handleSubmit} layout="vertical">
                            <Form.Item label="Name" name="name" rules={[{required: true, message: 'Please input your Full name!'}]}>
                                <Input placeholder="Full name" />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                label="Email Address"
                                rules={[{required: true, message: 'Please input your email!', type: 'email'}]}
                            >
                                <Input placeholder="name@example.com" />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{required: true, message: 'Please input your password!'}]}
                            >
                                <Input.Password placeholder="Password" />
                            </Form.Item>
                            <Form.Item
                                label="Confirm Password"
                                name="confirmPassword"
                                rules={[{required: true, message: 'Please input your confirm password!'}]}
                            >
                                <Input.Password placeholder="Confirm Password" />
                            </Form.Item>
                            <Form.Item
                                label="Phone"
                                name="phone"
                                rules={[{required: true, message: 'Please input your phone number!'},
                                    {pattern: /^(\+[0-9]{1,3}[- ]?)?([0-9]{10})$/, message: 'Please input a valid phone number!'}
                                ]}
                            >
                                <Input placeholder="Phone number" />
                            </Form.Item>
                            <Form.Item
                                label="Role"
                                name="role"
                                rules={[{required: true, message: 'Please select a role!'}]}
                                className={"w-100"}
                            >
                                <Select placeholder="Select a role" style={{width: '100%'}}>
                                    <Select.Option value={2}>Patient</Select.Option>
                                    <Select.Option value={3}>Surgeon</Select.Option>
                                    <Select.Option value={4}>Doctor</Select.Option>
                                </Select>
                            </Form.Item>
                            {/*<div className="ninjadash-auth-extra-links">*/}
                            {/*    <Checkbox onChange={handleCheckboxChange} checked={isChecked}>*/}
                            {/*        Creating an account means you’re okay with our Terms of Service and Privacy Policy*/}
                            {/*    </Checkbox>*/}
                            {/*</div>*/}
                            <Form.Item>
                                <Button className="btn-create" htmlType="submit" type="primary" size="large">
                                    Create Account
                                </Button>
                            </Form.Item>
                            <p className="ninjadash-form-divider">
                                <span>Or</span>
                            </p>
                            <ul className="ninjadash-social-login">
                                <li>
                                    <Link className="google-social" to="#">
                                        <ReactSVG src={require(`../../static/icon/google-plus.svg`).default} />
                                    </Link>
                                </li>
                                <li>
                                    <Link className="facebook-social" to="#">
                                        <Facebook />
                                    </Link>
                                </li>
                                <li>
                                    <Link className="twitter-social" to="#">
                                        <Twitter />
                                    </Link>
                                </li>
                                <li>
                                    <Link className="github-social" to="#">
                                        <Github />
                                    </Link>
                                </li>
                            </ul>
                        </Form>
                    </div>
                    <div className="ninjadash-authentication-bottom">
                        <p>
                            Already have an account?<Link to="/login">Sign In</Link>
                        </p>
                    </div>
                </AuthFormWrap>
            </Col>
        </Row>
    );
}

export default SignUp;
