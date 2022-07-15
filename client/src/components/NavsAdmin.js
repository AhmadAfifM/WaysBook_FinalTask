import React, { useContext } from "react";
import "../index.css";
import "antd/dist/antd.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Avatar, Dropdown, Menu, Space, Divider } from "antd";
import { Navbar, Container, Nav } from "react-bootstrap";
import {
  MessageOutlined,
  LogoutOutlined,
  FileAddOutlined,
  BookOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import imgWaysBook from "../assets/logos.png";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

// IMPORT MODAL LOGIN & REGISTER

export default function NavsAdmin() {
  const [state, dispatch] = useContext(UserContext);
  let navigate = useNavigate();

  const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  const directToAddBook = () => {
    navigate("/addbooksproduct");
  };
  const directToComplain = () => {
    navigate("/complainadmin");
  };
  const directToBookList = () => {
    navigate("/booklist");
  };
  const directToHomeAdmin = () => {
    navigate("/datatransactions");
  };

  const onClick = ({ key }) => {
    if (key === "1") {
      directToAddBook();
    }
    if (key === "2") {
      directToComplain();
    }
    if (key === "3") {
      directToBookList();
    }
    if (key === "4") {
      directToHomeAdmin();
    }
    if (key === "5") {
      logout();
    }
  };

  const menu = (
    <Menu
      className="text-decoration-none p-2"
      style={{ borderRadius: "5px" }}
      onClick={onClick}
      items={[
        {
          key: "1",
          label: (
            <>
              <div className="d-flex align-items-center">
                <FileAddOutlined style={{ fontSize: "20px" }} />
                <Space>
                  <Nav.Link className="dropdown-text">Add Book</Nav.Link>
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
              <div className="d-flex align-items-center">
                <BookOutlined style={{ fontSize: "20px" }} />
                <Space>
                  <Nav.Link className="dropdown-text">Book List</Nav.Link>
                </Space>
              </div>
            </>
          ),
        },
        {
          key: "4",
          label: (
            <>
              <div className="d-flex align-items-center">
                <DatabaseOutlined style={{ fontSize: "20px" }} />
                <Space>
                  <Nav.Link className="dropdown-text">
                    Data Transactions
                  </Nav.Link>
                </Space>
              </div>
            </>
          ),
        },
        {
          key: "5",
          label: (
            <>
              <Divider className="mt-0 mb-1" />
              <div className="d-flex align-items-center">
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
            onClick={directToHomeAdmin}
            src={imgWaysBook}
            alt="img"
            className="img-fluid pt-1"
            style={{ width: "111px", height: "65px" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
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
