import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./EmployeeHomepage.scss";
import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const EmployeeHomepage = () => {
    const [taskDetails, setTaskDetails] = useState("");
    const [status, setStatus] = useState("Select Status");
    const [dueDate, setDueDate] = useState(null);

    const handleAddTask = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Input validation
        if (!taskDetails.trim()) {
            alert("Task details cannot be empty");
            return;
        }

        if (status === "Select Status") {
            alert("Please select a valid status");
            return;
        }

        if (!dueDate) {
            alert("Please select a due date");
            return;
        }

        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;

            if (!currentUser) {
                alert("User is not logged in.");
                return;
            }
            await addDoc(collection(db, "tasks"), {
                taskDetails: taskDetails.trim(),
                status: status,
                dueDate: dueDate.toISOString(),
                createdAt: new Date().toISOString(),
                createdBy: currentUser.email,
            });

            setTaskDetails("");
            setStatus("Select Status");
            setDueDate(null);

            alert("Task added successfully!");
        } catch (error) {
            console.error("Error adding task:", error);
            alert("Failed to add task. Please try again.");
        }
    };

    return (
        <div className="employee-homepage">
            <h2>Employee Dashboard</h2>
            <form onSubmit={handleAddTask}>
                {/* Task Details */}
                <div className="form-group">
                    <label htmlFor="taskDetails">Task Details:</label>
                    <textarea
                        id="taskDetails"
                        value={taskDetails}
                        onChange={(e) => setTaskDetails(e.target.value)}
                        rows="6"
                        placeholder="Describe your task progress, challenges, and next steps..."
                        required
                    />
                </div>

                {/* Task Status */}
                <div className="form-group">
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    >
                        <option value="Select Status" disabled>
                            Select Status
                        </option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                    </select>
                </div>

                {/* Due Date Picker */}
                <div className="form-group">
                    <label htmlFor="dueDate">Due Date:</label>
                    <DatePicker
                        id="dueDate"
                        selected={dueDate}
                        onChange={(date) => setDueDate(date)}
                        dateFormat="MMMM d, yyyy"
                        placeholderText="Select a due date"
                        todayButton="Today"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="submit-button">
                    Add Task
                </button>
            </form>
        </div>
    );
};

export default EmployeeHomepage;
