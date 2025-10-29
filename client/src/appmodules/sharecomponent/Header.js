import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [searchInput, setSearchInput] = useState("");
  const [showText, setShowText] = useState([]);
  const navigate = useNavigate();

  const pages = [
    { name: "Homepage", path: "/dashboard/Homepage" },
    { name: "Landingpage", path: "/dashboard/Landing" },
    { name: "Employeelist", path: "/dashboard/Employeelist" },
    { name: "AddEmployee", path: "/dashboard/AddEmployee" },
    { name: "EditEmployee", path: "/dashboard/edit/1" },
    { name: "Reactchart", path: "/dashboard/Chart" },
  ];

  // Input change → update search & filter suggestions
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);

    const filterData = pages.filter((page) =>
      page.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setShowText(filterData);
  };

  // Enter key navigation
  const handleKeyUp = (event) => {
    if (event.key === "Enter" && showText.length > 0) {
      navigate(showText[0].path);
      setSearchInput("");
      setShowText([]);
    }
  };

  // Click on suggestion
  const handleSelect = (path) => {
    navigate(path);
    setSearchInput("");
    setShowText([]);
  };

  // Logout button
  const handleLogout = () => {
    navigate("/Login");
  };

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg bg-body-tertiary mt-0 header fixed">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/">Adesh</Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active">Home</Link>
              </li>
            </ul>

            <div className="d-flex position-relative me-3">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search pages..."
                value={searchInput}
                onChange={handleInputChange}
                onKeyUp={handleKeyUp}
              />

              {showText.length > 0 ? (
                <ul
                  className="dropdown-menu show position-absolute"
                  style={{ top: "100%", width: "100%", maxHeight: "200px", overflowY: "auto" }}
                >
                  {showText.map((s, index) => (
                    <li key={index}>
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={() => handleSelect(s.path)}
                      >
                        {s.name}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : searchInput.trim() !== "" ? (
                <ul
                  className="dropdown-menu show position-absolute"
                  style={{ top: "100%", width: "100%" }}
                >
                  <li>
                    <span className="dropdown-item disabled">No record found</span>
                  </li>
                </ul>
              ) : null}
            </div>

            <button className="btn btn-danger" onClick={handleLogout}>Log Out</button>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}

export default Header;
