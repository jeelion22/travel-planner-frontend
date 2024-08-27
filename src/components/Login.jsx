import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsAuthorized,
  selectUser,
  selectUserError,
  selectUserId,
  selectUserLoginError,
  selectUserLoginStatus,
  selectUserStatus,
  userLogin,
} from "../features/users/usersSlice";
import VerifyEmail from "./VerifyEmail";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = {
  email: "",
  password: "",
};

const userLoginValidationSchema = Yup.object({
  email: Yup.string()
    .required("* Email required")
    .email(" Invalid email address"),

  password: Yup.string().required("* Password required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const modalRef = useRef(null);

  const status = useSelector(selectUserStatus);
  const error = useSelector(selectUserError);
  const user = useSelector(selectUser);

  // user login state
  const userLoginStatus = useSelector(selectUserLoginStatus);
  const userLoginError = useSelector(selectUserLoginError);
  const userId = useSelector(selectUserId);

  // authorization
  const isUserAuthorized = useSelector(selectIsAuthorized);

  const openModal = () => {
    const modalElement = modalRef.current;
    const modal = new Modal(modalElement);
    modal.show();
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Formik
            initialValues={initialValues}
            validationSchema={userLoginValidationSchema}
            onSubmit={(values, { resetForm, setSubmitting }) => {
              dispatch(userLogin(values))
                .unwrap()
                .then((res) => {
                  resetForm();
                  if (res?.userId) {
                    openModal();
                  } else if (res.token) {
                    navigate("/dashboard");
                  } else navigate("/login");
                })
                .catch((err) => {
                  console.log(err);
                })

                .finally(() => {
                  setSubmitting(false);
                });
            }}
          >
            {(formik) => (
              <Form
                onSubmit={formik.handleSubmit}
                className="border rounded m-4 p-4 bg-body-tertiary"
              >
                <h3 className="text-center p-4">Login</h3>

                <div className="row ">
                  <div className="col">
                    <div class="mb-3">
                      <div class="form-floating mb-3 ">
                        <Field
                          type="email"
                          class={`form-control ${
                            formik.touched.email
                              ? formik.errors.email
                                ? "is-invalid"
                                : "is-valid"
                              : ""
                          }`}
                          id="email"
                          name="email"
                          placeholder="name@example.com"
                        />
                        <label for="email">Email address</label>
                        <ErrorMessage
                          name="email"
                          className="text-danger"
                          component="div"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mb-3">
                  <div class="form-floating mb-3">
                    <Field
                      type="password"
                      class={`form-control ${
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
                    <label for="password">Password</label>
                    <ErrorMessage
                      className="text-danger"
                      name="password"
                      component="div"
                    />
                  </div>
                </div>

                <div>
                  <Link to={"/forgot-password"} className="link-primary">
                    Forgot password?
                  </Link>
                </div>

                <div className="text-end">
                  <button
                    type="submit"
                    class="btn btn-outline-primary mt-3"
                    disabled={userLoginStatus === "loading"}
                  >
                    {userLoginStatus === "loading" ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          aria-hidden="true"
                        ></span>{" "}
                        <span role="status">Loging...</span>
                      </>
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <div className="row justify-content-center text-center">
        <div className="col-md-6">
          <div className="border rounded p-4 m-4 bg-body-tertiary">
            <div>
              For creating an account?{" "}
              <Link to={"/register"} className="link-primary">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
        ref={modalRef}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            {/* <div class="modal-header">
              <h3 class="modal-title" id="staticBackdropLabel">
                Verify Email Address
              </h3>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div> */}
            <div class="modal-body">
              <VerifyEmail />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
