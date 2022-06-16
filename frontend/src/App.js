import './App.css';
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import React, { useEffect} from "react";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store";
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import AdminRoute from "./component/Route/AdminRoute.js";
import Profile from "./component/User/Profile.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Dashboard from "./component/Admin/Dashboard.js";
import MyProducts from "./component/MyProduct/MyProducts.js";
import ProductList from "./component/Admin/ProductList.js";
import UpdateProduct from "./component/Product/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UsersList from "./component/Admin/UsersList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import NewProduct from './component/Product/NewProduct';
import Contact from './component/layout/Contact/Contact';
import About from './component/layout/About/About';
import NotFound from "./component/layout/NotFound/NotFound";


function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);


  //  calling useEffect for font so that it load font first
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
  }, []);





  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}


      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/about" element={<About />} />


        {/* when user is logged in then it will access these resources */}
        <Route exact path='/' element={<ProtectedRoute />}>
          <Route exact path='/account' element={<Profile />} />
          <Route exact path="/update/product/:id" element={<UpdateProduct />} />
          <Route exact path='/me/update' element={<UpdateProfile />} />
          <Route exact path='/password/update' element={<UpdatePassword />} />
           <Route exact path="/my/products" element={<MyProducts/>} />
          <Route exact path="/create/product" element={<NewProduct />} />
          <Route exact path="/order/confirm" element={<ConfirmOrder />} />
        </Route>

        {/* when admin is logged in then it will access these resources */}
        <Route exact path='/' element={<AdminRoute />}>
          <Route exact path="/admin/dashboard" element={<Dashboard />} />
          <Route exact path="/admin/products" element={<ProductList />} />
          <Route exact path="/admin/orders" element={<OrderList />} />
          <Route exact path="/admin/order/:id" element={<ProcessOrder />} />
          <Route exact path="/admin/users" element={<UsersList />} />
          <Route exact path="/admin/user/:id" element={<UpdateUser />} />

        </Route>

        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path='/password/forgot' element={<ForgotPassword />} />
        <Route exact path='/password/reset/:token' element={<ResetPassword />} />
        <Route exact path="/cart" element={<Cart />} />

        <Route path='*' element={<NotFound />} />

      </Routes>
      <Footer />
    </Router>

  );
}

export default App;
