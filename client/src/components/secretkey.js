import {  useState  } from "react";
import "./secretkey.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Secrertdata from '../components/context'



 function Dialogkey({ onDialog, vaultname,vId }) {

  const navigate = useNavigate();
  const {usergvndata} = useContext(Secrertdata);
  const [vaultSecretKey, setSecrertkey] = useState(null);
 

  const displayvaults = async (e) => {
    onDialog(true);
    usergvndata(vaultSecretKey,vId)
    navigate(`/viewvault?vid=${vId}`);
  };

  return (
    <div className="d_container">

      <div className="d_sub_container">
        <div className="d_details">
          <span className="d_heading">Secret Key of {vaultname} </span>
        </div>
        <div>
          <input
            required
            onChange={(e) => setSecrertkey(e.target.value)}
            className="d_details d_secretkey"
            type="password"
            placeholder="Type your Secret Key"
          />
        </div>
        <div className="d_details">
          <button className="d_ok" onClick={displayvaults}>
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

export {Dialogkey} ;