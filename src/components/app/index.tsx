import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../header";
import { useSelector } from "react-redux";
import SignUpForm from "../signUp";
import SignIn from "../signIn";
import MyProfile from "../myProfile";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<SignUpForm />} />
                <Route path="/sign-up" element={<SignUpForm />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/my-profile" element={<MyProfile />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
