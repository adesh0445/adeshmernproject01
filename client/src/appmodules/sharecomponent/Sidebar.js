import React from "react";
import { Link } from "react-router-dom";
export function Sidebar() {
    return (
        <div className="flex-shrink-0 p-3 sidebar">
            <ul className="list-unstyled ps-0">
                <li className="mb-1">
                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                        Sidebar
                    </button>
                    <div className="sideli collapse show" id="home-collapse"> <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                        <li><Link to="dashboard/Homepage" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Home Page</Link></li>
                        <li><Link to="Landing" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Dashboard</Link></li>
                        <li><Link to="Employeelist" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Employees</Link></li>
                        <li><Link to="AddEmployee" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Add Employees</Link></li>
                        <li><Link to="Chart" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Graph Example</Link></li>

                         <li><Link to="Lsitem" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Local Storage Item</Link></li>
                        <li><Link to="Tailwind" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Tailwind Css Use</Link></li>
                         <li><Link to="MaterialUi" className="link-body-emphasis d-inline-flex text-decoration-none rounded">MUI PAGE</Link></li>

                         </ul>
                    </div> </li>
            </ul>
        </div>


    )
}