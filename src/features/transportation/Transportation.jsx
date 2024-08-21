import React, { useState } from "react";

import { Formik, Field, Form, ErrorMessage } from "formik";
import { useSelector } from "react-redux";
import {
  selectFlightsSuggestionError,
  selectFlightsSuggestionState,
  selectSuggestedFlights,
} from "./transportationSlice";
import getSymbolFromCurrency from "currency-symbol-map";
import ReactPaginate from "react-paginate";
import FlightBookingModal from "./FlightBookingModal";

const Transportation = () => {
  const flightsSuggestionsState = useSelector(selectFlightsSuggestionState);
  const flightsSuggestionsError = useSelector(selectFlightsSuggestionError);

  const suggestedFlights = useSelector(selectSuggestedFlights);

  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 5;
  const paginatedFlights = suggestedFlights?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <>
      <div className="border p-2 rounded bg-teritary">
        <Formik>
          {(formik) => (
            <Form className="d-flex gap-2 ">
              <Field
                type="text"
                name="from"
                className="form-control"
                placeholder="From"
              />
              <Field
                type="text"
                name="from"
                className="form-control"
                placeholder="To"
              />
              <Field as="select" className="form-select">
                <option value={"flight"}>Flight</option>
                <option value={"train"}>Train</option>
                <option value={"bus"}>Bus</option>
                <option value={"car rental"}>Car Rental</option>
                <option value={"other"}>Other</option>
              </Field>
              <button className="btn btn-primary">Search</button>
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
                <tr>
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
                      className="btn btn-primary btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target={`#${flight._id}`}
                    >
                      Book
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
