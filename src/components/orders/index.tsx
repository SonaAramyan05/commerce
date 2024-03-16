import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../../store/order/orderSlice";
import { AppDispatch } from "../../store";
import { orderListSelector } from "../../store/order/orderSelector";

const Orders: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const orders = useSelector(orderListSelector);

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    return (
        <div>
            <h2>Orders</h2>
            <ul>
                {orders.map((order) => (
                    <li key={order.id}>
                        <p>Date: {order.date}</p>
                        <ul>
                            {order.items.map((item) => (
                                <li key={item.id}>
                                    {item.title} - Count: {item.count}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Orders;
