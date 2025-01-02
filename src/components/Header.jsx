import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import "../global.scss";

const Header = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
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
                <a href="/contact">Contact</a>
                <a href="/managerhomepage">Manger Dashboard</a>
                <a href="/employeehomepage">Employee Dashboard</a>
                {user ? (
                    <>
                        <p>Welcome, {user.email}</p>

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
