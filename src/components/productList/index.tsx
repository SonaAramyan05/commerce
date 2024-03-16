import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Item } from "../../types";
import { getItems } from "../../store/product/productSlice";
import { AppDispatch } from "../../store";
import ProductDetails from "../productDetails";
import Product from "../product";
import { itemsSelector } from "../../store/product/productSelector";
import { CartItemsSelector } from "../../store/cart/cartSelector";
import SortingDropdown from "../sortingDropdown";
import { useNavigate } from "react-router-dom";

const ProductList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const items = useSelector(itemsSelector);
    const cartItems = useSelector(CartItemsSelector);
    useEffect(() => {
        dispatch(getItems());
    }, [cartItems]);

    const handleClick = (item: Item) => {
        navigate(`/products/${item.id}`);
    };

    return (
        <div>
            {/* <SortingDropdown sortBy=""/> */}
            <h2>Product List</h2>
            {items.map((item: Item) => (
                <Product
                    key={item.id}
                    item={item}
                    onClick={() => handleClick(item)}
                    isDisabled={item.count <= 0}
                />
            ))}
        </div>
    );
};

export default ProductList;
