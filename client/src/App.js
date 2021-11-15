import './App.css';
import 'antd/dist/antd.css';

import React, { useState } from 'react';

import { Row, Col, Button, Modal, Form, Card, Input, message } from "antd"
import Axios from "axios";

function App() {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [signInRegistrationForm] = Form.useForm();
  const formRef = React.createRef();

  const [userData, setUserData] = useState(null)

  const [work, setWork] = useState(null)

  const showModal = (work) => {
    setIsModalVisible(true);
    setWork(work)
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setWork(null)
    signInRegistrationForm.resetFields()
  };

  const onFinish = (inputs) => {
    console.log(work)
    if (work === "register") {
      Axios.post("http://localhost:3001/register", {
        username: inputs.username,
        password: inputs.password,
      }).then((response) => {
        message.success(response.data.message);

        if (response.data.login && response.data.login === true) {
          setUserData({ username: inputs.username, password: inputs.password, login: response.data.login })
          handleCancel()
        }
      });

    } else {

      Axios.post("http://localhost:3001/login", {
        username: inputs.username,
        password: inputs.password,
      }).then((response) => {
        message.success(response.data.message)
        handleCancel()

        if (response.data.login && response.data.login === true) {
          setUserData({ username: inputs.username, password: inputs.password, login: response.data.login })
        }
      });

    }

  }
  console.log("User Data: ", userData)
  return (

    <>
      {userData && userData.login === true ?


        <Row className='app'>
          <h1>Welcome {userData.username}</h1>

        </Row>
        :

        <Row className='app'>
          <Col className='section' lg={12} md={12} sm={24} xs={24}>
            <img style={{ width: "100%" }} alt='Banner Image' src='https://ashoktailors.com/tms/backend/img/admin-login.jpg' title='Login image' />
          </Col>
          <Col className='section' lg={12} md={12} sm={24} xs={24}>
            <h2>Login System</h2>
            <Button onClick={() => showModal("login")} type='primary'>Log in</Button>
            <Button onClick={() => showModal("register")} style={{ marginLeft: 15 }} type='primary'>Registration</Button>
          </Col>

          <Modal title={work === "login" ? "Login Form" : "Registration Form"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
            footer={<Button type='primary' htmlType="submit" form="signInRegistrationForm">{work === "login" ? "Log In" : "Sign Up"}</Button>}>

            <Form name="signInRegistrationForm" form={signInRegistrationForm} ref={formRef} onFinish={onFinish} scrollToFirstError >
              <Card bordered={false} bodyStyle={{ paddingTop: "0px" }} style={{ paddingBottom: "0px", marginBottom: "0px" }}>

                <Row gutter={[60, 0]}>

                  <Col lg={24} md={24} sm={24} xs={24}>
                    <Form.Item
                      name="username" rules={[{ required: true, message: 'Username is required' }]} label="Username">
                      <Input placeholder='Enter username' />
                    </Form.Item>
                  </Col>

                </Row>
                <Row>
                  <Col lg={24} md={24} sm={24} xs={24}>
                    <Form.Item
                      name="password" rules={[{ required: true, message: 'Password is required' }]} label="Password">
                      <Input placeholder='Enter Password' />
                    </Form.Item>
                  </Col>

                </Row>
              </Card>


            </Form>
          </Modal>
        </Row >
      }

    </>
  );
}

export default App;
