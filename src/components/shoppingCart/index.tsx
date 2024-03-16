import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartItemsSelector } from "../../store/cart/cartSelector";
import CartItem from "../cartItem";
import { AppDispatch } from "../../store";
import { addOrder } from "../../store/order/orderSlice";
import { clearCart } from "../../store/cart/cartSlice";

const ShoppingCart: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const cartItems = useSelector(CartItemsSelector);
    const handleCheckout = () => {
        dispatch(addOrder(cartItems));
        dispatch(clearCart());
        window.alert("Purchase was successful!");
    };

    return (
        <div>
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>There is no items in cart yet</p>
            ) : (
                <>
                    {cartItems.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                    <button onClick={handleCheckout}>Checkout</button>
                </>
            )}
        </div>
    );
};

export default ShoppingCart;
