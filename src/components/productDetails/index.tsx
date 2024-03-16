import React, { useState } from "react";
import { Item } from "../../types";
import { addToCartAndUpdateProductCount } from "../../store/cart/cartSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";

interface ProductDetailsProps {
    item: Item;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ item }) => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        const updatedCount = item.count - quantity;
        const newItem = { ...item, count: updatedCount };
        if (updatedCount >= 0) {
            dispatch(
                addToCartAndUpdateProductCount({
                    item: newItem,
                    quantity: quantity,
                })
            );
            window.alert("product added");
            navigate("/products");
        } else window.alert("products number in stock is not sufficient");
    };

    const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(e.target.value, 10);
        setQuantity(newQuantity);
    };

    return (
        <div>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            {item.imageUrl && (
                <img
                    src={item.imageUrl}
                    alt={item.title}
                    style={{ width: "200px" }}
                />
            )}
            <input
                type="number"
                min={1}
                value={quantity}
                onChange={handleChangeQuantity}
            />
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
};

export default ProductDetails;
