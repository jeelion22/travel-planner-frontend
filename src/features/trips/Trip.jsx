import React from "react";
import { useSelector } from "react-redux";
import { selectTrip, selectTripError, selectTripStatus } from "./tripSlice";

const Trip = () => {
  const status = useSelector(selectTripStatus);
  const trip = useSelector(selectTrip);
  const error = useSelector(selectTripError);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col">
          <div className="border rounded m-4 p-4 bg-body-tertiary">
            <div class="row">
              <div class="col-sm-6 mb-3 mb-sm-0">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                    <a href="#" class="btn btn-primary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                    <a href="#" class="btn btn-primary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trip;
