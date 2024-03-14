import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { isSignedInSelector } from "../../store/signIn/signInSelector";
import { signinUser } from "../../store/signIn/signInSlice";
import { setCurrentUser } from "../../store/user/userSlice";

const SignIn: FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const isLoggedIn = useSelector(isSignedInSelector);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { email, password } = formData;
        const actionResult = await dispatch(signinUser({ email, password }));
        if (isLoggedIn) {
            dispatch(setCurrentUser(actionResult.payload));
            navigate("/my-profile");
        }
    };

    const handleSignUpClick = () => {
        navigate("/sign-up");
    };

    return (
        <div>
            <h2>Sign In</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">email:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Sign In</button>
                <button onClick={handleSignUpClick}>Sign Up</button>
            </form>
        </div>
    );
};

export default SignIn;
