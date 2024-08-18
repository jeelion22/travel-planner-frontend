import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import {
  getTripById,
  selectTrip,
  selectTripError,
  selectTripStatus,
} from "./tripSlice";
import { useNavigate, useParams } from "react-router-dom";
import getSymbolFromCurrency from "currency-symbol-map";
import BudgetModal from "./BudgetModal";

const Trip = () => {
  const { tripId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const status = useSelector(selectTripStatus);
  const trip = useSelector(selectTrip);
  const error = useSelector(selectTripError);

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

  useEffect(() => {
    if (tripId) {
      dispatch(getTripById(tripId))
        .unwrap()
        .catch((err) => {
          if (error) {
            alert(error);
          } else alert(err || "Trip not found");
          navigate("/dashboard");
        });
    } else {
      navigate("/dashboard");
    }
  }, [dispatch, tripId, navigate]);

  if (status === "loading") {
    return (
      <div className="container">
        <div
          className="row justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="col text-center">
            <FontAwesomeIcon icon={faSpinner} spinPulse size="4x" />
            <h6 className="mt-4">Loading...</h6>
          </div>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return <div>Error: {error || "Trip not found"}</div>;
  }

  if (status === "succeeded") {
    return (
      <div className="container">
        <div className="row bg-body-tertiary mt-4 rounded p-4 text-center">
          <div class="col-md-4 col-sm-6 mb-3 mb-sm-0">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">{trip.tripName}</h5>
                <p class="card-text">{trip.destination}</p>
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
              </div>
              <div class="card-footer">
                <small class="text-body-secondary">
                  Last updated 3 mins ago
                </small>
              </div>
            </div>
          </div>
          <div class="col-md-8 col-sm-6 ">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">Budget</h5>

                <div className="text-end">
                  {" "}
                  <i
                    type="button"
                    class=" bi bi-pencil-square"
                    data-bs-toggle="modal"
                    data-bs-target="#editBudgetModal"
                  ></i>
                </div>
                <div className="table-responsive">
                  <table class="table  table-striped text-start">
                    <thead>
                      <tr>
                        <th scope="col">Category</th>
                        <th scope="col">Original Budget</th>
                        <th scope="col">Actual Spending</th>
                        <th scope="col">Budget Overrun</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Trans.</td>
                        <td>
                          {getSymbolFromCurrency(trip.budget.currency)}
                          {trip.budget.transportationBudget}
                        </td>
                        <td>
                          {getSymbolFromCurrency(trip.budget.currency)}
                          {trip.budget.transportation}
                        </td>
                        <td>
                          {getSymbolFromCurrency(trip.budget.currency)}
                          {calculatebudgetOverRun(
                            trip.budget.transportationBudget,
                            trip.budget.transportation
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Accom.</td>
                        <td>
                          {getSymbolFromCurrency(trip.budget.currency)}
                          {trip.budget.accommodationBudget}
                        </td>
                        <td>
                          {getSymbolFromCurrency(trip.budget.currency)}
                          {trip.budget.accommodation}
                        </td>
                        <td>
                          {getSymbolFromCurrency(trip.budget.currency)}
                          {calculatebudgetOverRun(
                            trip.budget.accommodationBudget,
                            trip.budget.accommodation
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Food</td>
                        <td>
                          {getSymbolFromCurrency(trip.budget.currency)}
                          {trip.budget.foodBudget}
                        </td>
                        <td>
                          {getSymbolFromCurrency(trip.budget.currency)}
                          {trip.budget.food}
                        </td>
                        <td>
                          {getSymbolFromCurrency(trip.budget.currency)}
                          {calculatebudgetOverRun(
                            trip.budget.foodBudget,
                            trip.budget.food
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Other</td>
                        <td>
                          {getSymbolFromCurrency(trip.budget.currency)}
                          {trip.budget.otherBudget}
                        </td>
                        <td>
                          {getSymbolFromCurrency(trip.budget.currency)}
                          {trip.budget.other}
                        </td>
                        <td>
                          {getSymbolFromCurrency(trip.budget.currency)}
                          {calculatebudgetOverRun(
                            trip.budget.otherBudget,
                            trip.budget.other
                          )}
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td>Total</td>
                        <td>
                          {getSymbolFromCurrency(trip.budget.currency)}
                          {calculateBudget(Object.entries(trip.budget))}
                        </td>
                        <td>
                          {getSymbolFromCurrency(trip.budget.currency)}
                          {calculateSpent(Object.entries(trip.budget))}
                        </td>
                        <td>
                          {getSymbolFromCurrency(`${trip.budget.currency}`)}
                          {totalBudgetOverRun(
                            Object.entries(trip.budget),
                            Object.entries(trip.budget)
                          )}
                        </td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              <div class="card-footer">
                <small class="text-body-secondary">
                  Last updated 3 mins ago
                </small>
              </div>
            </div>
          </div>
        </div>

        <div className="row bg-body-tertiary mt-4 rounded p-4">
          <div class="col -sm-6 mb-3 mb-sm-0 h-100">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Budget</h5>
                <p class="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <a href="#" class="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="row bg-body-tertiary mt-4 rounded p-4">
          <div class="col-sm-6 mb-3 mb-sm-0 h-100">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Special title treatment</h5>
                <p class="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <a href="#" class="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
          <div class="col-sm-6 h-100">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Special title treatment</h5>
                <p class="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <a href="#" class="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
        </div>
        <BudgetModal />
      </div>
    );
  }
};

export default Trip;
