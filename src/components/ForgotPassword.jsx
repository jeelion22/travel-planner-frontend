import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectUserPasswordResetError,
  selectUserPasswordResetStatus,
} from "../features/users/usersSlice";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";

const ForgotPassword = () => {
  const userPasswordResetStatus = useSelector(selectUserPasswordResetStatus);
  const userPasswordResetError = useSelector(selectUserPasswordResetError);

  const initialValues = {
    email: "",
  };

  const emailValidationSchema = Yup.object({
    email: Yup.string().email().required("* Email required"),
  });

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 border rounded m-4 p-4 bg-body-tertiary">
          <h3 className="text-center p-4">Forgot Password?</h3>

          <Formik
            initialValues={initialValues}
            validationSchema={emailValidationSchema}
            onSubmit={() => {}}
          >
            {(formik) => (
              <Form>
                <div className="row ">
                  <div className="col">
                    <div class="mb-3">
                      <div class="form-floating mb-3">
                        <Field
                          type="email"
                          name="email"
                          class={`form-control ${
                            formik.touched.email
                              ? formik.errors.email
                                ? "is-invalid"
                                : "is-valid"
                              : ""
                          }`}
                          id="email"
                          placeholder="name@example.com"
                        />
                        <label htmlFor="email">Email address</label>
                        <ErrorMessage
                          name="email"
                          component={"div"}
                          className="text-danger"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    class="btn btn-outline-primary rounded-pill mt-3"
                    disabled={userPasswordResetStatus === "loading"}
                  >
                    Send password reset OTP
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <div className="row justify-content-center text-center">
        <div className="col-md-6 border rounded m-4 p-1 bg-body-tertiary">
          <div className=" p-4  bg-body-tertiary">
            <div>
              For login your account?{" "}
              <Link to={"/login"} className="link-primary">
                Click here
              </Link>
            </div>
          </div>
        </div>
      </div>
     </div>
  );
};

export default ForgotPassword;
