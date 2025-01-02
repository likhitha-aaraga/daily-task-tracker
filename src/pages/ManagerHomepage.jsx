import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManagerHomepage.scss';

const ManagerHomepage = () => {
  const navigate = useNavigate();

  // Sample employee data
  const [employees] = useState([
    { name: 'John Doe', task: 'Complete project A', status: 'In Progress' },
    { name: 'Jane Smith', task: 'Write report B', status: 'Completed' },
    { name: 'Alex Johnson', task: 'Design new feature', status: 'In Progress' },
    { name: 'Emily Davis', task: 'Fix bug in module X', status: 'Completed' },
    { name: 'Michael Brown', task: 'Research for new project', status: 'Pending' },
  ]);

  // State for search input
  const [searchQuery, setSearchQuery] = useState('');

  // Function to filter employees based on the search query
  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle logout
  const handleLogout = () => {
    navigate('/login'); // Redirect to login page
  };

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
                  <td>{employee.name}</td>
                  <td>{employee.task}</td>
                  <td className={employee.status === 'Completed' ? 'completed' : 'in-progress'}>
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
