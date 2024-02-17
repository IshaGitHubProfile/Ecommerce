//4000003560000008
import './App.css';
import { useEffect, useState } from "react";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router , Route,Routes} from "react-router-dom"
import WebFont from "webfontloader";
import React from 'react';
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp.js";
import store from "./store.js";
import { loadUser } from './actions/userAction.js';
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/admin/Dashboard.js";
import ProductList from "./component/admin/ProductList.js";
import NewProduct from "./component/admin/NewProduct.js";
import UpdateProduct from "./component/admin/UpdateProduct.js";
import OrderList from "./component/admin/OrderList.js";
import ProcessOrder from "./component/admin/ProcessOrder.js";
import UsersList from "./component/admin/UsersList.js";
import UpdateUser from "./component/admin/UpdateUser.js";
import ProductReviews from "./component/admin/ProductReviews.js";
import About from "./component/layout/About/About.js";
import Contact from './component/layout/Contact/Contact.js';

function App() {

  const { isAuthenticated , user} = useSelector((state) => state.user);
  
  const [stripeApiKey, setStripeApiKey ] = useState("");

  async function getStripeApiKey() {
    try {
      const { data } = await axios.get("/api/v1/stripeapikey");
      const stripeApiKey = data?.stripeApiKey;
  
      if (stripeApiKey) {
        setStripeApiKey(stripeApiKey);
      } else {
        console.error("Stripe API key not found in the response data");
      }
    } catch (error) {
      console.error("Error fetching Stripe API key:", error.message);
    }
  }

  useEffect(() => {
    WebFont.load({
      google : {
        families : ["Roboto","Droid Sans","Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  //window.addEventListener("contextmenu", (e) => e.preventDefault());

  const stripePromise = loadStripe('pk_test_51Och2nSAbygUfsvr2BWDpzWs9a8ZPaN3DYP6mHeKs3MqV8F1jasdSjaoNZWMrhtE2hlLxvU7tyel1v1duLooTQge00IL2ip15f');

  return (
    <Router>
      <Elements stripe={stripePromise}>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/products" element={<Products />} />
          <Route path="/search" element={<Search />} />
          {isAuthenticated && (
            <Route path="/account" element={<Profile />} />
          )}
          <Route path="/login" element={<LoginSignUp />} />

          {isAuthenticated && (
            <Route path="/me/update" element={<UpdateProfile />} />
          )}

          {isAuthenticated && (
            <Route path="/password/update" element={<UpdatePassword />} />
          )}

          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />

          <Route path="/cart" element={<Cart />} />

          {isAuthenticated && (
            <Route path="/shipping" element={<Shipping />} />
          )}

          {isAuthenticated && (
            <Route path="/process/payment" element={<Payment />} />
          )}

          {isAuthenticated && (
            <Route path="/success" element={<OrderSuccess />} />
          )}

          {isAuthenticated && (
            <Route path="/orders" element={<MyOrders />} />
          )}

          {isAuthenticated && (
            <Route path="/order/confirm" element={<ConfirmOrder />} />
          )}

          {isAuthenticated && (
            <Route path="/order/:id" element={<OrderDetails />} />
          )}

          {isAuthenticated && (
            <Route path="/admin/dashboard" element={<Dashboard />} />
          )}

          {isAuthenticated && (
            <Route path="/admin/products" element={<ProductList />} />
          )}

          {isAuthenticated && (
            <Route path="/admin/product" element={<NewProduct />} />
          )}

          {isAuthenticated && (
            <Route path="/admin/product/:id" element={<UpdateProduct />} />
          )}

          {isAuthenticated && (
            <Route path="/admin/orders" element={<OrderList />} />
          )}

          {isAuthenticated && (
            <Route path="/admin/order/:id" element={<ProcessOrder />} />
          )}

          {isAuthenticated && (
            <Route path="/admin/users" element={<UsersList />} />
          )}

          {isAuthenticated && (
            <Route path="/admin/user/:id" element={<UpdateUser />} />
          )}

          {isAuthenticated && (
            <Route path="/admin/reviews" element={<ProductReviews />} />
          )}

        </Routes>
        <Footer />
      </Elements>
    </Router>

  );
}

export default App;
