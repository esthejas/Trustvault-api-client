import axios from "../../axios";
import { useState } from "react";
import "../../components/secretkey.css";

const token = sessionStorage.getItem("token");
const refresh = () => window.location.reload(true);

function Deletepop({ onDialog, vaultname, vId }) {
  const [password, setpassword] = useState(null);

  const deletevault = async (e) => {
    onDialog(true);

    try {
      if (token) {
        await axios.delete(`/vault/deleteVault/${vId}`, {
          data: { password: password },
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        refresh();
      } else {
        alert("Try Again");
      }
    } catch (e) {
      const err = JSON.stringify(e.response.data.error);
      console.log(err);
      alert(err);
    }
  };

  return (
    <div className="d_container">
      <div className="d_sub_container">
        <div className="d_details">
          <span className="d_heading">
            Enter Password to delete {vaultname} vault{" "}
          </span>
        </div>
        <div>
          <input
            required
            onChange={(e) => setpassword(e.target.value)}
            className="d_details d_secretkey"
            type="password"
            placeholder="Type your account Password"
          />
        </div>
        <div className="d_details">
          <button className="d_ok" onClick={deletevault}>
            Enter
          </button>
          <button className="d_cancel" onClick={() => onDialog(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
export { Deletepop };
