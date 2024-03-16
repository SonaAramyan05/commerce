import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FormInput from "../formInput";
import { Item } from "../../types";
import { addItem } from "../../store/product/productSlice";
import { AppDispatch } from "../../store";

const AddProduct: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const [formData, setFormData] = useState<Item>({
        id: "",
        title: "",
        description: "",
        imageUrl: "",
        count: 0,
        price: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            dispatch(addItem(formData));
            alert("Product added successfully!");
            setFormData({
                id: "", 
                title: "",
                description: "",
                imageUrl: "",
                count: 0,
                price: 0,
            });
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormInput
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
            />
            <FormInput
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
            />
            <FormInput
                type="text"
                name="imageUrl"
                placeholder="Image URL"
                value={formData.imageUrl}
                onChange={handleChange}
            />
            <FormInput
                type="number"
                name="count"
                placeholder="Count"
                value={formData.count.toString()}
                onChange={handleChange}
            />
            <FormInput
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price.toString()}
                onChange={handleChange}
            />
            <button type="submit">Add Product</button>
        </form>
    );
};

export default AddProduct;
