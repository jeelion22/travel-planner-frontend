import React from "react";
import { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "../styles/Register.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { userRegistrationValidationSchema } from "../validationSchema/userRegistrationValidationSchema";
import PhoneField from "./PhoneField";
import userServices from "../../services/userServices";

const intialValues = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="row justify-content-center ">
        <div className="col-md-6">
          <Formik
            initialValues={intialValues}
            validationSchema={userRegistrationValidationSchema}
            onSubmit={async (values, { resetForm }) => {
              setIsLoading(true);
              try {
                const res = await userServices.register(values);

                alert(res.data.message);

                setIsLoading(false);
                resetForm();
                navigate("/verify");
              } catch (err) {
                setIsLoading(false);
                alert(err.response.data.message);
              }
            }}
          >
            {(formik) => (
              <Form
                onSubmit={formik.handleSubmit}
                className="border rounded m-4 p-4 bg-body-tertiary "
              >
                <h3 className="text-center p-4">Register</h3>

                <div className="mb-3">
                  <div className="form-floating mb-3">
                    <Field
                      type="text"
                      name="firstname"
                      className={`form-control ${
                        formik.touched.firstname
                          ? formik.errors.firstname
                            ? "is-invalid"
                            : "is-valid"
                          : ""
                      }`}
                      id="firstname"
                      placeholder=""
                    />

                    <label htmlFor="floatingInput">Firstname</label>

                    <ErrorMessage
                      name="firstname"
                      className="text-danger"
                      component="div"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <div className="form-floating mb-3">
                    <Field
                      type="text"
                      className={`form-control ${
                        formik.touched.lastname
                          ? formik.errors.lastname
                            ? "is-invalid"
                            : "is-valid"
                          : ""
                      }`}
                      name="lastname"
                      id="lastname"
                      placeholder=""
                    />
                    <label htmlFor="lastname">Lastname</label>

                    <ErrorMessage
                      name="lastname"
                      className="text-danger"
                      component="div"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <div className="form-floating mb-3">
                    <Field
                      type="email"
                      className={`form-control ${
                        formik.touched.email
                          ? formik.errors.email
                            ? "is-invalid"
                            : "is-valid"
                          : ""
                      }`}
                      name="email"
                      id="email"
                      placeholder=""
                    />
                    <label htmlFor="email">Email address</label>
                    <ErrorMessage
                      name="email"
                      className="text-danger"
                      component="div"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <div className="form-floating mb-3 ">
                    <Field
                      name="phone"
                      className={`form-control d-flex phone-input-border  ${
                        formik.touched.phone
                          ? formik.errors.phone
                            ? "is-invalid"
                            : "is-valid"
                          : ""
                      }`}
                      component={PhoneField}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <div className="form-floating mb-3">
                    <Field
                      type="password"
                      className={`form-control ${
                        formik.touched.password
                          ? formik.errors.password
                            ? "is-invalid"
                            : "is-valid"
                          : ""
                      }`}
                      id="password"
                      name="password"
                      placeholder=""
                    />
                    <label htmlFor="password">Password</label>
                    <ErrorMessage
                      name="password"
                      className="text-danger"
                      component="div"
                    />
                  </div>
                </div>

                <div className="form-floating">
                  <Field
                    type="password"
                    className={`form-control ${
                      formik.touched.confirmPassword
                        ? formik.errors.confirmPassword
                          ? "is-invalid"
                          : "is-valid"
                        : ""
                    }`}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder=""
                  />
                  <label htmlFor="confirmPassword">Confirm password</label>
                  <ErrorMessage
                    name="confirmPassword"
                    className="text-danger"
                    component="div"
                  />
                </div>

                <div className="text-end">
                  <button
                    type="submit"
                    class="btn btn-outline-primary rounded-pill mt-3"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          area-hidden="true"
                        ></span>{" "}
                        <span role="status">Loading...</span>
                      </>
                    ) : (
                      "Register"
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <div className="row justify-content-center text-center">
        <div className="col-md-6 ">
          <div className="border rounded p-4 m-4 bg-body-tertiary">
            <div>
              Already have an account?{" "}
              <Link to={"/login"} className="link-primary">
                Login
              </Link>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
