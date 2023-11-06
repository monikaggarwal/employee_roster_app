import React, { useState, useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees } from './redux/reducer';
import EmployeeTable from "./Components/EmployeeTable";
import Pagination from "./Components/Pagination";
import EmployeeModal from "./Components/EmployeeModal";

function App() {
  const dispatch = useDispatch();
  const employeeData = useSelector((state) => state.employeeData);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const employeesPerPage = 10;

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

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
    const filtered = employeeData.filter((employee) =>
      employee.empName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setCurrentPage(1);

    dispatch({ type: 'SET_EMPLOYEES', data: filtered });
  };

  const totalPages = Math.ceil((employeeData?.length || 0) / employeesPerPage);

  return (
    <div className="App">
      <h1>Infosys Ltd.</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <EmployeeTable employees={employeeData} currentPage={currentPage} employeesPerPage={employeesPerPage} openModal={openModal} />
      <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
      {isModalOpen && (
        <EmployeeModal employee={selectedEmployee} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;
