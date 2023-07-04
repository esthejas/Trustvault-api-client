import React, { useState } from "react";
import axios from "../../axios";
import icon from "../../pics/logo.svg";
import { useLocation } from "react-router-dom";

export default function Nomgetdata() {
  const urlParams = new URLSearchParams(window.location.search);
  const v_id = urlParams.get("v_id");
  const location = useLocation();
  const description = location.state;

  const [vaultSecretKey, SetVaultSecretKey] = useState("");
  const [isclicked, setisclicked] = useState(false);
  const [reso, setreso] = useState("");

  const getVaultData = async () => {
    const res = await axios.post("nominee/vaultData", {
      vault_secret_key: vaultSecretKey,
      v_id: v_id,
    });

    setreso(res.data.vault_data);
    console.log(res.data);
    setisclicked(true);
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
            <span className="otpsubheading">
              For Safety Of Your Sensitivity
            </span>
          </div>
        </div>
      </div>
      <div className="otpcardcontainer">
        {!isclicked ? (
          <div className="otpcard">
            <h2 className="otpcardheading">Enter The SecretKey</h2>
            <h3>{description}</h3>
            <input
              name="vault_secret_key"
              type="text"
              placeholder="Enter Key"
              className="otpemail"
              value={vaultSecretKey}
              onChange={(e) => SetVaultSecretKey(e.target.value)}
            />
            <button
              className="sendotp"
              onClick={(event) => {
                event.preventDefault();
                getVaultData();
              }}
            >
              Submit
            </button>
          </div>
        ) : (
          <div className="otpcontainer">
            <div className="datacard">
              <div className="upper">
                <h1 className="datacardheading">Vault Data From The User</h1>
                <div className="circle1new"></div>
              </div>

              <div className="datacardcontent">{reso}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
