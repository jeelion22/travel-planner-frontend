import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getSymbolFromCurrency from "currency-symbol-map";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useNavigate } from "react-router-dom";
import {
  getAllTripsByUser,
  getTripById,
  selectTripError,
  selectTrips,
  selectTripStatus,
} from "../features/trips/tripSlice";

const Dashboard = () => {
  const trips = useSelector(selectTrips);
  const status = useSelector(selectTripStatus);
  const error = useSelector(selectTripError);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllTripsByUser());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col">
          <nav class="navbar bg-body-tertiary mt-4 rounded p-4 ">
            <div class="container-fluid">
              <button
                className="btn btn-success"
                onClick={() => {
                  navigate("/add-trip");
                }}
              >
                Add Trip
              </button>

              <form class="d-flex" role="search">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search Trips"
                  aria-label="Search Trips"
                />
                <button class="btn btn-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </nav>
        </div>
      </div>

      {status === "succeeded" ? (
        <div class="row row-cols-1 row-cols-md-3 g-4 mt-4">
          {trips?.map((trip) => (
            <div class="col" key={trip._id}>
              <div class="card h-100">
                {/* <img src="..." class="card-img-top" alt="..." /> */}
                <div class="card-body">
                  <h5 class="card-title text-center">{trip.tripName}</h5>
                  <p class="card-text text-end">
                    <h6>- {trip.destination}</h6>
                  </p>
                  <p className="card-text text-center">
                    {new Date(trip.startDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    {`  --  `}
                    {new Date(trip.endDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="card-text">
                    <h6>Budget:</h6>{" "}
                    <small class="text-body-secondary">
                      {getSymbolFromCurrency(`${trip.budget.currency}`)}{" "}
                      {trip.budget.amount}
                    </small>
                  </p>

                  <p className="text-end">
                    <button
                      type="button"
                      class="btn btn-outline-success btn-sm "
                      onClick={() => {
                        dispatch(getTripById(trip._id))
                          .unwrap()
                          .then(() => navigate("/trip"))
                          .catch(() => {
                            if (error) {
                              alert(error);
                            } else {
                              alert("An error occured");
                            }
                          });
                      }}
                    >
                      Click More
                    </button>
                  </p>
                </div>
                <div class="card-footer">
                  <small class="text-body-secondary">
                    {Math.floor(
                      (new Date() - new Date(trip.startDate)) /
                        (1000 * 60 * 60 * 24)
                    ) * -1}{" "}
                    days to go
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Dashboard;
