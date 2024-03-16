import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateUserInDB } from "../../store/user/userSlice";
import { User } from "../../types";
import { AppDispatch } from "../../store";
import FormInput from "../formInput";

interface FormData {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    imageUrl?: string;
}

const EditProfile: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [formData, setFormData] = useState<FormData>({});

    useEffect(() => {
        const userData = localStorage.getItem("currentUser");
        if (userData) {
            setCurrentUser(JSON.parse(userData));
            setFormData(JSON.parse(userData)); // Set initial formData to currentUser data
        }
    }, []);

    const handleChange = (name: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const storedUserData = localStorage.getItem("currentUser");
        const currentUserData = storedUserData
            ? JSON.parse(storedUserData)
            : null;
        const updatedUserData = {
            ...currentUserData,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            imageUrl: formData.imageUrl,
        };
        dispatch(updateUserInDB(updatedUserData));
        localStorage.setItem("currentUser", JSON.stringify(updatedUserData));
        setCurrentUser(updatedUserData);
        alert("User data updated successfully!");
    };

    return (
        <div>
            <h2>Edit Profile</h2>
            {currentUser && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="firstName">First Name:</label>
                        <FormInput
                            type="text"
                            name="firstName"
                            placeholder="Enter your first name"
                            value={
                                formData.firstName ??
                                currentUser.firstName ??
                                ""
                            }
                            onChange={(e) =>
                                handleChange("firstName", e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name:</label>
                        <FormInput
                            type="text"
                            name="lastName"
                            placeholder="Enter your last name"
                            value={
                                formData.lastName ?? currentUser.lastName ?? ""
                            }
                            onChange={(e) =>
                                handleChange("lastName", e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <FormInput
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email ?? currentUser.email ?? ""}
                            onChange={(e) =>
                                handleChange("email", e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone:</label>
                        <FormInput
                            type="text"
                            name="phone"
                            placeholder="Enter your phone number"
                            value={formData.phone ?? currentUser.phone ?? ""}
                            onChange={(e) =>
                                handleChange("phone", e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <label htmlFor="imageUrl">Profile Image URL:</label>
                        <FormInput
                            type="text"
                            name="imageUrl"
                            placeholder="Enter your profile image URL"
                            value={
                                formData.imageUrl ?? currentUser.imageUrl ?? ""
                            }
                            onChange={(e) =>
                                handleChange("imageUrl", e.target.value)
                            }
                        />
                    </div>
                    <button type="submit">Save Changes</button>
                </form>
            )}
            <Link to={"/my-profile"}>
                <button>Back to My Profile</button>
            </Link>
        </div>
    );
};

export default EditProfile;
