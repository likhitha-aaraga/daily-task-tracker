import React, { useEffect, useState } from "react";
import {
    collection,
    query,
    where,
    orderBy,
    getDocs,
    Timestamp,
    doc,
    updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { getAuth } from "firebase/auth";
import "./mytasks.scss";

const MyTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [editDetails, setEditDetails] = useState({
        taskDetails: "",
        status: "",
        dueDate: "",
        project: "",
    });

    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);
            setError(null);

            try {
                const auth = getAuth();
                const currentUser = auth.currentUser;

                if (!currentUser) {
                    setError("User is not logged in.");
                    setLoading(false);
                    return;
                }

                const sevenDaysAgo = Timestamp.fromDate(
                    new Date(new Date().setDate(new Date().getDate() - 7))
                );

                const tasksCollection = collection(db, "tasks");
                const q = query(
                    tasksCollection,
                    where("createdBy", "==", currentUser.email),
                    where("createdAt", ">=", sevenDaysAgo),
                    orderBy("createdAt", "desc")
                );

                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    setTasks([]);
                } else {
                    const tasksData = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                        project: doc.data().project || "Unknown",
                    }));
                    setTasks(tasksData);
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
                setError("Failed to fetch tasks. Please try again.");
            }

            setLoading(false);
        };

        fetchTasks();
    }, []);

    const isEditable = (status) => {
        return status === "In Progress";
    };

    const handleEdit = (task) => {
        setSelectedTask(task);
        setEditDetails({
            taskDetails: task.taskDetails,
            status: task.status,
            dueDate: new Date(task.dueDate).toISOString().split("T")[0],
            project: task.project || "Unknown",
        });
    };

    const handleSave = async () => {
        if (!editDetails.project) {
            alert("Please select a valid project.");
            return;
        }

        try {
            const taskRef = doc(db, "tasks", selectedTask.id);
            await updateDoc(taskRef, {
                taskDetails: editDetails.taskDetails,
                status: editDetails.status,
                dueDate: editDetails.dueDate,
                project: editDetails.project,
            });

            alert("Task updated successfully!");
            setSelectedTask(null);

            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === selectedTask.id
                        ? { ...task, ...editDetails }
                        : task
                )
            );
        } catch (error) {
            console.error("Error updating task:", error);
            alert("Failed to update task.");
        }
    };

    const handleCancel = () => {
        setSelectedTask(null);
    };

    return (
        <div className="mytasks-container">
            <h2>My Tasks (Last 7 Days)</h2>
            {loading && <p>Loading tasks...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && tasks.length === 0 && (
                <p>No tasks found in the last 7 days.</p>
            )}
            {!loading && tasks.length > 0 && (
                <table className="tasks-table">
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Status</th>
                            <th>Project</th>
                            <th>Due Date</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <tr key={task.id}>
                                <td>{task.taskDetails}</td>
                                <td>{task.status}</td>
                                <td>{task.project}</td>
                                <td>
                                    {new Date(
                                        task.dueDate
                                    ).toLocaleDateString()}
                                </td>
                                <td>
                                    {new Date(
                                        task.createdAt.seconds * 1000
                                    ).toLocaleString()}
                                </td>
                                <td>
                                    <button
                                        className={
                                            isEditable(task.status)
                                                ? "edit-button"
                                                : "edit-button disabled"
                                        }
                                        disabled={!isEditable(task.status)}
                                        onClick={() => handleEdit(task)}
                                    >
                                        {isEditable(task.status)
                                            ? "Edit"
                                            : "Edit"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {selectedTask && (
                <div className="edit-task-form">
                    <h3>Edit Task</h3>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSave();
                        }}
                    >
                        <div>
                            <label>Task Details:</label>
                            <textarea
                                value={editDetails.taskDetails}
                                onChange={(e) =>
                                    setEditDetails((prev) => ({
                                        ...prev,
                                        taskDetails: e.target.value,
                                    }))
                                }
                                required
                            />
                        </div>
                        <div>
                            <label>Status:</label>
                            <select
                                value={editDetails.status}
                                onChange={(e) =>
                                    setEditDetails((prev) => ({
                                        ...prev,
                                        status: e.target.value,
                                    }))
                                }
                                required
                            >
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                        <div>
                            <label>Project:</label>
                            <select
                                value={editDetails.project}
                                onChange={(e) =>
                                    setEditDetails((prev) => ({
                                        ...prev,
                                        project: e.target.value,
                                    }))
                                }
                                required
                            >
                                <option value="SNR">SNR</option>
                                <option value="Unity">Unity</option>
                                <option value="Heartbeat">Heartbeat</option>
                            </select>
                        </div>
                        <div>
                            <label>Due Date:</label>
                            <input
                                type="date"
                                value={editDetails.dueDate}
                                onChange={(e) =>
                                    setEditDetails((prev) => ({
                                        ...prev,
                                        dueDate: e.target.value,
                                    }))
                                }
                                required
                            />
                        </div>
                        <button type="submit">Save</button>
                        <button type="button" onClick={handleCancel}>
                            Cancel
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default MyTasks;
