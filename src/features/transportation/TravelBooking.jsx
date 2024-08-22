import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTravelBookings,
  selectAllTravelBooking,
  selectAllTravelBookingError,
  selectAllTravelBookingStatus,
} from "./transportationSlice";
import { selectAllToDosStatus } from "../toDos/toDoSlice";
import getSymbolFromCurrency from "currency-symbol-map";

const TravelBooking = ({ tripId }) => {
  const allTravelBookingStatus = useSelector(selectAllTravelBookingStatus);
  const allTravelBookingError = useSelector(selectAllTravelBookingError);

  const allTravelBooking = useSelector(selectAllTravelBooking);

  const [flightsBooked, setFlightsBooked] = useState([]);
  const [trainsBooked, setTrainsBooked] = useState([]);

  const dispatch = useDispatch();

  const isPastDepartureTime = (departureTime) => {
    return Date.now() > new Date(departureTime).getTime(0);
  };

  useEffect(() => {
    dispatch(getAllTravelBookings(tripId))
      .unwrap()
      .then((res) => {
        if (res && res.length > 0) {
          const flightsBooked = [];
          const trainsBooked = [];

          res.forEach((booking) => {
            if (booking["travelType"] === "flight") {
              flightsBooked.push(booking);
            } else if (booking["travelType"] === "train") {
              trainsBooked.push(booking);
            }
          });
          setFlightsBooked(flightsBooked);
          setTrainsBooked(trainsBooked);
        }
      })
      .catch((err) => alert(err));
  }, [dispatch, tripId]);

  return (
    <div className="container">
      {flightsBooked.length > 0 && (
        <div className="row">
          <div className="col">
            <h6 className="text-start text-secondary">Flights Booked</h6>
            <div
              className="table-responsive"
              style={{
                maxHeight: "300px",
                overflowY: "scroll",
                scrollbarWidth: "none",
                outline: "none",
              }}
            >
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">F.No.</th>
                    <th scope="col">Airline/train</th>
                    <th scope="col">Source</th>
                    <th scope="col">Destination</th>
                    <th scope="col">Dep.Time</th>
                    <th scope="col">Arr.Time</th>
                    <th scope="col">Cost/Person</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {flightsBooked?.map((travelBooking, index) => (
                    <tr>
                      <td scope="row">{index + 1}</td>
                      <td>
                        {travelBooking.flightNumber ||
                          travelBooking.trainNumber}
                      </td>
                      <td>
                        {travelBooking.airline || travelBooking.trainName}
                      </td>
                      <td>{travelBooking.source}</td>
                      <td>{travelBooking.destination}</td>
                      <td>
                        {new Date(travelBooking.departureTime).toLocaleString(
                          "en-IN",
                          {
                            timeZone: "UTC",
                          }
                        )}
                      </td>
                      <td>
                        {new Date(travelBooking.arrivalTime).toLocaleString(
                          "en-IN",
                          {
                            timeZone: "UTC",
                          }
                        )}
                      </td>
                      <td>
                        {getSymbolFromCurrency(travelBooking.cost.currency)}
                        {travelBooking.cost.amount}
                      </td>
                      <td>
                        {
                          <button
                            className="btn btn-outline-danger rounded-pill"
                            disabled={isPastDepartureTime(
                              travelBooking.departureTime
                            )}
                          >
                            Cancel
                          </button>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* booked trains */}
      {trainsBooked.length > 0 && (
        <div className="row">
          <div className="col">
            <h6 className="text-start text-secondary">Trains Booked</h6>
            <div
              className="table-responsive"
              style={{
                maxHeight: "300px",
                overflowY: "scroll",
                scrollbarWidth: "none",
                outline: "none",
              }}
            >
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Train.No.</th>
                    <th scope="col">Tr.Name</th>
                    <th scope="col">Source</th>
                    <th scope="col">Destination</th>
                    <th scope="col">Dep.Time</th>
                    <th scope="col">Arr.Time</th>
                    <th scope="col">Cost/Person</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {trainsBooked?.map((travelBooking, index) => (
                    <tr>
                      <td scope="row">{index + 1}</td>
                      <td>{travelBooking.trainNumber}</td>
                      <td>{travelBooking.trainName}</td>
                      <td>{travelBooking.source}</td>
                      <td>{travelBooking.destination}</td>
                      <td>
                        {new Date(travelBooking.departureTime).toLocaleString(
                          "en-IN",
                          {
                            timeZone: "UTC",
                          }
                        )}
                      </td>
                      <td>
                        {new Date(travelBooking.arrivalTime).toLocaleString(
                          "en-IN",
                          {
                            timeZone: "UTC",
                          }
                        )}
                      </td>
                      <td>
                        {getSymbolFromCurrency(travelBooking.cost.currency)}
                        {travelBooking.cost.amount}
                      </td>
                      <td>
                        {
                          <button
                            className="btn btn-outline-danger rounded-pill"
                            disabled={isPastDepartureTime(
                              travelBooking.departureTime
                            )}
                          >
                            Cancel
                          </button>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelBooking;
