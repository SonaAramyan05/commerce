import React, { useState } from "react";
import axios from "axios";
import FormInput from "../formInput";

const SignUpForm: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        imageUrl: "",
        email: "",
        phone: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/users", formData);
            setFormData({
                firstName: "",
                lastName: "",
                imageUrl: "",
                email: "",
                phone: "",
                password: "",
            });
            alert("User signed up successfully!");
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormInput
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
            />
            <FormInput
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
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
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
            />
            <FormInput
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
            />
            <FormInput
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
            />
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignUpForm;