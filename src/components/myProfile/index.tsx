import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../types";

const MyProfile: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const userData = localStorage.getItem("currentUser");
        if (userData) {
            setCurrentUser(JSON.parse(userData));
        }
    }, []);

    return (
        <div>
            <h2>My Profile</h2>
            {currentUser && (
                <div>
                    {currentUser.imageUrl && (
                        <img
                            src={currentUser.imageUrl}
                            alt="Profile"
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: "50%",
                            }}
                        />
                    )}
                    <p>
                        Full Name: {currentUser.firstName}{" "}
                        {currentUser.lastName}
                    </p>
                    <p>Email: {currentUser.email}</p>
                    <p>Phone: {currentUser.phone}</p>
                </div>
            )}
            <Link to={"/edit-profile"}>
                <button>EDIT PROFILE</button>
            </Link>
        </div>
    );
};

export default MyProfile;
