import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUser } from "../features/users/usersSlice";

const PrivateRoute = ({ children }) => {
  const user = useSelector(selectUser);

  return user? children : <Navigate to="/login" />;
};

export default PrivateRoute;
