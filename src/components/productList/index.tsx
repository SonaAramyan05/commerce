import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Item } from "../../types";
import { getItems } from "../../store/product/productSlice";
import { AppDispatch } from "../../store";
import ProductDetails from "../productDetails";
import Product from "../product";
import { itemsSelector } from "../../store/product/productSelector";
import { CartItemsSelector } from "../../store/cart/cartSelector";

const ProductList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const items = useSelector(itemsSelector);
    const cartItems = useSelector(CartItemsSelector);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    useEffect(() => {
        dispatch(getItems());
    }, [cartItems]);

    const handleClick = (item: Item) => {
        setSelectedItem(item);
    };

    return (
        <div>
            <h2>Product List</h2>
            {selectedItem ? (
                <ProductDetails
                    item={selectedItem}
                    isDisabled={selectedItem.count <= 0}
                />
            ) : (
                items.map((item: Item) => (
                    <Product
                        key={item.id}
                        item={item}
                        onClick={() => handleClick(item)}
                        isDisabled={item.count <= 0}
                    />
                ))
            )}
        </div>
    );
};

export default ProductList;
