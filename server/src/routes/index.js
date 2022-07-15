const express = require("express");

const router = express.Router();

const {
  addUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

const {
  addBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
} = require("../controllers/book");

const { addCart, deleteCart, getCart } = require("../controllers/cart");

const {
  addTransaction,
  getTransaction,
  notification,
} = require("../controllers/transaction");

const { register, login, checkAuth } = require("../controllers/auth");

const { auth } = require("../middlewares/auth");
const { uploadFileImage } = require("../middlewares/uploadFile");

//ROUTING USER
router.post("/user", uploadFileImage("imageFile"), addUser);
router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.patch("/user/:id", uploadFileImage("imageFile"), updateUser);
router.delete("/user/:id", deleteUser);

//ROUTING BOOK
router.post("/book", uploadFileImage("file"), addBook);
router.get("/books", getBooks);
router.get("/book/:id", getBook);
router.patch("/book/:id", uploadFileImage("file"), updateBook);
router.delete("/book/:id", deleteBook);

//ROUTING AUTH
router.post("/register", register);
router.post("/login", login);
router.get("/checkauth", auth, checkAuth);

//ROUTING CART
router.post("/cart", auth, addCart);
router.get("/cart", auth, getCart);
router.delete("/cart/:id", auth, deleteCart);

//ROUTING TRANSACTION
router.post("/transaction", auth, addTransaction);
router.get("/transactions", auth, getTransaction);

router.post("/notification", notification);

module.exports = router;
