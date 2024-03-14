import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUserSelector } from "../../store/user/userSelector";
import FormInput from "../formInput";
import { User } from "../../types";
import { AppDispatch } from "../../store";
import { updateUserInDB } from "../../store/user/userSlice";

const EditProfile: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const currentUser = useSelector(currentUserSelector);
    const [formData, setFormData] = useState<User | null>(currentUser);

    useEffect(() => {
        setFormData(currentUser);
    }, [currentUser]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...(prevFormData as User),
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            formData && dispatch(updateUserInDB(formData));
            alert("User data updated successfully!");
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormInput
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData!.firstName}
                onChange={handleChange}
            />
            <FormInput
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData!.lastName}
                onChange={handleChange}
            />
            <FormInput
                type="text"
                name="imageUrl"
                placeholder="Image URL"
                value={formData!.imageUrl}
                onChange={handleChange}
            />
            <FormInput
                type="email"
                name="email"
                placeholder="Email"
                value={formData!.email}
                onChange={handleChange}
            />
            <FormInput
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData!.phone}
                onChange={handleChange}
            />
            <FormInput
                type="password"
                name="password"
                placeholder="Password"
                value={formData!.password}
                onChange={handleChange}
            />
            <button type="submit">Save Changes</button>
        </form>
    );
};

export default EditProfile;
