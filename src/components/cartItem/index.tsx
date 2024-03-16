import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { removeItem, updateItemCount } from "../../store/cart/cartSlice";
import { Item } from "../../types";
import { productCountSelector } from "../../store/product/productSelector";

interface ItemProps {
    item: Item;
}

const CartItem: React.FC<ItemProps> = ({ item }) => {
    const dispatch: AppDispatch = useDispatch();
    const [count, setCount] = useState(item.count);
    const productCountsArray = useSelector(productCountSelector);

    const handleChangeCount = (newCount: number) => {
        const productCount =
            productCountsArray.find((product) => product.id === item.id)
                ?.count || 0;

        if (newCount <= productCount) {
            setCount(newCount);
            dispatch(updateItemCount({ id: item.id, count: newCount }));
        } else {
            alert(`unsuffiecient number of items`);
        }
    };

    const handleRemoveItem = () => {
        dispatch(removeItem(item.id));
    };

    return (
        <div>
            <img src={item.imageUrl}></img>
            <h3>{item.title}</h3>
            <p>Count: {count}</p>
            <input
                type="number"
                value={count}
                onChange={(e) => handleChangeCount(parseInt(e.target.value))}
            />
            <button onClick={handleRemoveItem}>Remove product from cart</button>
        </div>
    );
};

export default CartItem;
