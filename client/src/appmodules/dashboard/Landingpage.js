import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Reactchart } from "./reactchart";
export function Landingpage() {
  let [mydata, setMydata] = useState([]);
  let [empC, setEmpC] = useState([]);
     const API_URL = process.env.REACT_APP_API_URL || "http://localhost:9800";


  let myapi = () => {
    axios.get(`${API_URL}/Employees`, {
      }).then((d) => {
        setMydata(d.data.AllEmployees);
        setEmpC(d.data.AllEmployees);
      })
      .catch((err) => {
        console.error("Employees API error:", err);
        alert("Failed to fetch data. Please login again!");
      });
  };

  const maleEmp = empC.filter((emp) => emp.gender === "male");
  const femaleEmp = empC.filter((emp) => emp.gender === "female");

  useEffect(() => {
    myapi();
  }, []);

  return (
    <Fragment>
      <div className="container-fluid mt-3 pt-3">
        <div className="row">
          {/* Total Employees */}
          <div className="col-md-3">
            <div className="card text-bg-primary mb-3">
              <div className="card-body">
                <h5 className="card-title">Total Employees</h5>
                <h2>{mydata.length}</h2>
              </div>
            </div>
          </div>

          {/* Male Employees */}
          <div className="col-md-3">
            <div className="card text-bg-warning mb-3">
              <div className="card-body">
                <h5 className="card-title">Male Employees</h5>
                <h1>{maleEmp.length}</h1>
              </div>
            </div>
          </div>

          {/* Female Employees */}
          <div className="col-md-3">
            <div className="card text-bg-danger mb-3">
              <div className="card-body">
                <h5 className="card-title">Female Employees</h5>
                <h1>{femaleEmp.length}</h1>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="col-md-8 m-5">
            <div className="card text-bg-secondary mb-3">
              <div className="card-body">
                <h5 className="card-title">Employee Statistics</h5>
                <div >
                  <Reactchart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
