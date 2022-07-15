import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Button, message } from "antd";
import "antd/dist/antd.min.css";
import "../index.css";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "bootstrap/dist/css/bootstrap.min.css";
import convertRupiah from "rupiah-format";

import { API } from "../config/api";
import { useQuery } from "react-query";
import NavsCustomer from "../components/NavsCustomer";

export default function BooksDetail() {
  let navigate = useNavigate();
  let { id } = useParams();

  let { data: books } = useQuery("bookCache", async () => {
    const response = await API.get("/book/" + id);

    return response.data.data;
  });
  const success = () => {
    <>
      <div className="d-flex justify-content-center align-items-center">
        {message.success(
          <>
            The book is <b> successfully </b> added to the cart
          </>,
          3
        )}
      </div>
    </>;
  };
  const exist = () => {
    <>
      <div className="d-flex justify-content-center align-items-center">
        {message.info(
          <>
            The book <b> already </b> added to the cart
          </>,
          3
        )}
      </div>
    </>;
  };
  const handleSubmit = async () => {
    const responses = await API.post("/cart", { idBooks: books.id });
    console.log("INI RESPONS ", responses);
    directToCart();
  };
  const directToCart = () => {
    if (books.id) {
      exist();
    } else {
      success();
    }
    navigate("/mycart");
  };

  return (
    <div
      className="container justify-content-center d-flex flex-column "
      style={{ minHeight: "75vh" }}
    >
      <NavsCustomer />
      <Row className="thumb-detail justify-content-center">
        <Col
          span={8}
          className=" d-flex justify-content-end pe-3"
          style={{ width: "200vh" }}
        >
          <img
            src={books?.bookCover}
            alt={books?.bookCover}
            className="books-detail"
            style={{ width: "300px", height: "550px", borderRadius: "6px" }}
          ></img>
        </Col>
        <Col span={8} className=" ps-3">
          <Col>
            <div className="title-books-detail">{books?.title}</div>
            <div
              style={{
                fontSize: "20px",
                color: "#929292",
                fontWeight: "400",
                fontStyle: "italic",
                paddingTop: "10px",
              }}
            >
              By. {books?.author}
            </div>
          </Col>
          <Col className="pt-5">
            <div className="title-detail">Publication Data</div>
            <div className="sub-title-detail">{books?.publicDate}</div>
          </Col>
          <Col className="pt-4">
            <div className="title-detail">Pages</div>
            <div className="sub-title-detail">{books?.pages}</div>
          </Col>
          <Col className="pt-4">
            <div className="title-detail text-danger">ISBN</div>
            <div className="sub-title-detail">{books?.isbn}</div>
          </Col>
          <Col className="pt-4">
            <div className="title-detail">Price</div>
            <div
              className="sub-title-detail"
              style={{ color: "#44B200", fontWeight: "600" }}
            >
              {convertRupiah.convert(books?.price)}
            </div>
          </Col>
        </Col>
      </Row>

      <Row className="about-pages justify-content-center d-flex">
        <Col span={16}>
          <div className="container">
            <div className="title-about">About This Book</div>
            <div className="content-about" style={{ textAlign: "justify" }}>
              {books?.desc}
            </div>
          </div>
        </Col>
      </Row>

      <Row className="button-pages justify-content-center d-flex  pt-2">
        <Col span={16} className="d-flex justify-content-end ">
          <Button
            onClick={handleSubmit}
            className="btn-addcart d-flex align-items-center justify-content-center"
            type="primary"
          >
            Add Cart
            <ShoppingCartOutlined style={{ fontSize: "20px" }} />
          </Button>
        </Col>
      </Row>
    </div>
  );
}
