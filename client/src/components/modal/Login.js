import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { Modal, Nav, Alert } from "react-bootstrap";
import { Input, Form, Button, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
// import { Link, useNavigate } from "react-router-dom";

import { useMutation } from "react-query";

import { API } from "../../config/api";

export default function Login({
  showLogin,
  handleShowRegister,
  handleCloseLogin,
}) {
  const navigate = useNavigate();

  const success = () => {
    <>
      <div className="d-flex justify-content-center align-items-center">
        {message.success(
          <>
            Please Welcome to Home Page <b> Customer !</b>
          </>,
          3
        )}
      </div>
    </>;
  };

  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

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

      // Data body => Convert Object to String
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post("/login", body, config);

      // Handling response here
      const userStatus = response.data.data.status;

      if (userStatus === "admin") {
        navigate("/datatransactions");
      } else if (userStatus === "customer") {
        navigate("/");
      }
      const alert = (
        <Alert variant="success" className="py-1">
          Login Success!!
        </Alert>
      );
      setMessage(alert);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data,
      });
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          {error.response.data.message}
        </Alert>
      );

      setMessage(alert);
      console.log(error.response.data.message);
    }
  });
  const onFinish = (e) => {
    handleSubmit.mutate(e);
    success();
  };
  const handleRedirectRegister = () => {
    handleCloseLogin();
    handleShowRegister();
  };
  return (
    <>
      <Modal show={showLogin} onHide={handleCloseLogin} centered>
        <Modal.Title
          className="mt-3 ms-5"
          style={{ padding: "20px", fontWeight: "700", fontSize: "40px" }}
        >
          Login
        </Modal.Title>

        <Modal.Body className="d-flex flex-column align-items-center">
          {message && message}
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
                placeholder="Email"
                value={email}
                name="email"
                onChange={handleChange}
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
                placeholder="Password"
                value={password}
                name="password"
                onChange={handleChange}
              />
            </Form.Item>
          </Form>

          <Button
            className="mt-5 text-white"
            style={{
              backgroundColor: "#393939",
              width: "350px",
              height: "50px",
              fontWeight: "800",
              border: "2px solid #393939",
            }}
            onClick={onFinish}
            htmlType="submit"
          >
            Login
          </Button>
          <div
            onClick={() => {
              handleRedirectRegister();
            }}
            className="mt-2"
          >
            <Nav.Link style={{ color: "black" }}>
              Dont't have an account ? klik <b>Here</b>
            </Nav.Link>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
