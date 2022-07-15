import React, { useEffect, useState, useContext } from "react";
import { Layout } from "antd";
import "antd/dist/antd.min.css";

import { io } from "socket.io-client";
// import { UserContext } from "../context/userContext";

import NavsCustomer from "../components/NavsCustomer";
import Chat from "../components/complain/Chat";

import { UserContext } from "../context/userContext";
const { Content } = Layout;

let socket;

export default function ComplainCustomer() {
  const [contact, setContact] = useState(null);
  // const [contacts, setContacts] = useState([]);
  // code here
  const [messages, setMessages] = useState([]);

  const [state] = useContext(UserContext);

  useEffect(() => {
    socket = io("http://localhost:5009", {
      auth: {
        token: localStorage.getItem("token"),
      },
    });

    // code here
    socket.on("new message", () => {
      socket.emit("load messages", contact?.id);
    });

    // listen error sent from server
    socket.on("connect_error", (err) => {
      console.error(err.message); // not authorized
    });
    // loadContact();
    loadMessages();

    return () => {
      socket.disconnect();
    };
  }, [messages]);

  // const loadContact = () => {
  //   // emit event load admin contact
  //   socket.emit("load admin contact");
  //   // listen event to get admin contact
  //   socket.on("admin contact", (data) => {
  //     // manipulate data to add message property with the newest message
  //     // code here
  //     console.log("CONTACT ADMIN ==> ", data);
  //     const dataContact = {
  //       ...data,
  //       message:
  //         messages.length > 0
  //           ? messages[messages.length - 1].message
  //           : "Click here to start message",
  //     };
  //     setContacts([dataContact]);
  //   });
  // };

  // const onClickContact = (data) => {
  //   setContact(data);
  //   // code here
  //   socket.emit("load messages", data.id);
  // };

  const loadMessages = () => {
    socket.on("messages", async (data) => {
      if (data.length > 0) {
        const dataMessages = data.map((item) => ({
          idSender: item.sender.id,
          message: item.message,
        }));
        setMessages(dataMessages);
      } else {
        setMessages([]);
        // loadContact();
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
      <div className="container">
        <NavsCustomer />
        <div className="complain-admin-pages">
          <div
            style={{
              fontSize: "24px",
              fontWeight: "700",
              paddingBottom: "30px",
            }}
          >
            Complain to Admin
          </div>
          <Content style={{ height: "90vh" }}>
            <Chat
              contact={contact}
              messages={messages}
              user={state.user}
              sendMessage={onSendMessage}
            />
          </Content>
        </div>
      </div>
    </>
  );
}
