import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
    return (
        <div>
            <Link to="/my-profile">My Profile </Link>
            <Link to="/products">Products</Link>
            <Link to="/shopping-cart">Shopping cart</Link>
            <Link to="/orders">Orders</Link>
        </div>
    );
};

export default Header;
