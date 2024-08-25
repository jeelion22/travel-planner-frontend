import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Register from "./components/Register";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import VerifyEmail from "./components/VerifyEmail";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import DashboardNavbar from "./components/DashboardNavbar";
import { useDispatch, useSelector } from "react-redux";
import { getUser, selectUser } from "./features/users/usersSlice";
import RedirectIfLoggedIn from "./components/RedirectIfLoggedIn";
import AddTrips from "./features/trips/AddTrips";
import DashboardLayout from "./components/DashboardLayout";
import Trip from "./features/trips/Trip";

const App = () => {
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route>
            <Route path="about" element={<About />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="verify" element={<VerifyEmail />} />
          </Route>
        </Route>

        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <DashboardNavbar />
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="add-trip"
          element={
            <PrivateRoute>
              <DashboardNavbar />
              <AddTrips />
            </PrivateRoute>
          }
        />

        <Route
          path="trip/:tripId"
          element={
            <PrivateRoute>
              <DashboardNavbar />
              <Trip />
            </PrivateRoute>
          }
        />

        <Route
          path="/"
          element={<RedirectIfLoggedIn redirectPath="/dashboard" />}
        />

        <Route
          path="/login"
          element={<RedirectIfLoggedIn redirectPath="/dashboard" />}
        />
        <Route
          path="/register"
          element={<RedirectIfLoggedIn redirectPath="/dashboard" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
