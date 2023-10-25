import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [employeeData, setEmployeeData] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetch('/sample-data.json')
    .then(response => {
        if (response.ok) {
          const contentType = response.headers.get('Content-Type');
          
          if (contentType && contentType.includes('application/json')) 
          {
            return response.json();
          } 

          else 
            return response.text();
        }
      })
      .then(data => {
        if (Array.isArray(data)) {
          setEmployeeData(data);
        } else {
          console.error("Data is not an array:", data);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleCloseModal = () => {
    setSelectedEmployee(null);
  };

  return (
    <div className="App">
      <h1>Infosys Ltd.</h1>
      {<table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact No</th>
            <th>Address</th>
            <th>Age</th>
            <th>Job Title</th>
            <th>Date of Joining</th>
            <th>Job Description</th>
          </tr>
        </thead>
        <tbody>
          {employeeData?.map((employee) => (
            <tr key={employee.id}>
              <td onClick={() => handleEmployeeClick(employee)}>
                {employee.name}
              </td>
              <td>{employee.contactNo}</td>
              <td>{employee.address}</td>
              <td>{employee.age}</td>
              <td>{employee.jobTitle}</td>
              <td>{employee.dateOfJoining}</td>
              <td>{employee.jobDescription}</td>
            </tr>
          ))}
        </tbody>
      </table>}
    </div>
  );
}

export default App;