import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import "./Myprofile.scss";

const MyProfile = () => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfileData = async () => {
            setLoading(true);
            setError("");

            try {
                const auth = getAuth();
                const currentUser = auth.currentUser;

                if (!currentUser) {
                    setError("User is not logged in.");
                    setLoading(false);
                    return;
                }
                const userRef = doc(db, "users", currentUser.uid);
                const userSnapshot = await getDoc(userRef);

                if (userSnapshot.exists()) {
                    setProfileData(userSnapshot.data());
                } else {
                    setError("User profile not found.");
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
                setError("Failed to fetch user profile. Please try again.");
            }

            setLoading(false);
        };

        fetchProfileData();
    }, []);

    if (loading) {
        return <p>Loading profile...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    if (!profileData) {
        return null;
    }

    return (
        <div className="profile-container">
            <h2>My Profile</h2>
            <div className="profile-details">
                <p>
                    <strong>Full Name:</strong> {profileData.fullName}
                </p>
                <p>
                    <strong>Email:</strong> {profileData.email}
                </p>
                <p>
                    <strong>Mobile Number:</strong> {profileData.mobile}
                </p>
                <p>
                    <strong>Role:</strong> {profileData.role}
                </p>
                <p>
                    <strong>Registered At:</strong>{" "}
                    {new Date(profileData.createdAt).toLocaleString()}
                </p>
            </div>
        </div>
    );
};

export default MyProfile;
