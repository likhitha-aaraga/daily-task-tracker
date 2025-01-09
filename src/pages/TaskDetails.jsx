import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config/firebase";
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore"; // Import Timestamp

const TaskDetails = () => {
  const { employeeId, taskDate } = useParams(); // Retrieve employeeId and taskDate from URL params
  const [taskDetails, setTaskDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      setLoading(true);
      try {
        // Ensure taskDate is a valid timestamp or convert it if necessary
        

        // Query Firestore for tasks on this date for the given employee
        const taskQuery = query(
          collection(db, "Task_details"),
          where("Employee_id", "==", employeeId),
          where("task_id", "==", taskDate) // Compare date with the Firestore Timestamp
        );

        const querySnapshot = await getDocs(taskQuery);
        const taskList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTaskDetails(taskList);
      } catch (error) {
        console.error("Error fetching task details:", error);
        alert("Failed to fetch task details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTaskDetails();
  }, [employeeId, taskDate]);

  if (loading) {
    return <p>Loading task details...</p>;
  }

  if (taskDetails.length === 0) {
    return <p>No tasks found for this date.</p>;
  }

  return (
    <div>
      <h3>Task Details</h3>
      <table>
        <thead>
          <tr>
            <th>Project</th>
            <th>Task Description</th>
            <th>Status</th>
            <th>date</th>
            <th>due_date</th>
          </tr>
        </thead>
        <tbody>
          {taskDetails.map((task) => (
            <tr key={task.id}>
              <td>{task.project}</td>
              <td>{task.task_description}</td>
              <td>{task.task_status}</td>
              <td>{task.date.toDate().toLocaleDateString()}</td>
              <td>{task.due_date.toDate().toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskDetails;



