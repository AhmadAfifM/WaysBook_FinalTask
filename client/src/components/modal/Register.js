import React, { useState } from "react";
import { Modal, Nav, Button, Alert } from "react-bootstrap";
import { Input, Form, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import { useMutation } from "react-query";

import { API } from "../../config/api";

export default function Register({
  showRegister,
  handleCloseRegister,
  handleShowLogin,
}) {
  const handleRedirectLogin = () => {
    handleCloseRegister();
    handleShowLogin();
  };
  const [messages, setMessages] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const success = () => {
    message.success(
      <>
        Register <b> successfully </b> !
      </>,
      10
    );
  };

  const directToModalLogin = () => {
    success();
    handleRedirectLogin();
  };

  const { name, email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post("/register", body, config);

      // Notification

      console.log(response.data.message);
      if (response.data.status === "success!") {
        const alert = directToModalLogin();
        setMessages(alert);
        setForm({
          name: "",
          email: "",
          password: "",
        });
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed
          </Alert>
        );
        setMessages(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessages(alert);
      console.log(error);
    }
  });

  const onFinish = (e) => handleSubmit.mutate(e);

  return (
    <>
      <Modal show={showRegister} onHide={handleCloseRegister} centered>
        <Modal.Title
          className="mt-3 ms-5"
          style={{ padding: "20px", fontWeight: "700", fontSize: "40px" }}
        >
          Register
        </Modal.Title>

        <Modal.Body className="d-flex flex-column align-items-center">
          {messages && messages}
          <Form>
            <Form.Item>
              <Input
                style={{
                  backgroundColor: "#FFF",
                  border: "2px solid #BCBCBC",
                  color: "#333333",
                  width: "350px",
                  height: "50px",
                  borderRadius: "5px",
                }}
                onChange={handleChange}
                name="email"
                value={email}
                placeholder="Email"
              />
            </Form.Item>

            <Form.Item>
              <Input.Password
                style={{
                  backgroundColor: "#FFF",
                  border: "2px solid #BCBCBC",
                  color: "#333333",
                  width: "350px",
                  height: "50px",
                  borderRadius: "5px",
                }}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                onChange={handleChange}
                name="password"
                value={password}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Input
                style={{
                  backgroundColor: "#FFF",
                  border: "2px solid #BCBCBC",
                  color: "#333333",
                  width: "350px",
                  height: "50px",
                  borderRadius: "5px",
                }}
                onChange={handleChange}
                name="name"
                value={name}
                placeholder="Fullname"
              />
            </Form.Item>
          </Form>

          <Button
            onClick={onFinish}
            className="mt-5 text-white"
            style={{
              backgroundColor: "#393939",
              width: "350px",
              height: "50px",
              fontWeight: "800",
              border: "2px solid #393939",
            }}
            type="submit"
          >
            Register
          </Button>
          <div
            onClick={() => {
              handleRedirectLogin();
            }}
            className="mt-2"
          >
            <Nav.Link style={{ color: "black" }}>
              Already have an account ? klik <b>Here</b>
            </Nav.Link>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
