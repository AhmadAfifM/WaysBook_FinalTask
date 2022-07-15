import React, { useContext } from "react";
import { Row, Col } from "antd";
import "antd/dist/antd.min.css";
import "../index.css";
// import CardBooks from "../components/card/CardBooks";

import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "../context/userContext";

import CardBooks from "../components/card/CardBooks";
import CardAddCart from "../components/card/CardAddCart";
import NavsAuth from "../components/NavsAuth";
import { API } from "../config/api";
import { useQuery } from "react-query";
import NavsCustomer from "../components/NavsCustomer";
export default function Home() {
  let { data: books } = useQuery("bookProduct", async () => {
    let url = "/books";

    const response = await API.get(url);
    return response.data.data;
  });

  const [state] = useContext(UserContext);

  return (
    <>
      <div className="container-fluid">
        {state.isLogin ? <NavsCustomer /> : <NavsAuth />}
        <Row>
          <Col style={{ width: "100%" }}>
            <div className="text-in-home">
              <p>With us, you can shop online & help</p>
              <p>save your high street at the same time</p>
            </div>
          </Col>

          <Col className="d-flex flex-row">
            {books && (
              <>
                {books?.map((book, index) => (
                  <div>
                    <CardAddCart
                      book={book}
                      key={index}
                      className="contentStyle"
                    />
                  </div>
                ))}
              </>
            )}
          </Col>

          <Col>
            <Row className="d-flex flex-column ms-5">
              <Col>
                <div
                  style={{
                    fontSize: "36px",
                    fontWeight: "700",
                    paddingLeft: "70px",
                    marginTop: "50px",
                  }}
                >
                  List Books
                </div>
              </Col>
              <Col>
                <CardBooks />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}
