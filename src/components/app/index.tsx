import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../header";
import { useSelector } from "react-redux";
import SignUpForm from "../signUp";
import SignIn from "../signIn";
import MyProfile from "../myProfile";
import EditProfile from "../editProfile";
import AddProduct from "../addProduct";
import ProductList from "../productList";
import ShoppingCart from "../shoppingCart";
import Orders from "../orders";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<SignUpForm />} />
                <Route path="/sign-up" element={<SignUpForm />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/my-profile" element={<MyProfile />} />
                <Route path="/edit-profile" element={<EditProfile />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/shopping-cart" element={<ShoppingCart />} />
                <Route path="/orders" element={<Orders />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
