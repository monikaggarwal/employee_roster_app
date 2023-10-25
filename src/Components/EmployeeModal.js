import React from "react";
import "../EmployeeModal.css";

const EmployeeModal = ({ employee, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-icon" onClick={onClose}>
          &times;
        </span>
        <h2>test</h2>
      </div>
    </div>
  );
};

export default EmployeeModal;
