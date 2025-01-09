import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyTasks from "./pages/MyTasks";
import Unity from "./pages/Unity";
import SNR from "./pages/SNR";
import Heartbeat from "./pages/Heartbeat";
import EmployeeHomepage from "./pages/EmployeeHomepage";
import ManagerHomepage from "./pages/ManagerHomepage";
import MyProfile from "./pages/MyProfile";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AppRouter = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/about" element={<About />} />
                <Route path="/mytasks" element={<MyTasks />} />
                <Route
                    path="/login"
                    element={user ? <Navigate to="/" /> : <Login />}
                />
                <Route path="/register" element={<Register />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/unity" element={<Unity />} />
                <Route path="/SNR" element={<SNR />} />
                <Route path="/heartbeat" element={<Heartbeat />} />
                <Route path="/myprofile" element={<MyProfile />} />
                <Route path="/managerhomepage" element={<ManagerHomepage />} />
                <Route
                    path="/employeehomepage"
                    element={<EmployeeHomepage />}
                />
            </Routes>
        </Router>
    );
};

export default AppRouter;
