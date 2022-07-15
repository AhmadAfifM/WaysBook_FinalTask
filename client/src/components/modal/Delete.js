import React from "react";

import { Modal, Space, Button } from "antd";

import "antd/dist/antd.min.css";
import "../../index.css";

const { confirm } = Modal;
const showPromiseConfirm = () => {
  confirm({
    title: "Do you want to delete these items?",
    icon: <ExclamationCircleOutlined />,
    content:
      "When clicked the OK button, this dialog will be closed after 1 second",

    onOk() {
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      }).catch(() => console.log("Oops errors!"));
    },

    onCancel() {},
  });
};
export default function Delete() {
  return (
    <>
      <Button onClick={showPromiseConfirm}>With promise</Button>
    </>
  );
}
