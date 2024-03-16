import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { removeItem, updateItemCount } from "../../store/cart/cartSlice";
import { Item } from "../../types";

interface ItemProps {
    item: Item;
}

const CartItem: React.FC<ItemProps> = ({ item }) => {
    const dispatch: AppDispatch = useDispatch();
    const [count, setCount] = useState(item.count);

    const handleChangeCount = (newCount: number) => {
        setCount(newCount);
        dispatch(updateItemCount({ id: item.id, count: newCount }));
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
