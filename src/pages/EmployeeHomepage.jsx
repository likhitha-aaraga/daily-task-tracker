import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./EmployeeHomepage.scss";
import { db } from "../config/firebase";
import {
    collection,
    addDoc,
    serverTimestamp,
    getDoc,
    doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const EmployeeHomepage = () => {
    const [taskDetails, setTaskDetails] = useState("");
    const [status, setStatus] = useState("Select Status");
    const [dueDate, setDueDate] = useState(null);
    const [project, setProject] = useState("Select Project");

    const handleAddTask = async (e) => {
        e.preventDefault();

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

            const userRef = doc(db, "users", currentUser.uid);
            const userDoc = await getDoc(userRef);

            if (!userDoc.exists()) {
                alert("User information not found.");
                return;
            }

            const employeeId = userDoc.data().employeeId;

            const taskId = Math.floor(1000 + Math.random() * 9000).toString();

            await addDoc(collection(db, "tasks"), {
                taskDetails: taskDetails.trim(),
                status: status,
                project: project,
                dueDate: dueDate.toISOString(),
                createdAt: serverTimestamp(),
                createdBy: currentUser.email,
                employee_id: employeeId,
                task_id: taskId,
            });

            setTaskDetails("");
            setStatus("Select Status");
            setProject("Select Project");
            setDueDate(null);

            alert("Task added successfully!");
        } catch (error) {
            console.error("Error adding task:", error);
            alert("Failed to add task. Please try again.");
        }
    };

    return (
        <div className="employee-homepage">
            <h2>Adding a Task</h2>
            <form onSubmit={handleAddTask}>
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
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="project">Project:</label>
                    <select
                        id="project"
                        value={project}
                        onChange={(e) => setProject(e.target.value)}
                        required
                    >
                        <option value="Select Project" disabled>
                            Select Project
                        </option>
                        <option value="SNR">SNR</option>
                        <option value="Unity">Unity</option>
                        <option value="Heartbeat">Heartbeat</option>
                    </select>
                </div>

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

                <button type="submit" className="submit-button">
                    Add Task
                </button>
            </form>
        </div>
    );
};

export default EmployeeHomepage;
