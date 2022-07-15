import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Layout } from "antd";
import "antd/dist/antd.min.css";
import NavsAdmin from "../components/NavsAdmin";
import Chat from "../components/complain/Chat";
import Contact from "../components/complain/Contact";
import { UserContext } from "../context/userContext";

import { io } from "socket.io-client";
const { Content } = Layout;
let socket;
export default function ComplainAdmin() {
  const [contact, setContact] = useState(null);
  const [contacts, setContacts] = useState([]);

  const [messages, setMessages] = useState([]);
  const [state] = useContext(UserContext);
  useEffect(() => {
    socket = io("http://localhost:5009", {
      auth: {
        token: localStorage.getItem("token"),
      },
    });

    socket.on("new message", () => {
      socket.emit("load messages", contact?.id);
    });

    loadContacts();
    loadMessages();

    return () => {
      socket.disconnect();
    };
  }, [messages]);

  const loadContacts = () => {
    socket.emit("load customer contacts");
    socket.on("customer contacts", (data) => {
      console.log("Contact", data);
      // filter just customers which have sent a message
      let dataContact = data.map((item) => ({
        ...item,
        lastMessage: [...item.sender, ...item.recipient].sort(
          (a, b) => b.id - a.id
        )[0],
      }));
      // manipulate customers to add message property with the newest message
      // code here
      setContacts(dataContact);
    });
  };

  const onClickContact = (data) => {
    setContact(data);
    // code here
    socket.emit("load messages", data.id);
  };

  // code here
  const loadMessages = () => {
    socket.on("messages", async (data) => {
      console.log("tes", data);
      if (data.length > 0) {
        const dataMessages = data.map((item) => ({
          idSender: item.sender.id,
          message: item.message,
        }));
        setMessages(dataMessages);

        loadContacts();
      } else {
        setMessages([]);
        loadContacts();
      }
    });
  };

  const onSendMessage = (e) => {
    if (e.key === "Enter") {
      const data = {
        idRecipient: contact.id,
        message: e.target.value,
      };

      socket.emit("send message", data);
      e.target.value = "";
    }
  };

  return (
    <>
      <div className="container" style={{ width: "90vw" }}>
        <NavsAdmin />
        <div className="complain-admin-pages">
          <div
            style={{
              fontSize: "24px",
              fontWeight: "700",
              paddingBottom: "30px",
            }}
          >
            Customer Complain
          </div>
          <Content style={{ height: "90vh" }}>
            <Row>
              <Col md={6} style={{ height: "90vh" }} className="overflow-auto ">
                <Contact
                  dataContact={contacts}
                  clickContact={onClickContact}
                  contact={contact}
                  fromAdmin={true}
                />
              </Col>
              <Col
                md={18}
                style={{ height: "90vh" }}
                className="px-1 overflow-auto "
              >
                <Chat
                  contact={contact}
                  messages={messages}
                  user={state.user}
                  sendMessage={onSendMessage}
                  fromComplainAdmin={true}
                />
              </Col>
            </Row>
          </Content>
        </div>
      </div>
    </>
  );
}
