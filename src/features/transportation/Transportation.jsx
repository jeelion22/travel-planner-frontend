import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  bookFlight,
  getFlightsSuggestions,
  resetFlightBooking,
  selectFlightBookingError,
  selectFlightBookingStatus,
  selectFlightsSuggestionError,
  selectFlightsSuggestionState,
  selectSuggestedFlights,
} from "./transportationSlice";
import getSymbolFromCurrency from "currency-symbol-map";
import ReactPaginate from "react-paginate";
import { selectUser } from "../users/usersSlice";
import { v4 as uuidv4 } from "uuid";

const Transportation = ({ trip }) => {
  const tripId = trip._id;

  const flightsSuggestionsState = useSelector(selectFlightsSuggestionState);
  const flightsSuggestionsError = useSelector(selectFlightsSuggestionError);
  const user = useSelector(selectUser);

  const suggestedFlights = useSelector(selectSuggestedFlights);

  // flight booking
  const flightBookingStatus = useSelector(selectFlightBookingStatus);
  const flightBookingError = useSelector(selectFlightBookingError);

  const [currentPage, setCurrentPage] = useState(0);
  const [loadingButtons, setLoadingButtons] = useState({});

  const dispatch = useDispatch();

  const itemsPerPage = 5;
  const paginatedFlights = suggestedFlights?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleFlightBooking = (flight) => {
    const flightId = flight._id;
    setLoadingButtons((pre) => ({ ...pre, [flightId]: true }));

    const flightBookingData = {
      name: `${user.firstname} ${user.lastname}`,
      travelType: "flight",
      flightNumber: flight.flightNumber,
      airline: flight.airline,
      source: flight.source,
      destination: flight.destination,
      departureTime: flight.departureTime,
      arrivalTime: flight.arrivalTime,
      cost: {
        currency: flight.currency,
        amount: flight.cost,
      },
    };

    dispatch(bookFlight({ tripId, flightBookingData }))
      .unwrap()
      .then(() => alert("Flight booked successfully!"))
      .catch((err) => alert(JSON.stringify(err, null, 2)))
      .finally(() => {
        setLoadingButtons((prev) => {
          return { ...prev, [flightId]: false };
        }).dispatch(resetFlightBooking());
      });
  };

  const initialValues = {
    from: "",
    to: "",
    travelType: "",
  };

  const transportSearchValidationSchema = Yup.object({
    from: Yup.string().required("* Source required"),
    to: Yup.string().required("* Destination required"),
    travelType: Yup.string()
      .oneOf(
        ["flight", "train", "bus", "car rental", "other"],
        "* Invalid selection"
      )
      .required("* Travel type required"),
  });

  useEffect(() => {
    dispatch(
      getFlightsSuggestions({
        source: trip.source,
        destination: trip.destination,
      })
    );
  }, [dispatch, tripId]);

  return (
    <>
      <div className="border p-2 rounded">
        <Formik
          initialValues={initialValues}
          validationSchema={transportSearchValidationSchema}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            if (values.travelType === "flight") {
              dispatch(
                getFlightsSuggestions({
                  source: values.from,
                  destination: values.to,
                })
              )
                .unwrap()
                .then(() => resetForm())
                .catch((err) => alert(JSON.stringify(err, null, 2)))
                .finally(() => setSubmitting(false));
            }
          }}
        >
          {(formik) => (
            <Form className="d-flex gap-2 justify-content-center ">
              <div className="">
                <Field
                  type="text"
                  name="from"
                  className={`form-control ${
                    formik.touched.from
                      ? formik.errors.from
                        ? "is-invalid"
                        : "is-valid"
                      : ""
                  }`}
                  placeholder="From"
                />
                <ErrorMessage
                  className="text-danger"
                  name="from"
                  component={"div"}
                />
              </div>

              <div>
                <Field
                  type="text"
                  name="to"
                  className={`form-control ${
                    formik.touched.to
                      ? formik.errors.to
                        ? "is-invalid"
                        : "is-valid"
                      : ""
                  }`}
                  placeholder="To"
                />
                <ErrorMessage
                  className="text-danger"
                  name="to"
                  component={"div"}
                />
              </div>

              <div>
                <Field
                  as="select"
                  name="travelType"
                  className={`form-select ${
                    formik.touched.travelType
                      ? formik.errors.travelType
                        ? "is-invalid"
                        : "is-valid"
                      : ""
                  }`}
                >
                  <option value={""} disabled>
                    Select Travel Type
                  </option>
                  <option value={"flight"}>Flight</option>
                  <option value={"train"}>Train</option>
                  <option value={"bus"}>Bus</option>
                  <option value={"car rental"}>Car Rental</option>
                  <option value={"other"}>Other</option>
                </Field>
                <ErrorMessage
                  className="text-danger"
                  name="travelType"
                  component={"div"}
                />
              </div>
              <div>
                <button type="submit" className="btn btn-primary">
                  Search
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* transportation searches or suggestion */}

      {flightsSuggestionsState === "failed" && (
        <div className="text-center mt-2">
          <h5>Flights</h5>
          <i class="bi bi-airplane fs-3"></i>
          <h6>No Flights Available</h6>
        </div>
      )}

      {/* search loading */}
      {flightsSuggestionsState === "loading" && (
        <div className="container">
          <div className="row justify-content-center align-items-center mt-2">
            <div className="col text-center">
              <FontAwesomeIcon icon={faSpinner} spinPulse className="fs-3" />
              <h6 className="mt-2">Loading...</h6>
            </div>
          </div>
        </div>
      )}

      {flightsSuggestionsState === "succeeded" && (
        <div className="table-responsive">
          <table class="table table-striped table-hover align-middle ">
            <caption className="caption-top">Available Flights</caption>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">F.No.</th>
                <th scope="col">Airline</th>
                <th scope="col">Source</th>
                <th scope="col">Destination</th>
                <th scope="col">Dep.Time</th>
                <th scope="col">Arr.Time</th>
                <th scope="col">Cost/Person</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedFlights?.map((flight, index) => (
                <tr key={flight._id}>
                  <td>{currentPage * itemsPerPage + index + 1}</td>
                  <td>{flight.flightNumber}</td>
                  <td>{flight.airline}</td>
                  <td>{flight.source}</td>
                  <td>{flight.destination}</td>
                  <td>
                    {new Date(flight.departureTime).toLocaleString("en-IN", {
                      timeZone: "UTC",
                    })}
                  </td>
                  <td>
                    {" "}
                    {new Date(flight.arrivalTime).toLocaleString("en-IN", {
                      timeZone: "UTC",
                    })}
                  </td>
                  <td>
                    {getSymbolFromCurrency(flight.currency)}
                    {flight.cost}
                  </td>
                  <td>
                    <button
                      type="submit"
                      className="btn btn-outline-primary"
                      disabled={flightBookingStatus === "loading"}
                      onClick={() => {
                        handleFlightBooking(flight);
                      }}
                    >
                      {loadingButtons[flight._id] === true ? (
                        <>
                          {/* <span
                            className="spinner-border spinner-border-sm"
                            area-hidden="true"
                          ></span>{" "} */}
                          <span role="status">Booking...</span>
                        </>
                      ) : (
                        "Book"
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ReactPaginate
            previousLabel="previous"
            nextLabel="next"
            breakLabel="..."
            pageCount={Math.ceil(suggestedFlights.length / itemsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            className="pagination justify-content-center mt-4"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            activeClassName="active"
            onPageChange={handlePageClick}
          />
        </div>
      )}

      <div className="table-responsive">
        <table class="table">
          <caption className="caption-top">Available Trains</caption>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">From</th>
              <th scope="col">To</th>
              <th scope="col">Dep.Time</th>
              <th scope="col">Arr.Time</th>
              <th scope="col">Cost</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </>
  );
};

export default Transportation;
