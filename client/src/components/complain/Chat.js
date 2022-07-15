import React from "react";
import { Avatar, Image, Row, Col, Input, Button, Empty } from "antd";
import { CheckCircleTwoTone, SendOutlined } from "@ant-design/icons";

export default function Chat({
  fromComplainAdmin = false,
  contact,
  messages,
  user,
  sendMessage,
}) {
  return (
    <>
      <>
        <div className="container-fluid">
          <div
            className="header-message d-flex align-items-center"
            style={{ height: "10vh" }}
          >
            <Row>
              <Col>
                <Avatar
                  className="bg-secondary me-2 img-chat"
                  src={
                    <Image
                      src="https://joeschmoe.io/api/v1/random"
                      style={{ width: 35 }}
                    />
                  }
                />
              </Col>
              <Col>
                <div className="text-message-admin">
                  Admin Si Paling Ganteng
                </div>
                <div className="text-message-status d-flex align-items-center flex-row">
                  <CheckCircleTwoTone twoToneColor="#52c41a" className="me-2" />
                  Online
                </div>
              </Col>
            </Row>
          </div>

          <div className="content-message px-4 py-3"> </div>

          {fromComplainAdmin ? (
            <div className="footer-message-admin">
              <div>
                <Input
                  className="send-message-admin"
                  placeholder="Write your message here ..."
                />
              </div>
              <div>
                <Button
                  className="btn-send-message-admin"
                  icon={<SendOutlined style={{ fontSize: "20px" }} />}
                ></Button>
              </div>
            </div>
          ) : (
            <div className="footer-message-customer">
              <div>
                <Input
                  className="send-message-customer"
                  placeholder="Write your message here ..."
                />
              </div>
              <div>
                <Button
                  className="btn-send-message-customer"
                  icon={<SendOutlined style={{ fontSize: "20px" }} />}
                ></Button>
              </div>
            </div>
          )}
        </div>
      </>
    </>
  );
}
