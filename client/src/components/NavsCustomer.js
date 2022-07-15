import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import "antd/dist/antd.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Avatar, Dropdown, Menu, Space, Divider, Badge } from "antd";
import { Navbar, Container, Nav } from "react-bootstrap";
import {
  UserOutlined,
  MessageOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
// import { useNavigate } from "react-router";
import imgWaysBook from "../assets/logos.png";

import { UserContext } from "../context/userContext";

// IMPORT MODAL LOGIN & REGISTER

export default function NavsCustomer() {
  const [state, dispatch] = useContext(UserContext);
  let navigate = useNavigate();

  const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  const directToHome = () => {
    navigate("/");
  };
  const directToComplain = () => {
    navigate("/complaincustomer");
  };
  const directToProfile = () => {
    navigate("/profile");
  };
  const directToMyCart = () => {
    navigate("/mycart");
  };

  const onClick = ({ key }) => {
    if (key === "1") {
      directToProfile();
    }
    if (key === "2") {
      directToComplain();
    }
    if (key === "3") {
      logout();
    }
  };

  const menu = (
    <Menu
      onClick={onClick}
      className="text-decoration-none p-2"
      style={{ borderRadius: "5px" }}
      items={[
        {
          key: "1",
          label: (
            <>
              <div
                onClick={directToProfile}
                className="d-flex align-items-center"
              >
                <UserOutlined style={{ fontSize: "20px" }} />
                <Space>
                  <Nav.Link className="dropdown-text">Profile</Nav.Link>
                </Space>
              </div>
            </>
          ),
        },
        {
          key: "2",
          label: (
            <>
              <div className="d-flex align-items-center">
                <MessageOutlined style={{ fontSize: "20px" }} />
                <Space>
                  <Nav.Link className="dropdown-text">Complain</Nav.Link>
                </Space>
              </div>
            </>
          ),
        },
        {
          key: "3",
          label: (
            <>
              <Divider className="mt-0 mb-1" />
              <div onClick={logout} className="d-flex align-items-center">
                <LogoutOutlined
                  style={{ fontSize: "20px", color: "#fc0303" }}
                />
                <Space>
                  <Nav.Link className="dropdown-text">Logout</Nav.Link>
                </Space>
              </div>
            </>
          ),
        },
      ]}
    />
  );

  return (
    <Navbar>
      <Container>
        <Navbar.Brand>
          <img
            src={imgWaysBook}
            onClick={directToHome}
            alt="img"
            className="img-fluid pt-1"
            style={{ width: "111px", height: "65px" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <div onClick={directToMyCart} className="pe-3">
            <Nav.Link>
              <Badge count={1}>
                <ShoppingCartOutlined style={{ fontSize: "30px" }} />
              </Badge>
            </Nav.Link>
          </div>

          <Dropdown overlay={menu} placement="bottomRight" arrow>
            <Avatar
              src="https://joeschmoe.io/api/v1/random"
              style={{ width: "40px" }}
            />
          </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
