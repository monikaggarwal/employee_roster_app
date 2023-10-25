import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [employeeData, setEmployeeData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 10;

  useEffect(() => {
    fetch("/sample-data.json")
      .then((response) => {
        if (response.ok) {
          const contentType = response.headers.get("Content-Type");

          if (contentType && contentType.includes("application/json")) {
            return response.json();
          } else return response.text();
        }
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setEmployeeData(data);
        } else {
          console.error("Data is not an array:", data);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPaginatedEmployees = () => {
    if (employeeData && employeeData.length > 0) {
      const startIndex = (currentPage - 1) * employeesPerPage;
      const endIndex = startIndex + employeesPerPage;
      return employeeData.slice(startIndex, endIndex);
    } else {
      return [];
    }
  };

  return (
    <div className="App">
      <h1>Infosys Ltd.</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Contact No</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {getPaginatedEmployees().map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.contactNo}</td>
              <td>{employee.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil((employeeData?.length || 0) / employeesPerPage)}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage * employeesPerPage >= (employeeData?.length || 0)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
