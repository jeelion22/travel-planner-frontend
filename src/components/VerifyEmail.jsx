import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import userServices from "../../services/userServices";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");

  const verifyOtp = async (userId, otp) => {
    try {
      const response = await userServices.verify(userId, otp);
      alert(response.data);
    } catch (err) {
      alert(err.response.message);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
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
                  <button type="submit" class="btn btn-primary">
                    Verify
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                class="btn btn-outline-primary mt-3 rounded-pill"
              >
                Resent OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
