import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { Row, Col, Form, Input, Button } from 'antd';
import { Facebook, Twitter, Github } from 'react-bootstrap-icons';

import { Checkbox } from "../../components/checkbox/Checkbox";
import { AuthFormWrap } from "./styled-elements";

function SignUp() {
  // const dispatch = useDispatch();

  const [state, setState] = useState({
    values: null,
    checked: false,
  });
  const handleSubmit = (values: any) => {
    // dispatch(register(values));
  };

  const onChange = (checked: boolean) => {
    setState({ ...state, checked });
  };

  return (
    <Row justify="center">
      <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
        <AuthFormWrap>
          <div className="ninjadash-authentication-top">
            <h2 className="ninjadash-authentication-top__title">Sign Up VisionMate</h2>
          </div>
          <div className="ninjadash-authentication-content">
            <Form name="register" onFinish={handleSubmit} layout="vertical">
              <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your Full name!' }]}>
                <Input placeholder="Full name" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email Address"
                rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
              >
                <Input placeholder="name@example.com" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              <div className="ninjadash-auth-extra-links">
                <Checkbox onChange={onChange} checked={state.checked}>
                  Creating an account means you’re okay with our Terms of Service and Privacy Policy
                </Checkbox>
              </div>
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
