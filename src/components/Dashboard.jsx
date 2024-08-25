import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getSymbolFromCurrency from "currency-symbol-map";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useNavigate } from "react-router-dom";
import {
  deleteTripById,
  getAllTripsByUser,
  getTripById,
  selectTripError,
  selectTrips,
  selectTripStatus,
  selectTripUpdateStatus,
} from "../features/trips/tripSlice";
import { getAllToDos } from "../features/toDos/toDoSlice";
import { getFlightsSuggestions } from "../features/transportation/transportationSlice";
import AddTrips from "../features/trips/AddTrips";
import EditTrip from "../features/trips/EditTrip";

const Dashboard = () => {
  const trips = useSelector(selectTrips);
  const status = useSelector(selectTripStatus);
  const tripUpdateStatus = useSelector(selectTripUpdateStatus);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // calculating budget
  const calculateBudget = (arr) => {
    const bud = arr.filter((item) =>
      [
        "transportationBudget",
        "accommodationBudget",
        "foodBudget",
        "otherBudget",
      ].includes(item[0])
    );

    return bud.reduce((total, [key, value]) => {
      if (typeof value === "number") {
        return total + value;
      }
      return total;
    }, 0);
  };

  const calculateSpent = (arr) => {
    const bud = arr.filter((item) =>
      ["transportation", "accommodation", "food", "other"].includes(item[0])
    );

    return bud.reduce((total, [key, value]) => {
      if (typeof value === "number") {
        return total + value;
      }
      return total;
    }, 0);
  };

  const totalBudgetOverRun = (budgetArr, spentArr) => {
    if (calculateBudget(budgetArr) - calculateSpent(spentArr) < 0) {
      return calculateSpent(spentArr) - calculateBudget(budgetArr);
    }
    return 0;
  };

  const calculatebudgetOverRun = (budgetAmt, spentAmt) => {
    if (budgetAmt - spentAmt < 0) {
      return spentAmt - budgetAmt;
    }
    return 0;
  };

  // days remaining for starting trip

  const calculateDaysRemaining = (startDate) => {
    const todayInMillSec = new Date().setHours(0, 0, 0, 0);
    const startDateInMillSec = new Date(startDate).setHours(0, 0, 0, 0);

    if (todayInMillSec < startDateInMillSec) {
      const days =
        (startDateInMillSec - todayInMillSec) / (24 * 60 * 60 * 1000);
      return days;
    }
    return 0;
  };

  // handle trip delete

  const handleTripDelete = (tripId) => {
    dispatch(deleteTripById(tripId))
      .unwrap()
      .then(() => {
        alert("Trip deleted successfully!");
        dispatch(getAllTripsByUser());
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    dispatch(getAllTripsByUser());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="row justify-content-center mt-4 pb-4 border-bottom">
        <div className="col">
          <button
            className="btn btn-success"
            onClick={() => {
              navigate("/add-trip");
            }}
          >
            Add Trip
          </button>
        </div>
        <div className="col">
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
      </div>

      {status === "failed" && (
        <div className="container">
          <div
            className="row justify-content-center align-items-center text-center"
            style={{ height: "50vh" }}
          >
            <div className="col ">
              <i class="bi bi-rocket fs-1"></i>
              <h5>No trips</h5>
            </div>
          </div>
        </div>
      )}

      {status === "succeeded" ? (
        <div class="row row-cols-1 row-cols-md-3 g-4 mt-4">
          {trips?.map((trip) => (
            <div class="col" key={trip._id}>
              <div class="card h-100">
                {/* <img src="..." class="card-img-top" alt="..." /> */}
                <div class="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <i
                        type="button"
                        class="bi bi-pencil-square fs-4 text-success"
                        data-bs-toggle="modal"
                        data-bs-target={`#${trip._id}`}
                      ></i>
                    </div>
                    <div>
                      <i
                        type="button"
                        class="bi bi-trash fs-4  text-danger"
                        onClick={() => {
                          if (
                            confirm(
                              `Would you like to delete the trip to '${trip.tripName}'?`
                            )
                          ) {
                            handleTripDelete(trip._id);
                          }
                        }}
                      ></i>
                    </div>
                  </div>

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

                  <div className="row d-flex">
                    <div className="col">
                      <h6>Budget</h6>{" "}
                      <small class="text-body-secondary">
                        {getSymbolFromCurrency(`${trip.budget.currency}`)}{" "}
                        {calculateBudget(Object.entries(trip.budget))}
                      </small>
                    </div>

                    <div className="col">
                      <h6>Spent</h6>{" "}
                      <small class="text-body-secondary">
                        {getSymbolFromCurrency(`${trip.budget.currency}`)}{" "}
                        {calculateSpent(Object.entries(trip.budget))}
                      </small>
                    </div>

                    <div className="col">
                      <h6>OverRun</h6>{" "}
                      <small class="text-body-secondary">
                        {getSymbolFromCurrency(`${trip.budget.currency}`)}{" "}
                        {totalBudgetOverRun(
                          Object.entries(trip.budget),
                          Object.entries(trip.budget)
                        )}
                      </small>
                    </div>
                  </div>

                  <p className="text-end mt-3">
                    <button
                      type="button"
                      class="btn btn-success btn-sm "
                      onClick={() => {
                        dispatch(getTripById(trip._id));
                        dispatch(getAllToDos(trip._id));

                        dispatch(
                          getFlightsSuggestions({
                            destination: trip.destination,
                          })
                        ).catch((err) => alert(err));

                        navigate(`/trip/${trip._id}`);
                      }}
                    >
                      Click More
                    </button>
                  </p>
                </div>
                <div class="card-footer text-center">
                  <small class="text-body-secondary">
                    {calculateDaysRemaining(trip.startDate)} days to go
                  </small>
                </div>
              </div>

              <div
                class="modal fade"
                id={trip._id}
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-scrollable">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id={trip._id}>
                        Edit Trip
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        disabled={tripUpdateStatus === "succeeded"}
                      ></button>
                    </div>
                    <div class="modal-body">
                      <EditTrip trip={trip} />
                    </div>
                  </div>
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
