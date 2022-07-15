const { transaction, transaction_item, user, book } = require("../../models");

const midtransClient = require("midtrans-client");
const nodemailer = require("nodemailer");

const generateCode = (length) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

exports.addTransaction = async (req, res) => {
  try {
    const { totalPrice, idBooks } = req.body;

    const data = {
      idBuyer: req.user.id,
      price: totalPrice,
      status: "pending",
      transactionCode: `INV-${generateCode(8)}`,
    };
    const newData = await transaction.create(data);

    const bookData = idBooks.map((val) => {
      return {
        idTransaction: newData.id,
        idBooks: val,
      };
    });
    await transaction_item.bulkCreate(bookData);

    const buyerData = await user.findOne({
      where: {
        id: newData.idBuyer,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    let parameter = {
      transaction_details: {
        order_id: newData.transactionCode,
        gross_amount: newData.price,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        full_name: buyerData?.name,
        email: buyerData?.email,
        phone: buyerData?.phone,
      },
    };

    const payment = await snap.createTransaction(parameter);

    res.status(200).send({
      status: "success!",
      message: `Create transacation success!`,
      payment,
      book: {
        id: data.transactionCode,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed!",
      message: "Server Error!",
    });
  }
};

exports.getTransaction = async (req, res) => {
  try {
    const idBuyer = req.user.id;
    let data = await transaction.findAll({
      include: [
        {
          model: transaction_item,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          include: [
            {
              model: book,
              as: "books",
              attributes: {
                exclude: [
                  "createdAt",
                  "updatedAt",
                  "pages",
                  "isbn",
                  "desc",
                  "publicDate",
                ],
              },
            },
          ],
        },
      ],
      where: {
        idBuyer,
      },
      order: [["createdAt", "DESC"]],
      attributes: {
        exclude: ["updatedAt", "idBuyer", "idBooks"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    data = data.map((item) => {
      return {
        ...item,
        transaction_items: item.transaction_items.map((item) => {
          return {
            ...item,
            books: {
              ...item.books,
              bookCover: process.env.PATH_FILE + item.books.bookCover,
              fileDoc: process.env.PATH_FILE + item.books.fileDoc,
            },
          };
        }),
      };
    });

    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;
const MIDTRANS_CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY;

const core = new midtransClient.CoreApi();

core.apiConfig.set({
  isProduction: false,
  serverKey: MIDTRANS_SERVER_KEY,
  clientKey: MIDTRANS_CLIENT_KEY,
});

exports.notification = async (req, res) => {
  try {
    const statusResponse = await core.transaction.notification(req.body);
    const orderId = statusResponse.order_id;
    const transactionStatus = statusResponse.transaction_status;
    const fraudStatus = statusResponse.fraud_status;

    if (transactionStatus == "capture") {
      if (fraudStatus == "challenge") {
        // TODO set transaction status on your database to 'challenge'
        // and response with 200 OK
        sendEmail("pending", orderId); //sendEmail with status pending and order id
        handleTransaction("pending", orderId);
        res.status(200);
      } else if (fraudStatus == "accept") {
        // TODO set transaction status on your database to 'success'
        // and response with 200 OK
        sendEmail("success", orderId); //sendEmail with status success and order id

        handleTransaction("success", orderId);
        res.status(200);
      }
    } else if (transactionStatus == "settlement") {
      // TODO set transaction status on your database to 'success'
      // and response with 200 OK
      sendEmail("success", orderId); //sendEmail with status success and order id

      handleTransaction("success", orderId);
      res.status(200);
    } else if (
      transactionStatus == "cancel" ||
      transactionStatus == "deny" ||
      transactionStatus == "expire"
    ) {
      // TODO set transaction status on your database to 'failure'
      // and response with 200 OK
      sendEmail("failed", orderId); //sendEmail with status failed and order id
      handleTransaction("failed", orderId);
      res.status(200);
    } else if (transactionStatus == "pending") {
      // TODO set transaction status on your database to 'pending' / waiting payment
      // and response with 200 OK
      sendEmail("pending", orderId); //sendEmail with status pending and order id
      handleTransaction("pending", orderId);
      res.status(200);
    }
  } catch (error) {
    console.log(error);
    res.send({
      message: "Server Error",
    });
  }
};

const handleTransaction = async (status, transactionId) => {
  await transaction.update(
    {
      status,
    },
    {
      where: {
        id: transactionId,
      },
    }
  );
};

const sendEmail = async (status, transactionId) => {
  // Config service and email account
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SYSTEM_EMAIL,
      pass: process.env.SYSTEM_PASSWORD,
    },
  });

  // Get transaction data
  let data = await transaction.findOne({
    where: {
      id: transactionId,
    },
    attributes: {
      exclude: ["createdAt", "updatedAt", "password"],
    },
    include: [
      {
        model: user,
        as: "buyer",
        attributes: {
          exclude: ["createdAt", "updatedAt", "password", "status"],
        },
      },
      {
        model: book,
        as: "book",
        attributes: {
          exclude: ["createdAt", "updatedAt", "idUser", "price", "desc"],
        },
      },
    ],
  });

  data = JSON.parse(JSON.stringify(data));

  // Email options content
  const mailOptions = {
    from: process.env.SYSTEM_EMAIL,
    to: data.buyer.email,
    subject: "Payment status",
    text: "Your payment is <br />" + status,
    html: `<!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Document</title>
                <style>
                  h1 {
                    color: brown;
                  }
                </style>
              </head>
              <body>
                <h2>Product payment :</h2>
                <ul style="list-style-type:none;">
                  <li>Name : ${data.book.title}</li>
                  <li>Total payment: ${convertRupiah.convert(data.price)}</li>
                  <li>Status : <b>${status}</b></li>
                </ul>  
              </body>
            </html>`,
  };

  // Send an email if there is a change in the transaction status
  if (data.status !== status) {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) throw err;
      console.log("Email sent: " + info.response);

      return res.send({
        status: "Success",
        message: info.response,
      });
    });
  }
};
