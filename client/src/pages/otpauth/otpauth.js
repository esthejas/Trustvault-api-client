import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import icon from "../../pics/logo.svg";
import "./otpauth.css";

export default function NomOtpAuth() {
  const urlParams = new URLSearchParams(window.location.search);
  const v_id = urlParams.get("v_id");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const verifyEmail = async () => {
    // console.log(email);
    try {
      const res = await axios.post("/nominee/email", {
        email: email,
      });
      const { token, message } = res.data;
      console.log(token);
      if (token) {
        sessionStorage.setItem("jwt", token);
      } else {
        setError("Something Went Wrong!!Try again later");
      }
      setMessage(message);
      setClicked(true);
      setEmail("");
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const verifyOtp = async () => {
    try {
      console.log(otp);
      console.log(v_id);
      const token = sessionStorage.getItem("jwt");
      const res = await axios.post(
        "/nominee/otpverify",
        {
          otp: otp,
          v_id: v_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      );

      const { message, description } = res.data;
      setMessage(message);
      console.log(description);
      navigate(`/nominee/vault?v_id=${v_id}`, { state: description });
      setOtp("");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="otpcontainer">
      <div className="header">
        <div className="iconcontainer">
          <img src={icon} className="icon" alt="" />
        </div>
        <div>
          <div>
            <h1 className="otpheading">TrustVault</h1>
          </div>
          <div>
            <span className="otpsubheading">For Safety Of Your Sensitivity</span>
          </div>
        </div>
      </div>
      <div className="otpcardcontainer">
        <div className="otpcard">
          {error !== "" && <div className="error">{error}</div>}
          <h2 className="otpcardheading">
            {!clicked ? "Verify Your Mail" : "Verify Your OTP"}
          </h2>
          {!clicked ? (
            <input
              name="email"
              type="email"
              placeholder="Enter Email"
              className="otpemail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          ) : (
            <input
              name="otp"
              type="text"
              placeholder="Enter OTP"
              className="otpemail"
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
            />
          )}

          {!clicked ? (
            <button
              className="sendotp"
              onClick={(event) => {
                event.preventDefault();
                verifyEmail();
              }}
            >
              Send OTP
            </button>
          ) : (
            <button
              className="sendotp"
              onClick={(event) => {
                event.preventDefault();
                verifyOtp();
              }}
            >
              Verify OTP
            </button>
          )}
          <div>{message}</div>
        </div>
      </div>
    </div>
  );
}
