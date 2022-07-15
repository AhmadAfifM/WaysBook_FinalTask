import React from "react";
import { Empty, Table, Tag } from "antd";
import "antd/dist/antd.min.css";
import "../index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import dataTranscation from "../dummyData/DataTransacation";

import NavsAdmin from "../components/NavsAdmin";

const columns = [
  {
    title: "No",
    dataIndex: "id",
    key: "id",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Users",
    dataIndex: "users",
    key: "users",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Evidance of Transfer",
    dataIndex: "imgPayment",
    key: "imgPayment",
  },
  {
    title: "Product Purchased",
    dataIndex: "productTitle",
    key: "productTitle",
  },
  {
    title: "Total Payment",
    dataIndex: "totalPayment",
    key: "totalPayment",
  },
  {
    title: "Status Payment",
    key: "statusPayment",
    dataIndex: "statusPayment",
    render: (_, { statusPayment }) => (
      <>
        {statusPayment.map((status) => {
          let color = "";
          if (status === "Approve") {
            color = "green";
          }

          if (status === "Pending") {
            color = "yellow";
          }

          if (status === "Cancel") {
            color = "red";
          }

          return (
            <Tag color={color} key={status}>
              {status.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
];

const datas = dataTranscation;

export default function DataTranscations() {
  return (
    <>
      <div className="container">
        <NavsAdmin />
        <div className="transaction-pages">
          <div
            style={{
              fontSize: "24px",
              fontWeight: "700",
              paddingBottom: "50px",
            }}
          >
            Incoming Transaction
          </div>
          {datas?.length !== 0 ? (
            <Table columns={columns} dataSource={datas} />
          ) : (
            <Table style={{ minHeight: "500px" }} columns={columns}>
              <Empty />
            </Table>
          )}
        </div>
      </div>
    </>
  );
}
