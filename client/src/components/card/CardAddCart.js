import React from "react";
import { useNavigate } from "react-router-dom";

import { Row, Col, Button, message } from "antd";
import "antd/dist/antd.min.css";
import { API } from "../../config/api";

import convertRupiah from "rupiah-format";

export default function CardAddCart({ book }) {
  let navigate = useNavigate();

  const notif = (type, msg) => {
    <>
      <div className="d-flex justify-content-center align-items-center">
        {type === "success"
          ? message.success(<>{msg}</>, 3)
          : message.info(<>{msg}</>, 3)}
      </div>
    </>;
  };

  const handleSubmit = async () => {
    const response = await API.post("/cart", { idBooks: book.id });
    console.log(response.data.message);
    console.log(book.id);

    notif(response.data.status, response.data.message);
    navigate("/mycart");
  };

  return (
    <>
      <div className="card-books-w-add-cart">
        <Row className="cards-w-add-cart">
          <Col>
            <img
              src={book.bookCover}
              className="img-books-w-add-cart "
              alt=""
            />
          </Col>
          <Col className="d-flex align-items-center ">
            <div className="card-product-w-add-cart text-black ">
              <div className="p-2">
                <div className="text-header-product-w-add-cart">
                  {book.title.length > 30
                    ? book.title.slice(0, 30) + " ..."
                    : book.title}
                </div>
                <div className="text-author">{book.author}</div>
                <div className="text-desc">
                  "
                  <>
                    {book.desc.length > 60
                      ? book.desc.slice(0, 80) + " ..."
                      : book.desc}
                  </>
                  "
                </div>
                <div className="text-product-item">
                  {convertRupiah.convert(book.price)}
                </div>
                <Button onClick={handleSubmit} className="btn-card-w-add-cart ">
                  Add to Cart
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
// return (
//   <>
//     <div className="card-books-w-add-cart mt-5">
//       <Row className="cards-w-add-cart">
//         <Col span={12}>
//           <img
//             src="https://cdn.storial.co/book_front/55230-06ab1016416d086b79f4d750424341560126c4cb.jpeg"
//             className="img-books-w-add-cart "
//             alt=""
//           />
//         </Col>
//         <Col span={12} className="bg-primary">
//           <div className="card-product-w-add-cart text-black ">
//             <div className="p-2">
//               <div className="text-header-product-w-add-cart">
//                 RENCANA BESAR Untuk Mati Dengan Tenang
//               </div>
//               <div className="text-author">By. Wisnu Suryaning Adji</div>
//               <div className="text-desc">
//                 "Lintang Adriana tak menyangka jika garis hidupnya akan
//                 dimulai mendebarkan semenjak ia .. "
//               </div>
//               <div className="text-product-item">
//                 {convertRupiah.convert("88000")}
//               </div>
//               <Button className="btn-card-w-add-cart ">Add to Cart</Button>
//             </div>
//           </div>
//         </Col>
//       </Row>
//     </div>
//   </>
// );
