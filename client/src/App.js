import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import NavsAuth from "./components/NavsAuth";
import NavsCustomer from "./components/NavsCustomer";
import NavsAdmin from "./components/NavsAdmin";
import CardBooks from "./components/card/CardBooks";
import CardAddCart from "./components/card/CardAddCart";
import BooksDetail from "./pages/BooksDetail";
import AddBooksProduct from "./pages/AddBooksProduct";
import DataTransactions from "./pages/DataTransactions";
import Profile from "./pages/Profile";
import MyCart from "./pages/MyCart";
import BooksList from "../src/pages/BooksList";
import ComplainAdmin from "../src/pages/ComplainAdmin";
import ComplainCustomer from "../src/pages/ComplainCustomer";
import { UserContext } from "./context/userContext";

import { API, setAuthToken } from "./config/api";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  // console.clear();
  console.log("State on App.js ", state);
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    // Redirect Auth
    if (state.isLogin === false) {
      navigate("/");
    } else {
      if (state.user.status === "admin") {
        navigate("/datatransactions");
      } else if (state.user.status === "customer") {
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/checkauth");

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []);
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/navsauth" element={<NavsAuth />} />
        <Route path="/navscustomer" element={<NavsCustomer />} />
        <Route path="/cardbooks" element={<CardBooks />} />
        <Route path="/cardaddcart" element={<CardAddCart />} />
        <Route path="/booksdetail/:id" element={<BooksDetail />} />
        <Route path="/addbooksproduct" element={<AddBooksProduct />} />
        <Route path="/datatransactions" element={<DataTransactions />} />
        <Route path="/navsadmin" element={<NavsAdmin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/mycart" element={<MyCart />} />
        <Route path="/booklist" element={<BooksList />} />
        <Route path="/complainadmin" element={<ComplainAdmin />} />
        <Route path="/complaincustomer" element={<ComplainCustomer />} />
      </Routes>
    </>
  );
}

export default App;
