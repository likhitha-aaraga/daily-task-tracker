import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import "../global.scss";

const Header = () => {
    const [user, setUser] = useState(null);
    const [userFullName, setUserFullName] = useState("");

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                try {
                    const userDocRef = doc(db, "users", currentUser.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        setUserFullName(userDoc.data().fullName);
                    } else {
                        console.error("User document not found.");
                    }
                } catch (error) {
                    console.error("Error fetching user full name:", error);
                }
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        const auth = getAuth();

        try {
            await signOut(auth);
            console.log("User logged out successfully");
        } catch (error) {
            console.error("Logout error:", error.message);
        }
    };

    return (
        <div className="navbar">
            <div className="logo">
                <a href="/">
                    <img
                        src="https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/256x256/49f24c94b49d5a415a07384302297cb1"
                        alt="home_pic"
                    />
                </a>
            </div>
            <div className="nav-links">
                <a href="/about">About</a>
                <a href="/employeehomepage">UploadTask</a>
                {user ? (
                    <>
                        <p>Welcome, {userFullName}</p>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <a href="/login">
                        <button>Login</button>
                    </a>
                )}
            </div>
        </div>
    );
};

export default Header;
