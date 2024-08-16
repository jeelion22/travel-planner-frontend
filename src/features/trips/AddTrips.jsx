import React from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import Budget from "./Budget";
import { createTrip, selectTripStatus } from "./tripSlice";
import { useNavigate } from "react-router-dom";

const initialValues = {
  tripName: "",
  destination: "",
  startDate: "",
  endDate: "",
  budget: { currency: "INR", amount: 0 },
};

const tripValidationSchema = Yup.object({
  tripName: Yup.string().required("* Trip name required"),
  destination: Yup.string().required("* Trip destination required"),
  startDate: Yup.date().required("* Trip starting date required"),
  endDate: Yup.date().required("* Trip end date required"),
  budget: Yup.object({
    currency: Yup.string().required("* Currency type required"),
    amount: Yup.number()
      .min(0, "* Amount must be a non-negative number")
      .required("* Amount required"),
  }),
});

const AddTrips = () => {
  const tripStatus = useSelector(selectTripStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <nav className="navbar bg-body-tertiary mt-4 rounded p-3">
            <form className="col d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Location"
                aria-label="Search Location"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </nav>
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={tripValidationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          dispatch(createTrip(values))
            .unwrap()
            .then((res) => {
              alert("Trip added successfully!");
              resetForm();
              navigate("/dashboard");
            })
            .catch((err) => alert(err))
            .finally(() => setSubmitting(false));
        }}
      >
        {(formik) => (
          <div className="row justify-content-center">
            <div className="col-md-8">
              <Form
                onSubmit={formik.handleSubmit}
                className="rounded mt-3 p-4 bg-body-tertiary"
              >
                <h3 className="text-center pb-3">Add Trip</h3>

                <div className="row">
                  <h6>Trip info</h6>
                  <div className="col">
                    <div className="form-floating mb-3">
                      <Field
                        type="text"
                        name="tripName"
                        className={`form-control ${
                          formik.touched.tripName
                            ? formik.errors.tripName
                              ? "is-invalid"
                              : "is-valid"
                            : ""
                        }`}
                        id="tripName"
                        placeholder=""
                      />
                      <label htmlFor="tripName">Trip Name</label>
                      <ErrorMessage
                        name="tripName"
                        className="text-danger"
                        component="div"
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-floating mb-3">
                      <Field
                        type="text"
                        name="destination"
                        className={`form-control ${
                          formik.touched.destination
                            ? formik.errors.destination
                              ? "is-invalid"
                              : "is-valid"
                            : ""
                        }`}
                        id="destination"
                        placeholder=""
                      />
                      <label htmlFor="destination">Destination</label>
                      <ErrorMessage
                        name="destination"
                        className="text-danger"
                        component="div"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <h6>Trip dates</h6>
                  <div className="col">
                    <div className="form-floating mb-3 ">
                      <Field
                        type="date"
                        name="startDate"
                        className={`form-control ${
                          formik.touched.startDate
                            ? formik.errors.startDate
                              ? "is-invalid"
                              : "is-valid"
                            : ""
                        }`}
                        id="startDate"
                        placeholder=""
                      />
                      <label htmlFor="startDate">Start Date</label>
                      <ErrorMessage
                        name="startDate"
                        className="text-danger"
                        component="div"
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-floating mb-3">
                      <Field
                        type="date"
                        name="endDate"
                        className={`form-control ${
                          formik.touched.endDate
                            ? formik.errors.endDate
                              ? "is-invalid"
                              : "is-valid"
                            : ""
                        }`}
                        id="endDate"
                        placeholder=""
                      />
                      <label htmlFor="endDate">End Date</label>
                      <ErrorMessage
                        name="endDate"
                        className="text-danger"
                        component="div"
                      />
                    </div>
                  </div>
                </div>

                <div className="row ">
                  <div className="col">
                    <h6>Budget</h6>
                    <div className="form-floating mb-3">
                      <Field
                        name="budget"
                        component={Budget}
                        className={`form-control ${
                          formik.touched.budget
                            ? formik.errors.budget
                              ? "is-invalid"
                              : "is-valid"
                            : ""
                        }`}
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>

                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-outline-success rounded-pill mt-3"
                    disabled={tripStatus === "loading"}
                  >
                    {tripStatus === "loading" ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          area-hidden="true"
                        ></span>{" "}
                        <span role="status">Adding...</span>
                      </>
                    ) : (
                      "Add Trip"
                    )}
                  </button>
                </div>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default AddTrips;
