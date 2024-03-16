import React from "react";
import { Item } from "../../types";
import { addToCartAndUpdateProductCount } from "../../store/cart/cartSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";

interface ProductDetailsProps {
    item: Item;
    isDisabled: boolean;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
    item,
    isDisabled,
}) => {
    const dispatch: AppDispatch = useDispatch();
    const handleAddToCart = () => {
        dispatch(addToCartAndUpdateProductCount(item));
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
            <button onClick={handleAddToCart} disabled={isDisabled}>
                Add to Cart
            </button>
        </div>
    );
};

export default ProductDetails;
