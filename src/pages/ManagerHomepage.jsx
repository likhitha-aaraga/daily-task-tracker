import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";  // Import Link for navigation
import { db } from "../config/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";  // Added deleteDoc and doc for deleting
import deleteIcon from "../assets/delete-icon.png";  // Import the delete icon
import "./ManagerHomepage.scss";

const ManagerHomepage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [employees, setEmployees] = useState("");
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        try {
            const tasksCollection = collection(db, "Employee-details");
            const tasksSnapshot = await getDocs(tasksCollection);
            const tasksData = tasksSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(), 
            }));
            setEmployees(tasksData);
            setFilteredEmployees(tasksData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            alert("Failed to fetch tasks. Please try again.");
        }
    };

    // Function to handle deleting an employee's task
    const handleDelete = async (Employee_id) => {
        try {
            await deleteDoc(doc(db, "Employee-details", Employee_id));  // Delete the document from Firebase
            fetchTasks();  // Re-fetch the tasks after deletion
        } catch (error) {
            console.error("Error deleting employee:", error);
            alert("Failed to delete task. Please try again.");
        }
    };

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredEmployees(employees);
        } else {
            const filtered = employees.filter((employee) =>
                employee.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
            );
            setFilteredEmployees(filtered);
        }
    }, [searchQuery, employees]);

    useEffect(() => {
        fetchTasks();
    }, []);

    if (loading) {
        return <p>Loading tasks...</p>;
    }

    return (
        <div className="manager-homepage">
            <div className="employee-tasks">
                <h3>Employee Details</h3>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by employee Name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Employee Name</th>
                        <th>Employee Status</th>
                        <th>Actions</th> {/* Added Actions column */}
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.length > 0 ? (
                        filteredEmployees.map((employee) => (
                            <tr key={employee.Employee_id}>
                                <td>
                                    <Link to={`/employee-details/${employee.Employee_id}`} className="email-link">
                                        {employee.Employee_id}
                                    </Link>
                                </td>
                                <td>{employee.name}</td>
                                <td
                                    className={
                                        employee.status === "Active"
                                            ? "active-status"
                                            : "inactive-status"
                                    }
                                >
                                    {employee.status}
                                </td>
                                <td>
                                    {/* Edit button */}
                                    <Link to={`/edit-employee/${employee.Employee_id}`}>
                                        <button className="edit-button">Edit</button>
                                    </Link>

                                    {/* Add a slash between Edit and Delete */}
                                    <span> / </span>

                                    {/* Delete icon without button box */}
                                    <img
                                        src={deleteIcon}
                                        alt="Delete"
                                        className="delete-icon"
                                        onClick={() => handleDelete(employee.Employee_id)} // Delete on click
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No employees found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ManagerHomepage;
