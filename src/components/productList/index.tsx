import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import Product from "../product";
import { useNavigate } from "react-router-dom";
import { Item } from "../../types";
import useSortedProducts from "../../hooks/useSortedProducts";
import { getItems } from "../../store/product/productSlice";

const ProductList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const {
        sortedAndFilteredProducts,
        SortingDropdown,
        PriceRangeInput,
        SearchInput,
    } = useSortedProducts("price", "asc", 0, 50000, "");

    useEffect(() => {
        dispatch(getItems());
    }, [dispatch]);

    const handleClick = (item: Item) => {
        navigate(`/products/${item.id}`);
    };

    return (
        <div>
            <h2>Product List</h2>
            {SortingDropdown}
            {PriceRangeInput}
            {SearchInput}
            {sortedAndFilteredProducts.map((item: Item) => (
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
