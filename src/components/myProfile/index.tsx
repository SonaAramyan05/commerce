import React from "react";
import { useSelector } from "react-redux";
import { User } from "../../types";
import { currentUserSelector } from "../../store/user/userSelector";
import { Link } from "react-router-dom";

const MyProfile: React.FC = () => {
    const currentUser: User | null = useSelector(currentUserSelector);

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
            <Link to={"/edit-profile"}><button>EDIT PROFILE</button></Link>
        </div>
    );
};

export default MyProfile;
