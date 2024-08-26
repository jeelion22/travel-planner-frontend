import React, { useRef, useState } from "react";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";

import {
  forgotPassword,
  selectUserPasswordResetError,
  selectUserPasswordResetStatus,
} from "./usersSlice";

const PasswordResetOtp = () => {
  // password reset otp verification
  const userPasswordResetStatus = useSelector(selectUserPasswordResetStatus);
  const userPasswordResetError = useSelector(selectUserPasswordResetError);

  //   otp state
  const [otp, setOtp] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   setting password
  const initialValues = {
    password: "",
    confirmPassword: "",
  };
  //   password setting validation schema
  const passwordValidationSchema = Yup.object({
    password: Yup.string()
      .required("* Password is required")
      .min(8, "Password must be at least mix of 8 characters long.")
      .matches(/[0-9]/, "Password requires a number.")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires a uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),

    confirmPassword: Yup.string()
      .required("** Confirm password is required")
      .oneOf(
        [Yup.ref("password"), null],
        "* The passwords do not match. Please try again"
      ),
  });

  //   const handleOtpVerification = () => {
  //     dispatch(forgotPassword())
  //       .unwrap()
  //       .then((res) => alert(res.message))
  //       .catch((err) => alert(err));
  //   };

  //   if (userPasswordResetStatus === "succeeded") {
  //     return (
  //       <Formik
  //         initialValues={initialValues}
  //         validationSchema={passwordValidationSchema}
  //       >
  //         {(formik) => (
  //           <Form
  //             onSubmit={formik.handleSubmit}
  //             className="border rounded m-4 p-4 bg-body-tertiary "
  //           >
  //             <h3 className="text-center p-4">Reset Password</h3>

  //             <div className="mb-3">
  //               <div className="form-floating mb-3">
  //                 <Field
  //                   type="password"
  //                   className={`form-control ${
  //                     formik.touched.password
  //                       ? formik.errors.password
  //                         ? "is-invalid"
  //                         : "is-valid"
  //                       : ""
  //                   }`}
  //                   id="password"
  //                   name="password"
  //                   placeholder=""
  //                 />
  //                 <label htmlFor="password">Password</label>
  //                 <ErrorMessage
  //                   name="password"
  //                   className="text-danger"
  //                   component="div"
  //                 />
  //               </div>
  //             </div>

  //             <div className="form-floating">
  //               <Field
  //                 type="password"
  //                 className={`form-control ${
  //                   formik.touched.confirmPassword
  //                     ? formik.errors.confirmPassword
  //                       ? "is-invalid"
  //                       : "is-valid"
  //                     : ""
  //                 }`}
  //                 id="confirmPassword"
  //                 name="confirmPassword"
  //                 placeholder=""
  //               />
  //               <label htmlFor="confirmPassword">Confirm password</label>
  //               <ErrorMessage
  //                 name="confirmPassword"
  //                 className="text-danger"
  //                 component="div"
  //               />
  //             </div>

  //             {/* <div className="text-end">
  //               <button
  //                 type="submit"
  //                 className="btn btn-outline-primary rounded-pill mt-3"
  //                 disabled={userRegisterStatus === "loading"}
  //               >
  //                 {userRegisterStatus === "loading" ? (
  //                   <>
  //                     <span
  //                       className="spinner-border spinner-border-sm"
  //                       area-hidden="true"
  //                     ></span>{" "}
  //                     <span role="status">registering...</span>
  //                   </>
  //                 ) : (
  //                   "Register"
  //                 )}
  //               </button>
  //             </div> */}
  //           </Form>
  //         )}
  //       </Formik>
  //     );
  //   }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <form className="border rounded m-4 p-4 bg-body-tertiary">
            <h3 className="text-center p-4">Verify Email Address</h3>

            <div className="row justify-content-center text-center">
              <h5>Enter OTP</h5>
              <div className="col-auto">
                <div className="d-flex mt-3 gap-2 ">
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} />}
                    inputStyle={{
                      width: "30px",
                      height: "35px",
                      borderColor: "gray",
                      outlineColor: "green",
                      borderRadius: "4px",
                    }}
                  />

                  {/* <button
                    type="button"
                    className="btn btn-primary"
                    // disabled={userPasswordResetStatus === "loading"}
                    onClick={handleOtpVerification}
                  >
                    {userPasswordResetStatus === "loading" ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          aria-hidden="true"
                        ></span>{" "}
                        <span role="status">Verifying...</span>
                      </>
                    ) : (
                      "Verify"
                    )}
                  </button> */}
                </div>
              </div>
            </div>

            {/* {userPasswordResetError && (
              <div className="text-danger text-center mt-2">
                {userPasswordResetError}
              </div>
            )} */}

            <div className="text-center">
              <button
                type="button"
                className="btn btn-outline-primary mt-3 rounded-pill"
                onClick={() =>
                  alert("Resend OTP functionality not implemented")
                }
              >
                Resend OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetOtp;
