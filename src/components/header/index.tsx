import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
    const isSignedIn = localStorage.getItem("isSignedIn");

    return (
        <div>
            {isSignedIn ? (
                <>
                    <Link to="/sign-up">Sign-up Page </Link>
                    <Link to="/my-profile">My Profile </Link>
                    <Link to="/products">Products</Link>
                    <Link to="/add-product">Add product</Link>
                    <Link to="/shopping-cart">Shopping cart</Link>
                    <Link to="/orders">Orders</Link>
                </>
            ) : (
                <>
                    <Link to="/sign-up">Sign-up</Link>
                    <Link to="/sign-in">Sign-in</Link>
                </>
            )}
        </div>
    );
};

export default Header;
