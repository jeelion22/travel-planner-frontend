import React, { useEffect } from "react";
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

const Trip = () => {
  const { tripId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const status = useSelector(selectTripStatus);
  const trip = useSelector(selectTrip);
  const error = useSelector(selectTripError);

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

  // if (status === "failed") {
  //   return <div>Error: {error || "Trip not found"}</div>;
  // }

  return (
    <div className="container">
      <div className="border rounded m-4 p-4 bg-body-tertiary">
        <div class="row row-cols-1 row-cols-md-3 g-4 text-center">
          <div class="col">
            <div class="card h-100">
              {/* <img src="..." class="card-img-top" alt="..."> */}
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
          <div class="col">
            <div class="card h-100">
              {/* <img src="..." class="card-img-top" alt="..."> */}
              <div class="card-body">
                <h5 class="card-title">Budget</h5>
                <p class="card-text">
                  <small class="text-body-secondary">
                    {getSymbolFromCurrency(`${trip.budget.currency}`)}{" "}
                    {trip.budget.amount}
                  </small>
                </p>
              </div>
              <div class="card-footer">
                <small class="text-body-secondary">
                  Last updated 3 mins ago
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trip;
