import React from "react";
import { Avatar, Image, Row, Col, Divider } from "antd";

import default_profile from "../../assets/blankImage.png";

export default function Contact(
  dataContact,
  clickContact,
  contact,
  fromAdmin = false
) {
  return (
    <>
      <div className=" container-fluid" style={{ height: "50vh" }}>
        {dataContact.length > 0 && (
          <>
            {dataContact.map((item) => (
              <div
                key={item.id}
                className={`header-message-customer d-flex align-items-start ${
                  contact?.id === item?.id && "contact-active"
                }`}
                onClick={() => {
                  clickContact(item);
                }}
              >
                <Row
                  className="d-flex align-items-center ms-1"
                  style={{ width: "14vw" }}
                >
                  <Col>
                    <Avatar
                      className="rounded-circle me-2 img-contact"
                      src={
                        <Image
                          src={item.user?.image || default_profile}
                          style={{ width: 35 }}
                        />
                      }
                    />
                  </Col>
                  <Col>
                    <div className="text-message-customer">{item.name}</div>
                    {fromAdmin ? (
                      <div className="text-contact-chat mt-1 mb-0">
                        {item.lastMessage?.message ||
                          "Click here to start message"}
                      </div>
                    ) : (
                      <div className="text-contact-chat mt-1 mb-0">
                        {item.message}
                      </div>
                    )}
                  </Col>
                  <Divider className="divider-message-customer" />
                </Row>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
