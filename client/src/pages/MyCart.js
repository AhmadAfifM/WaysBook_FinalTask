import React, { useEffect } from "react";
import { Row, Col, Button, Divider, message } from "antd";
import "antd/dist/antd.min.css";
import "../index.css";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { API } from "../config/api";
import { useQuery, useMutation } from "react-query";

import CardOnMyCart from "../components/card/CardOnMyCart";
import NavsCustomer from "../components/NavsCustomer";

export default function MyCart() {
  let history = useNavigate();
  const success = () => {
    <>
      <div className="d-flex justify-content-center align-items-center">
        {message.success(
          <>
            Transaction Success, <b>Please do payment!</b>
          </>,
          3
        )}
      </div>
    </>;
  };
  const failed = () => {
    <>
      <div className="d-flex justify-content-center align-items-center">
        {message.error(
          <>
            <b>Transaction Failed!</b>
          </>,
          3
        )}
      </div>
    </>;
  };
  let { data: carts } = useQuery("bookCart", async () => {
    let url = "/cart";

    const response = await API.get(url);
    return response.data.data;
  });

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = process.env.MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handleBuy = useMutation(async (e) => {
    try {
      e.preventDefault();

      const totalPrice = carts?.reduce((memo, i) => {
        return (memo += Number(i.books.price));
      }, 0);

      const idbook = carts?.map((o) => o.books.id);

      const data = {
        idBooks: idbook,
        totalPrice: totalPrice,
      };

      // console.log("INI DATA", data);

      const body = JSON.stringify(data);
      const config = {
        method: "POST",
        headers: {
          Authorization: "Basic " + localStorage.token,
          "Content-type": "application/json",
        },
        body,
      };

      const response = await API.post("/transaction", body, config);
      const token = response.data.payment.token;

      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          success();
          history.push("/profile");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          history.push("/profile");
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      failed();
      console.log(error);
    }
  });
  const onFinish = (e) => handleBuy.mutate(e);

  return (
    <>
      {/* {console.log("INI CART", totalPrice)} */}
      <div className="container">
        <NavsCustomer />
        <div className="mycart-pages">
          <Row style={{ width: "80%" }}>
            <Col span={18}>
              <div style={{ fontSize: "24px", fontWeight: "700" }}>My Cart</div>
              <Row>
                <Col>
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: "400",
                      marginTop: "20px",
                    }}
                  >
                    Review Your Order
                  </div>
                  <Divider
                    style={{ background: "#393939", marginTop: "5px" }}
                  />
                  {carts?.map((cart, index) => (
                    <CardOnMyCart cart={cart} key={index} />
                  ))}

                  <Divider style={{ background: "#393939" }} />
                </Col>
              </Row>
            </Col>
            <Col span={5} style={{ width: "200px", marginLeft: "20px" }}>
              <div>
                <Divider style={{ background: "#393939", marginTop: "88px" }} />

                <Row>
                  <Col span={18}>
                    <div>
                      <b>Subtotal</b>
                    </div>
                  </Col>
                  <Col>
                    {carts?.map((cart, index) => (
                      <div>{cart.books.price}</div>
                    ))}
                  </Col>
                </Row>
                <Row>
                  <Col span={18}>
                    <div>
                      <b>Qty</b>
                    </div>
                  </Col>
                  <Col>
                    <div style={{ textAlign: "right", width: "50px" }}>
                      {carts?.length}
                    </div>
                  </Col>
                </Row>
                <Divider
                  style={{ background: "#393939", marginBottom: "10px" }}
                />
                <Row>
                  <Col span={18}>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: "800",
                        color: "#44B200",
                      }}
                    >
                      Total
                    </div>
                  </Col>
                  <Col>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: "800",
                        color: "#44B200",
                      }}
                    >
                      {carts?.reduce((memo, i) => {
                        return (memo += Number(i.books.price));
                      }, 0)}
                    </div>
                  </Col>
                </Row>

                <Button onClick={onFinish} className="btn-pay">
                  Pay
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
