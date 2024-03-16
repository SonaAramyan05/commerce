import React from "react";
import { Item } from "../../types";
import { useDispatch } from "react-redux";
import { addToCartAndUpdateProductCount } from "../../store/cart/cartSlice";
import { AppDispatch } from "../../store";

interface ProductProps {
    item: Item;
    onClick: () => void;
    isDisabled: boolean;
}

const Product: React.FC<ProductProps> = ({ item, onClick, isDisabled }) => {
    const dispatch: AppDispatch = useDispatch();

    const handleAddToCart = async () => {
        await dispatch(addToCartAndUpdateProductCount(item));
    };

    return (
        <div>
            <h3>{item.title}</h3>
            <p>Price: {item.price}</p>
            {item.imageUrl && (
                <img
                    onClick={onClick}
                    src={item.imageUrl}
                    alt={item.title}
                    style={{ width: "100px" }}
                />
            )}
            <button onClick={handleAddToCart} disabled={isDisabled}>
                Add to Cart
            </button>
        </div>
    );
};

export default Product;
