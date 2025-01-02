import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // Import styles for the date picker
import './EmployeeHomepage.scss';

const EmployeeHomepage = () => {
  const [task, setTask] = useState('Complete project A');
  const [status, setStatus] = useState('In Progress');
  const [taskDetails, setTaskDetails] = useState('');
  const [dueDate, setDueDate] = useState(null); // State to hold the selected date

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleUpdateTask = (e) => {
    e.preventDefault();
    alert(`Task updated to ${status}\nTask Details: ${taskDetails}\nDue Date: ${dueDate}`);
    // API call to update the task status, details, and due date in the backend
  };

  return (
    <div className="employee-homepage">
      <h2>Employee Dashboard</h2>
      <form onSubmit={handleUpdateTask}>
        {/* Task Details Text Area */}
        <div className="form-group">
          <label>Task Details (Write 5-6 sentences):</label>
          <textarea
            value={taskDetails}
            onChange={(e) => setTaskDetails(e.target.value)}
            rows="6" // 6 lines height for better visibility
            placeholder="Describe your progress, challenges, and next steps..."
            required
          />
        </div>
        
        {/* Task Status */}
        <div className="form-group">
          <label>Status:</label>
          <select value={status} onChange={handleStatusChange}>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        {/* Due Date Picker */}
        <div className="form-group">
          <label>Due Date:</label>
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)} // Set the date in state
            dateFormat="MMMM d, yyyy" // Format the date as you like
            showYearPicker // Show year selection
            showMonthDropdown // Show month dropdown
            showPopperArrow={false} // Hide the popper arrow
            placeholderText="Select a due date"
            required
            scrollableMonthYearDropdown // Allow scrolling in the month/year dropdowns
            todayButton="Today" // Add a button to quickly select today's date
          />
        </div>

        {/* Submit Button */}
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default EmployeeHomepage;
