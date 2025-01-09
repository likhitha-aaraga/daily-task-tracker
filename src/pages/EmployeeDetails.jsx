import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { doc, getDoc, collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useParams, Link } from "react-router-dom";

const EmployeeDetails = () => {
    const [employee, setEmployee] = useState(null);
    const [tasks, setTasks] = useState([]); // State for storing task details
    const [loading, setLoading] = useState(true);
    const { id } = useParams(); // Retrieve the employee ID from URL params

    const fetchDetails = async () => {
        setLoading(true);
        try {
            const employeePromise = getDoc(doc(db, "Employee-details", id)); // Fetch employee
            const tasksPromise = getDocs(query(
                collection(db, "Task_details"),
                where("Employee_id", "==", id),
                orderBy("date", "desc")
            ));

            const [employeeSnap, taskSnap] = await Promise.all([employeePromise, tasksPromise]);

            if (employeeSnap.exists()) {
                setEmployee(employeeSnap.data());
            } else {
                alert("Employee not found.");
            }

            if (!taskSnap.empty) {
                let taskList = taskSnap.docs.map(doc => doc.data());

                // Get the date for 7 days ago
                const today = new Date();
                const sevenDaysAgo = new Date(today.setDate(today.getDate() - 7));

                // Filter tasks
                taskList = taskList.filter(task => {
                    if (task.task_status === "Inprogress") {
                        return true; // Show all "In Progress" tasks
                    } else if (task.task_status === "Completed") {
                        // Show "Completed" tasks only if they are within the past 7 days
                        const taskDate = new Date(task.date.seconds * 1000);
                        return taskDate >= sevenDaysAgo;
                    }
                    return false; // If status is neither "In Progress" nor "Completed", don't display it
                });

                setTasks(taskList);
            } else {
                setTasks([]);
            }
        } catch (error) {
            console.error("Error fetching details:", error);
            alert("Failed to fetch details. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetails(); // Fetch employee and task data when the component mounts
    }, [id]);

    // Function to determine the status class based on task status
    const getStatusClass = (status) => {
        if (status === "Completed") {
            return "completed-status";
        } else if (status === "In Progress") {
            return "in-progress-status";
        }
        return "";
    };

    const formatDate = (date) => {
        const d = new Date(date.seconds * 1000);  // Convert Firebase timestamp to JavaScript Date object
        const month = (d.getMonth() + 1).toString().padStart(2, "0");  // Get month and ensure 2 digits (e.g., 01, 02, ... 12)
        const day = d.getDate().toString().padStart(2, "0");  // Get day and ensure 2 digits
        const year = d.getFullYear();  // Get full year
    
        return `${month}-${day}-${year}`;  // Return in mm-dd-yyyy format
    };

    if (loading) {
        return <p>Loading employee details...</p>;
    }

    if (!employee) {
        return <p>No employee data found</p>;
    }

    return (
        <div className="employee-details">
            <h2>Employee Details</h2>
            <div className="employee-info">
                <div className="employee-info-row">
                    <p><strong>Employee Name:</strong> {employee.name}</p>
                    <p><strong>Employee Id:</strong> {employee.Employee_id}</p>
                </div>
                <div className="employee-info-row">
                    <p><strong>Role:</strong> {employee.Role}</p>
                    <p><strong>Status:</strong> 
                        <span className={employee.status === "Active" ? "active-status" : "inactive-status"}>
                            {employee.status}
                        </span>
                    </p>
                </div>
                <div className="employee-info-row">
                    <p><strong>Phone Number:</strong> {employee.Phone_Number}</p>
                    <p><strong>Email Id:</strong> {employee.Email_id}</p>
                </div>
            </div> 
            <div>
                <h3>Task Information</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Project</th>
                            <th>Task Description</th>
                            <th>Task Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.length > 0 ? (
                            tasks.map((task, index) => (
                                <tr key={index} className={getStatusClass(task.task_status)}>
                                    <td>
                                        <Link
                                            to={`/employee/${id}/tasks/${task.task_id}`}
                                            className="task-date-link"
                                            title={`View task details for ${task.task_id}`}
                                        >
                                            {formatDate(task.date)}
                                        </Link>
                                    </td>
                                    <td>{task.project}</td>
                                    <td>{task.task_description}</td>
                                    <td>{task.task_status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No tasks assigned</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            {/* Back to Manager Dashboard Button */}
            <div className="back-button-container">
                <Link to="/managerhomepage">
                    <button className="back-button">Back</button>
                </Link>
            </div>
        </div>
    );
};

export default EmployeeDetails;
