import React, { useEffect, useState, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  // ✅ API Base URL (Render or Local)
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:9800/api";

  // ✅ Fetch single employee by ID
  useEffect(() => {
    axios
      .get(`${API_URL}/Employees/${id}`)
      .then((res) => {
        if (res.data) {
          setFullName(res.data.fullName || "");
          setPhone(res.data.phone || "");
          setEmail(res.data.email || "");
          setGender(res.data.gender || "");
        }
      })
      .catch((err) => {
        console.error("❌ Error fetching employee:", err.message);
        alert("Failed to load employee data");
      });
  }, [id]);

  // ✅ Update employee details
  const handleUpdate = () => {
    const employee = { fullName, phone, email, gender };

    axios
      .put(`${API_URL}/updateworker/${id}`, employee)
      .then((res) => {
        alert(res.data.message || "Employee updated successfully ✅");
        navigate("/dashboard/Employeelist");
      })
      .catch((err) => {
        console.error("❌ Update failed:", err.message);
        alert("Error updating employee");
      });
  };

  return (
    <Fragment>
      <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
        <div className="card card-size p-4 shadow-lg border-0 rounded-3" style={{ maxWidth: "400px", width: "100%" }}>
          <h3 className="text-center mb-4">Edit Employee</h3>

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="form-control mb-3"
          />

          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-control mb-3"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control mb-3"
          />

          <div className="p-2 mb-3 text-start">
            <label className="me-2 fw-bold">Gender:</label>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="male"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="male" className="form-check-label">
                Male
              </label>
            </div>

            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="female"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="female" className="form-check-label">
                Female
              </label>
            </div>
          </div>

          <button onClick={handleUpdate} className="btn btn-success w-100 mb-2">
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => navigate("/dashboard/Employeelist")}
            className="btn btn-secondary w-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </Fragment>
  );
}
