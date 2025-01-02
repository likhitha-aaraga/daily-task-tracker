import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import "./ManagerHomepage.scss";

const ManagerHomepage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [employees, setEmployees] = useState("");
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        try {
            const tasksCollection = collection(db, "tasks"); // Reference to "tasks" collection
            const tasksSnapshot = await getDocs(tasksCollection); // Fetch all documents
            const tasksData = tasksSnapshot.docs.map((doc) => ({
                id: doc.id, // Include document ID
                ...doc.data(), // Spread the document data
            }));
            setEmployees(tasksData);
            setFilteredEmployees(tasksData); // Update state with fetched data
            setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
            console.error("Error fetching tasks:", error);
            alert("Failed to fetch tasks. Please try again.");
        }
    };
    console.log(filteredEmployees);
    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredEmployees(employees); // Show all employees if search query is empty
        } else {
            const filtered = employees.filter((employee) =>
                employee.createdBy
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
            );
            setFilteredEmployees(filtered); // Set filtered employees
        }
    }, [searchQuery, employees]);

    useEffect(() => {
        fetchTasks();
    }, []);

    // Render loading state
    if (loading) {
        return <p>Loading tasks...</p>;
    }

    return (
        <div className="manager-homepage">
            <header>
                <h2>Manager Dashboard</h2>
            </header>

            <div className="employee-tasks">
                {/* Flex container to align Employee Tasks and Search bar in the same line */}
                <div className="tasks-header">
                    <h3>Employee Tasks</h3>
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search by employee name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Employee Name</th>
                            <th>Task</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.length > 0 ? (
                            filteredEmployees.map((employee, index) => (
                                <tr key={index}>
                                    <td>{employee.createdBy}</td>
                                    <td>{employee.taskDetails}</td>
                                    <td
                                        className={
                                            employee.status === "Completed"
                                                ? "completed"
                                                : "in-progress"
                                        }
                                    >
                                        {employee.status}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">No employees found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManagerHomepage;
