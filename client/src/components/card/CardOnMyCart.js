import React from "react";
import { Row, Col } from "antd";
import "antd/dist/antd.min.css";
import { DeleteOutlined } from "@ant-design/icons";
import convertRupiah from "rupiah-format";

// import dummyBooks from "../../dummyData/DataBooks";

export default function CardOnMyCart({ cart }) {
  return (
    <>
      <div style={{ width: "750px" }}>
        <Row className="mt-4">
          <Col span={4}>
            <img
              src={cart.books.bookCover}
              className="img-books-on-my-cart "
              alt=""
            />
          </Col>
          <Col span={12}>
            <div className="text-black ms-2 ">
              <div className="p-2">
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                  }}
                >
                  {cart.books.title}
                </div>
                <div
                  style={{
                    marginTop: "15px",
                    minHeight: "50px",
                    fontSize: "12px",
                    fontWeight: "400",
                    color: "#929292",
                    fontStyle: "italic",
                  }}
                >
                  {cart.books.author}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "800",
                    color: "#44B200",
                  }}
                >
                  {convertRupiah.convert(cart.books.price)}
                </div>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className="d-flex p-1 justify-content-end">
              <DeleteOutlined
                style={{ fontSize: "24px", paddingLeft: "50px" }}
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
