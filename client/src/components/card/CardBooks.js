import React from "react";
import { Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { useNavigate } from "react-router-dom";
import { API } from "../../config/api";
import { useQuery } from "react-query";

import { Button, Col, Row } from "antd";
import "antd/dist/antd.min.css";

import convertRupiah from "rupiah-format";

// import dummyBooks from "../../dummyData/DataBooks";

export default function CardBooks({ fromProfile = false }) {
  // const [datas] = useState(dummyBooks);

  let navigate = useNavigate();

  let { data: books } = useQuery("bookProduct", async () => {
    let url = "/books";

    const response = await API.get(url);
    return response.data.data;
  });

  const directToBooksDetail = (id) => {
    navigate("/booksdetail/" + id);
  };

  return (
    <>
      <div className="card-books">
        <Row className="d-flex flex-column">
          <Col className="d-flex flex-row">
            {books?.map((book, idx) => (
              <Nav.Link onClick={() => directToBooksDetail(book.id)} key={idx}>
                <div className="card-product mt-2 text-black text-wrap">
                  <img
                    src={book.bookCover}
                    className="img-books"
                    alt={book.bookCover}
                  />
                  <div className="p-2">
                    <div className="text-header-product-item">
                      {book.title.length > 50
                        ? book.title.slice(0, 50) + " ..."
                        : book.title}
                    </div>
                    <div className="text-author">{book.author}</div>
                    <div className="text-product-item">
                      {convertRupiah.convert(book.price)}
                    </div>
                  </div>
                  {fromProfile ? (
                    <Button
                      style={{
                        width: "100%",
                        background: "#393939",
                        color: "white",
                      }}
                    >
                      Download
                    </Button>
                  ) : null}
                </div>
              </Nav.Link>
            ))}
          </Col>
        </Row>
      </div>
    </>
  );
}
