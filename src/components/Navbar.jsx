import React from "react";
import { Link, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUser } from "../features/users/usersSlice";

const Navbar = () => {
  const user = useSelector(selectUser);

  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand">Travel-Planner</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link to={"/about"} class="nav-link active" aria-current="page">
                  About
                </Link>
              </li>

              <li class="nav-item">
                <Link to={"/register"} class="nav-link">
                  Register
                </Link>
              </li>

              <li class="nav-item">
                <Link to={"/login"} class="nav-link">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;
