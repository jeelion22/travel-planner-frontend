import React from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form className="border rounded m-4 p-4 bg-body-tertiary">
            <h3 className="text-center p-4">Forgot Password?</h3>

            <div className="row ">
              <div className="col">
                <div class="mb-3">
                  <div class="form-floating mb-3">
                    <input
                      type="email"
                      class="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                    />
                    <label for="floatingInput">Email address</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button type="submit" class="btn btn-outline-primary mt-3">
                Send password reset link
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="row justify-content-center text-center">
        <div className="col-md-6">
          <div className="border rounded p-4 m-4 bg-body-tertiary">
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
