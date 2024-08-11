import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "../styles/Register.css";

const Register = () => {
  const [value, setValue] = useState();

  return (
    <div className="container">
      <div className="row justify-content-center ">
        <div className="col-md-6">
          <form className="border rounded m-4 p-4 bg-body-tertiary ">
            <h3 className="text-center p-4">Register</h3>

            <div className="mb-3">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label for="floatingInput">Firstname</label>
              </div>
            </div>

            <div className="mb-3">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label for="floatingInput">Lastname</label>
              </div>
            </div>

            <div className="row ">
              <div className="col">
                <div className="mb-3">
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                    />
                    <label for="floatingInput">Email address</label>
                  </div>
                </div>
              </div>

              <div className="col-auto align-self-center ">
                <button type="submit" className="btn btn-outline-primary">
                  Verify
                </button>
              </div>
            </div>

            <div className="mb-3">
              <div className="form-floating mb-3 ">
                <PhoneInput
                  className="form-control d-flex phone-input-border"
                  international
                  value={value}
                  onChange={setValue}
                  on
                />

                <label htmlFor="floatingInput">Phone</label>
              </div>
            </div>

            <div className="mb-3">
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label for="floatingInput">Password</label>
              </div>
            </div>

            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
              />
              <label for="floatingPassword">Confirm password</label>
            </div>

            <div className="text-end">
              <button type="submit" class="btn btn-outline-primary mt-3">
                Register
              </button>
            </div>
          </form>
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
