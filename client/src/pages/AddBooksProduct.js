import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Form, Input, Upload, DatePicker } from "antd";
import "antd/dist/antd.min.css";
import "../index.css";
import { FileAddOutlined, InboxOutlined } from "@ant-design/icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { API } from "../config/api";

import NavsAdmin from "../components/NavsAdmin";

const { TextArea } = Input;
const { Dragger } = Upload;

// const props = {
//   name: "file",
//   multiple: true,

//   onChange(info) {
//     const { status } = info.file;
//     console.log("Ini status ", info.file);
//     if (status !== "uploading") {
//       console.log(info.file, info.fileList);
//     }

//     if (status === "done") {
//       message.success(`${info.file.name} file uploaded successfully.`);
//     } else if (status === "error") {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },

//   onDrop(e) {
//     console.log("Dropped files", e.dataTransfer.files);
//   },
// };

export default function AddBooksDetail() {
  let navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    publicDate: "",
    pages: "",
    isbn: "",
    price: "",
    desc: "",
    author: "",
  });

  const handleChange = (e) => {
    console.log(e);
    if (e.hasOwnProperty("target")) {
      setForm({
        ...form,
        [e.target.name]:
          e.target.type === "file" ? e.target.files : e.target.value,
      });
    } else if (e.hasOwnProperty("fileList")) {
      setForm({
        ...form,
        file: e.fileList,
      });
    } else {
      setForm({
        ...form,
        publicDate: e.format("DD-MM-YYYY"),
      });
    }
  };
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      console.log(e);
      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      console.log(form);

      // Data body
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("publicDate", form.publicDate);
      formData.append("pages", form.pages);
      formData.append("isbn", form.isbn);
      formData.append("price", form.price);
      formData.append("desc", form.desc);
      formData.append("file", form.file[0].originFileObj);
      formData.append("file", form.file[1].originFileObj);
      formData.append("author", form.author);

      console.log(formData);
      // Insert data product to database
      const response = await API.post("/book", formData, config);
      console.log(response);

      navigate("/booklist");
    } catch (error) {
      console.log(error);
    }
  });
  const onFinish = (e) => handleSubmit.mutate(e);
  return (
    <div className="container " style={{ minHeight: "100vh" }}>
      <NavsAdmin />
      <Row className="justify-content-center">
        <Col
          span={19}
          className="d-flex justify-content-start pb-2 ps-3"
          style={{ width: "200vh" }}
        >
          <div
            style={{
              fontWeight: "700",
              fontSize: "36px",
            }}
          >
            Add Book
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center  ">
        <Col span={20} className="d-flex  justify-content-center pt-4">
          <div>
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 24,
              }}
              initialValues={{
                remember: true,
              }}
            >
              <Form.Item>
                <Input
                  style={{
                    backgroundColor: "rgba(210, 210, 210, 0.25)",
                    border: "2px solid #BCBCBC",
                    color: "#333333",
                    width: "995px",
                    height: "50px",
                    borderRadius: "5px",
                  }}
                  placeholder="Title"
                  name="title"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item>
                <DatePicker
                  style={{
                    backgroundColor: "rgba(210, 210, 210, 0.25)",
                    border: "2px solid #BCBCBC",
                    color: "#333333",
                    width: "995px",
                    height: "50px",
                    borderRadius: "5px",
                  }}
                  placeholder="Publication Date"
                  name="publicDate"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  style={{
                    backgroundColor: "rgba(210, 210, 210, 0.25)",
                    border: "2px solid #BCBCBC",
                    color: "#333333",
                    width: "995px",
                    height: "50px",
                    borderRadius: "5px",
                  }}
                  placeholder="Pages"
                  name="pages"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  style={{
                    backgroundColor: "rgba(210, 210, 210, 0.25)",
                    border: "2px solid #BCBCBC",
                    color: "#333333",
                    width: "995px",
                    height: "50px",
                    borderRadius: "5px",
                  }}
                  placeholder="ISBN"
                  name="isbn"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  style={{
                    backgroundColor: "rgba(210, 210, 210, 0.25)",
                    border: "2px solid #BCBCBC",
                    color: "#333333",
                    width: "995px",
                    height: "50px",
                    borderRadius: "5px",
                  }}
                  placeholder="Author"
                  name="author"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  style={{
                    backgroundColor: "rgba(210, 210, 210, 0.25)",
                    border: "2px solid #BCBCBC",
                    color: "#333333",
                    width: "995px",
                    height: "50px",
                    borderRadius: "5px",
                  }}
                  placeholder="Price"
                  name="price"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item>
                <TextArea
                  style={{
                    backgroundColor: "rgba(210, 210, 210, 0.25)",
                    border: "2px solid #BCBCBC",
                    color: "#333333",
                    width: "1000px",
                    borderRadius: "5px",
                  }}
                  placeholder="About This Book"
                  name="desc"
                  onChange={handleChange}
                  autoSize={{
                    minRows: 3,
                    maxRows: 5,
                  }}
                />
              </Form.Item>
              <Dragger
                className="mb-3"
                multiple={true}
                name="file"
                onChange={handleChange}
                // onChange={(e) => console.log(e)}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  You can upload single or bulk upload to this area!
                </p>
              </Dragger>
            </Form>
          </div>
        </Col>
      </Row>
      <Row className=" justify-content-center d-flex">
        <Col span={19} className="d-flex justify-content-end ">
          <Button
            className="btn-addcart d-flex align-items-center justify-content-center"
            type="primary"
            htmlType="submit"
            onClick={onFinish}
          >
            Add Book
            <FileAddOutlined style={{ fontSize: "20px" }} />
          </Button>
        </Col>
      </Row>
    </div>
  );
}
