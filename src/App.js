import React, { useState, useEffect } from "react";
import "./App.css";
import EmployeeModal from "./Components/EmployeeModal";

function App() {
  const [employeeData, setEmployeeData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
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

  const openModal = (employee) => {
    setIsModalOpen(true);
    setSelectedEmployee(employee);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleSearch = () => {
    console.log("Search Query: ", searchQuery);
  };

  const filteredEmployees = () => {
    return (
      employeeData &&
      employeeData.filter((employee) =>
        employee.empName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  const paginatedEmployees = () => {
    if (filteredEmployees() && filteredEmployees().length > 0) {
      const startIndex = (currentPage - 1) * employeesPerPage;
      const endIndex = startIndex + employeesPerPage;
      return filteredEmployees().slice(startIndex, endIndex);
    } else {
      return [];
    }
  };

  return (
    <div className="App">
      <h1>
        Infosys Ltd.
      </h1>
      <div className="search-container">
          <input
            type="text"
            placeholder=""
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button> 
        </div>
      <table class="rosterTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Contact No</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {paginatedEmployees() &&
            paginatedEmployees().map((employee) => (
              <tr key={employee.id} onClick={() => openModal(employee)}>
                <td>{employee.id}</td>
                <td>
                  <img
                    src={"/" + employee.empPhoto}
                    alt={employee.empName}
                    height="30"
                    width="30"
                  />
                  {employee.empName}
                </td>
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
          Page {currentPage} of{" "}
          {Math.ceil((filteredEmployees()?.length || 0) / employeesPerPage)}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={
            currentPage * employeesPerPage >=
            (filteredEmployees()?.length || 0)
          }
        >
          Next
        </button>
      </div>
      {isModalOpen && (
        <EmployeeModal employee={selectedEmployee} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;
