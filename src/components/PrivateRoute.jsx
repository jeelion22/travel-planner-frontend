import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  getUser,
  selectUser,
  selectUserStatus,
} from "../features/users/usersSlice";

const PrivateRoute = ({ children }) => {
  const user = useSelector(selectUser);
  const status = useSelector(selectUserStatus);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
