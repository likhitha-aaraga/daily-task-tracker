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

const MyTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [editDetails, setEditDetails] = useState({
        taskDetails: "",
        status: "",
        dueDate: "",
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

    const isEditable = (createdAt) => {
        const createdDate = new Date(createdAt.seconds * 1000).toDateString();
        const todayDate = new Date().toDateString();
        return createdDate === todayDate;
    };

    const handleEdit = (task) => {
        setSelectedTask(task);
        setEditDetails({
            taskDetails: task.taskDetails,
            status: task.status,
            dueDate: new Date(task.dueDate).toISOString().split("T")[0],
        });
    };

    const handleSave = async () => {
        try {
            const taskRef = doc(db, "tasks", selectedTask.id);
            await updateDoc(taskRef, {
                taskDetails: editDetails.taskDetails,
                status: editDetails.status,
                dueDate: editDetails.dueDate,
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
        <div>
            <h2>My Tasks (Last 7 Days)</h2>
            {loading && <p>Loading tasks...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && tasks.length === 0 && (
                <p>No tasks found in the last 7 days.</p>
            )}
            <ul>
                {tasks.map((task) => (
                    <li key={task.id} style={{ marginBottom: "15px" }}>
                        <strong>Task:</strong> {task.taskDetails} <br />
                        <strong>Status:</strong> {task.status} <br />
                        <strong>Due Date:</strong>{" "}
                        {new Date(task.dueDate).toLocaleDateString()} <br />
                        <strong>Created At:</strong>{" "}
                        {new Date(
                            task.createdAt.seconds * 1000
                        ).toLocaleString()}{" "}
                        <br />
                        <button
                            disabled={!isEditable(task.createdAt)}
                            onClick={() => handleEdit(task)}
                        >
                            {isEditable(task.createdAt)
                                ? "Edit"
                                : "Edit Disabled"}
                        </button>
                    </li>
                ))}
            </ul>

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
