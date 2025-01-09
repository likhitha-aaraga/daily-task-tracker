import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Login from "./pages/Login";

import ManagerHomepage from "./pages/ManagerHomepage";
import EmployeeDetails from "./pages/EmployeeDetails"; // Import EmployeeDetails page
import EditEmployee from "./pages/EditEmployee"; // Import EditEmployee page
import TaskDetails from "./pages/TaskDetails"; // Import TaskDetails page
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
                <Route path="/" element={<ManagerHomepage />} />
                <Route
                    path="/login"
                    element={user ? <Navigate to="/" /> : <Login />}
                />
                <Route path="/managerhomepage" element={<ManagerHomepage />} />
                <Route path="/employee-details/:id" element={<EmployeeDetails />} />
                <Route path="/edit-employee/:id" element={<EditEmployee />} />
                <Route
                    path="/employee/:employeeId/tasks/:taskDate"
                    element={<TaskDetails />}
                />
            </Routes>
        </Router>
    );
};

export default AppRouter;
