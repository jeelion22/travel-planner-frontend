import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser, selectUser } from "../features/users/usersSlice";
import { useDispatch } from "react-redux";

const DashboardNavbar = () => {
  const user = useSelector(selectUser);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/dashboard" className="navbar-brand">
          Travel-Planner
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link">
                {user?.firstname} {user?.lastname}
              </Link>
            </li>

            {/* <li className="nav-item">
              <Link to="/dashboard/settings" className="nav-link">
                Settings
              </Link>
            </li> */}
            <li className="nav-item">
              <button className="nav-link btn btn-link">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
