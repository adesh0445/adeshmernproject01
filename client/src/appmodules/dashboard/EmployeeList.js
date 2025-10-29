import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

export function Employeelist() {
  const [Employees, setEmployees] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  // ✅ Backend URL (Automatic detect - Render or Local)
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:9800/api";

  // ✅ Employee Data Fetch
  const WorkersApi = async () => {
    try {
      const res = await axios.get(`${API_URL}/Employees`);
      if (res.data.status === 251) {
        setEmployees(res.data.AllEmployees);
      } else {
        console.warn("Unexpected response:", res.data);
      }
    } catch (error) {
      console.error("❌ Error fetching employees:", error.message);
    }
  };

  useEffect(() => {
    WorkersApi();
  }, []);

  // ✅ Search input handler
  const inputChange = (event) => setSearchInput(event.target.value);

  // ✅ Filter employees (case-insensitive)
  const filteredEmployees = Employees.filter((emp) =>
    searchInput.trim() === ""
      ? true
      : emp.fullName?.toLowerCase().includes(searchInput.toLowerCase())
  );

  // ✅ Edit handler
  const handleEdit = (id) => navigate(`/dashboard/edit/${id}`);

  // ✅ Delete handler
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this employee?")) {
      try {
        const res = await axios.delete(`${API_URL}/Employees/${id}`);
        if (res.data.status === 250) {
          alert(res.data.message || "Employee deleted successfully");
          WorkersApi();
        } else {
          alert("Failed to delete employee");
        }
      } catch (error) {
        console.error("❌ Delete error:", error.message);
        alert("Error deleting employee");
      }
    }
  };

  return (
    <Fragment>
      <div className="container mt-3 text-center">
        <h3>Employee List</h3>

        {/* 🔍 Search bar */}
        <div className="col-md-12 content-center mb-3">
          <div>
            <input
              type="text"
              placeholder="Search by name..."
              onChange={inputChange}
              value={searchInput}
              className="form-control d-inline-block w-50"
            />
            <button className="btn btn-success m-2" onClick={WorkersApi}>
              Refresh
            </button>
          </div>
        </div>

        {/* 🧾 Employee Table */}
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp, i) => (
                <tr key={emp._id || i}>
                  <td>{emp.fullName}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.email}</td>
                  <td>{emp.gender}</td>
                  <td>
                    <button
                      className="btn btn-warning me-2"
                      onClick={() => handleEdit(emp._id)}
                    >
                      <FaEdit />
                    </button>
                    <button className="btn btn-info me-2">
                      <FaEye />
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(emp._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No employee found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}
