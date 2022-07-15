import React, { useState, useContext } from "react";
import { Row, Col, Button, Image, Empty } from "antd";
import "antd/dist/antd.min.css";
import "../index.css";
import {
  MailOutlined,
  UserOutlined,
  PhoneOutlined,
  AimOutlined,
} from "@ant-design/icons";
import "bootstrap/dist/css/bootstrap.min.css";
import NavsCustomer from "../components/NavsCustomer";
import EditProfile from "../components/modal/EditProfile";
import imgBlank from "../assets/blankImage.png";
import { UserContext } from "../context/userContext";
import { API } from "../config/api";
import { useNavigate } from "react-router-dom";
import convertRupiah from "rupiah-format";
import { useQuery } from "react-query";

export default function Profile() {
  let navigate = useNavigate();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const handleCloseEditProfile = () => setShowEditProfile(false);
  const handleShowEditProfile = () => setShowEditProfile(true);
  const [state] = useContext(UserContext);

  let { data: users } = useQuery("usersCache", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };
    const response = await API.get("/user/" + state.user.id, config);
    return response.data.data;
  });

  let { data: transactions } = useQuery("transactionsCache", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };
    const response = await API.get("/transactions", config);
    // console.log(response);
    return response.data;
  });

  const directToBooksDetail = (id) => {
    navigate("/booksdetail/" + id);
  };

  return (
    <>
      {/* {console.log("DATA TRANS", transactions)} */}
      <div className="container d-flex justify-content-center  flex-column">
        <NavsCustomer />
        <div className="d-flex flex-column align-items-center ">
          <Row className="w-100">
            <Col span={10}>
              <div
                style={{
                  fontWeight: "700",
                  fontSize: "36px",
                  marginLeft: "60px",
                }}
              >
                Profile
              </div>
            </Col>
          </Row>
          <Row className="card-profile">
            <Col span={24}>
              <Row>
                <Col span={19} style={{ paddingTop: "15px" }}>
                  <Row className="d-flex align-items-center mb-3 ms-3">
                    <Col>
                      <MailOutlined style={{ fontSize: "25px" }} />
                    </Col>
                    <Col className="ms-3">
                      <div className="text-profile-atas">
                        {users?.email ? users.email : <>-</>}
                      </div>
                      <div className="text-profile-bawah">Email</div>
                    </Col>
                  </Row>
                  <Row className="d-flex align-items-center mb-3 ms-3">
                    <Col>
                      <UserOutlined style={{ fontSize: "25px" }} />
                    </Col>
                    <Col className="ms-3">
                      <div className="text-profile-atas">
                        {users?.gender ? users.gender : <>-</>}
                      </div>
                      <div className="text-profile-bawah">Gender</div>
                    </Col>
                  </Row>
                  <Row className="d-flex align-items-center mb-3 ms-3">
                    <Col>
                      <PhoneOutlined style={{ fontSize: "25px" }} />
                    </Col>
                    <Col className="ms-3">
                      <div className="text-profile-atas">
                        {users?.phone ? users.phone : <>-</>}
                      </div>
                      <div className="text-profile-bawah">Phone Number</div>
                    </Col>
                  </Row>
                  <Row className="d-flex align-items-center mb-3 ms-3">
                    <Col>
                      <AimOutlined style={{ fontSize: "25px" }} />
                    </Col>
                    <Col className="ms-3">
                      <div className="text-profile-atas">
                        {users?.address ? users.address : <>-</>}
                      </div>
                      <div className="text-profile-bawah">Address</div>
                    </Col>
                  </Row>
                </Col>
                <Col
                  span={5}
                  className="d-flex flex-column justify-content-center align-items-center  w-100"
                >
                  <div>
                    <Image
                      style={{
                        borderRadius: "5px",
                        width: "226.67px",
                        height: "202px",
                      }}
                      src={users?.image ? users.image : imgBlank}
                    />
                  </div>
                  <div>
                    <Button
                      className="btn-change-profile"
                      onClick={() => {
                        handleShowEditProfile();
                      }}
                    >
                      Change Profile
                    </Button>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="w-100">
            <Col span={18}>
              <div
                style={{
                  fontWeight: "700",
                  fontSize: "36px",
                  marginLeft: "60px",
                }}
              >
                My Books
              </div>
            </Col>
          </Row>
          {transactions?.data.length !== 0 ? (
            <Row className=" d-flex justify-content-center">
              <Col span={18}>
                <div className="card-books-profile">
                  <Row className="d-flex flex-column">
                    <Col className="d-flex flex-row">
                      {transactions?.data.map((item) =>
                        item.transaction_items.map((i) => (
                          <div>
                            <div className="card-product-profile mt-2 text-black text-wrap">
                              <img
                                src={i.books.bookCover}
                                className="img-books"
                                alt={i.books.bookCover}
                              />
                              <div className="p-2">
                                <div className="text-header-product-item">
                                  {i.books.title.length > 50
                                    ? i.books.title.slice(0, 50) + " ..."
                                    : i.books.title}
                                </div>
                                <div className="text-author">
                                  {i.books.author}
                                </div>
                                <div className="text-product-item">
                                  {convertRupiah.convert(i.books.price)}
                                </div>
                              </div>

                              <Button
                                style={{
                                  width: "100%",
                                  background: "#393939",
                                  color: "white",
                                }}
                                onClick={() =>
                                  directToBooksDetail(item.books.id)
                                }
                              >
                                Download
                              </Button>
                            </div>
                          </div>
                        ))
                      )}
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          ) : (
            <div>
              <Empty />
            </div>
          )}
        </div>
        <EditProfile
          showEditProfile={showEditProfile}
          handleCloseEditProfile={handleCloseEditProfile}
        />
      </div>
    </>
  );
}
