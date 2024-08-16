import React, { useEffect } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  clearMessage,
  getUser,
  logoutUser,
  selectUser,
  selectUserMessage,
  selectUserStatus,
} from "../features/users/usersSlice";
import { useDispatch } from "react-redux";

const DashboardNavbar = () => {
  const user = useSelector(selectUser);
  const status = useSelector(selectUserStatus);
  const message = useSelector(selectUserMessage);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser(null))
      .unwrap()
      .then(() => {
        navigate("/login", { replace: true });

        dispatch(clearMessage());
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    if (message) {
      alert(message);
    }
  }, [message]);
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

            <li className="nav-item">
              <Link className="nav-link btn btn-link" to={"/dashboard"}>
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
