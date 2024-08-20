import React from "react";
import { useSelector } from "react-redux";
import { selectToDo, selectToDoEditStatus } from "./toDoSlice";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";

const EditToDo = ({toDoId}) => {
  const toDo = useSelector(selectToDo);
  const editToDOStatus = useSelector(selectToDoEditStatus)
  

  const initialValues = { ...toDo };

  const toDoEditValidationSchema = Yup.object({
    toDoName: Yup.string().required("* ToDo name required"),
    toDoDescription: Yup.string().required("* ToDo description required"),
    toDoStatus: Yup.string()
      .oneOf(["pending", "in-progress", "completed"])
      .required("* ToDo status required"),
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div
            className="modal fade"
            id={`toDoEditModal-${toDoId}`}
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h1
                    className="modal-title fs-5"
                    id={`toDoEditModal-${toDoId}`}
                  >
                    Add ToDo
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  {editToDOStatus === "succeeded" ? (
                    <>
                      <div className="text-center">
                        <div className="text-primary">
                          <i class="bi bi-check-circle-fill fs-1"></i>
                          <h6>Success</h6>
                        </div>

                        <button
                          type="button"
                          className="btn btn-outline-danger rounded-pill"
                          data-bs-dismiss="modal"
                          onClick={() => dispatch(getAllToDos(tripId))}
                        >
                          Close
                        </button>
                      </div>
                    </>
                  ) : (
                    <Formik
                      initialValues={initialValues}
                      validationSchema={toDoEditValidationSchema}
                      onSubmit={(values, { setSubmitting, resetForm }) => {
                        dispatch(addToDo({ tripId, toDo: values }))
                          .unwrap()
                          .then(() => {
                            resetForm();
                          })
                          .catch((err) => alert(err))
                          .finally(() => setSubmitting(false));
                      }}
                    >
                      {(formik) => (
                        <Form
                          onSubmit={formik.handleSubmit}
                          className="border rounded m-4 p-4 bg-body-tertiary"
                        >
                          <div className="container">
                            <h3 className="text-center mb-4">ToDo</h3>
                            <div className="row">
                              <div className="col">
                                <div className="form-floating mb-3">
                                  <Field
                                    type="text"
                                    name="toDoName"
                                    className={`form-control ${
                                      formik.touched.toDoName
                                        ? formik.errors.toDoName
                                          ? "is-invalid"
                                          : "is-valid"
                                        : ""
                                    }`}
                                    id="toDoName"
                                    placeholder="ToDo Name"
                                  />
                                  <label htmlFor="toDoName">ToDo Name</label>
                                  <ErrorMessage
                                    name="toDoName"
                                    className="text-danger"
                                    component="div"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">
                                <div className="form-floating mb-3">
                                  <Field
                                    as="textarea"
                                    name="toDoDescription"
                                    className={`form-control ${
                                      formik.touched.toDoDescription
                                        ? formik.errors.toDoDescription
                                          ? "is-invalid"
                                          : "is-valid"
                                        : ""
                                    }`}
                                    id="toDoDescription"
                                    placeholder="Enter ToDo Description"
                                  />
                                  <label htmlFor="toDoDescription">
                                    ToDo Description
                                  </label>
                                  <ErrorMessage
                                    name="toDoDescription"
                                    className="text-danger"
                                    component="div"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="modal-footer justify-content-center">
                              <div>
                                <button
                                  type="submit"
                                  className="btn btn-outline-success rounded-pill"
                                  disabled={editToDOStatus === "loading"}
                                >
                                  {editToDOStatus === "loading" ? (
                                    <>
                                      {" "}
                                      <span
                                        className="spinner-border spinner-border-sm"
                                        area-hidden="true"
                                      ></span>{" "}
                                      <span role="status">Updating...</span>
                                    </>
                                  ) : (
                                    "Update ToDo"
                                  )}
                                </button>
                              </div>
                              <div>
                                <button
                                  type="button"
                                  className="btn btn-outline-danger rounded-pill"
                                  data-bs-dismiss="modal"
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditToDo;
