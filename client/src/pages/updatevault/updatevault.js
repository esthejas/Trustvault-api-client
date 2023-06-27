import Navbar from "../../components/navbar";
import { useState, useEffect } from "react";
import d_icon from "../../pics/trash.png";
import TextareaAutosize from "react-textarea-autosize";
import axios from "../../axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import Secrertdata from "../../components/context";

const token = sessionStorage.getItem("token");

export default function Updatevault() {
  const { secr } = useContext(Secrertdata);
  const navigate = useNavigate();

  const location = useLocation();

  const search = useLocation().search;
  const vId = new URLSearchParams(search).get("v_id");

  console.log(vId);
  const [secret, Setsecret] = useState("");
  const [isError, setError] = useState(null);
  const [count, setcount] = useState(1);
  const [nominees, setnominees] = useState([
    {
      n_name: "",
      n_email: "",
      n_ph_no: "",
    },
  ]);

  const addReplica = () => {
    if (nomineevalidateForm()) {
      setcount(count + 1);
      let newnominee = { n_name: "", n_email: "", n_ph_no: "" };
      setnominees([...nominees, newnominee]);
    }
  };

  const deleteReplica = (index) => {
    setcount(count - 1);
    let data = [...nominees];
    data.splice(index, 1);
    setnominees(data);
  };

  const [inputs, setInputs] = useState({
    v_name: "",
    description: "",
    data: "",
  });

  const displayvaults = async (e) => {
    try {
      if (token) {
        const res = await axios.post(`/vault/displayVault`, secr, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        setInputs(res.data);
        setnominees(res.data.nominee);
      } else {
        alert("Try Again");
      }
    } catch (e) {
      const err = JSON.stringify(e.response.data.error);
      console.log(err);
      alert(err);
    }
  };

  useEffect(() => {
    displayvaults();
  }, []);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const n_handleChange = (index, event) => {
    let data = [...nominees];
    data[index][event.target.name] = event.target.value;
    setnominees(data);
  };

  const v_name = inputs.v_name;
  const description = inputs.description;
  const data = inputs.data;
  const vaultSecretKey = secret;
  const n_name1 = [];
  const n_email1 = [];
  const n_ph_no1 = [];

  for (let i = 0; i < count; i++) {
    n_name1[i] = nominees[i].n_name;
    n_email1[i] = nominees[i].n_email;
    n_ph_no1[i] = nominees[i].n_ph_no;
  }

  function nomineevalidateForm() {
    for (let i = 0; i < count; i++) {
      if (
        n_email1[i].length === 0 ||
        n_name1[i].length === 0 ||
        n_ph_no1[i].length === 0
      ) {
        alert("Please fill all above nominee details to add new nominee");
        return false;
      }
    }
    return true;
  }

  function createvaultvalidateForm() {
    if (
      v_name.length === 0 ||
      description.length === 0 ||
      data.length === 0 ||
      vaultSecretKey.length === 0 ||
      n_email1[count - 1].length === 0 ||
      n_name1[count - 1].length === 0 ||
      n_ph_no1[count - 1].length === 0
    ) {
      alert("Please fill all details to createvault");
      return false;
    }

    const regex = /^\S+@\S+\.\S+$/;
    for (let i = 0; i < count; i++) {
      if (!regex.test(n_email1[i])) {
        alert("Please enter a valid email address");
        return false;
      }
    }

    return true;
  }

  const createhandleSubmit = async (e) => {
    e.preventDefault();

    const vaultdetails = {
      v_name,
      vaultSecretKey,
      nomineeDetails: nominees,
      description,
      data,
    };

    if (createvaultvalidateForm()) {
      try {
        if (token) {
          await axios.put(`/vault/updateVault/${vId}`, vaultdetails, {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          });

          navigate("/home");
        } else {
          alert("Try Again");
        }
      } catch (error) {
        setError(error.response.data);
        console.log(isError);
        console.log(error);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="v_container">
        <div className="vaultcontainer">
          <form action="">
            <div>
              <h1 className="v_heading">Vault Details</h1>
            </div>
            <label>
              <span className="v_details_titles">Vault Name : </span>
              <input
                type="text"
                className="v_details"
                name="v_name"
                value={inputs.v_name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              <span className="v_details_titles">Vault Secret Key : </span>
              <input
                type="password"
                className="v_details"
                onChange={(e) => Setsecret(e.target.value)}
                required
              />
            </label>
            <label>
              <span className="v_details_titles">Description : </span>
              <TextareaAutosize
                type="text"
                maxRows={4}
                placeholder="... Describe about secret key so the nominee can find the key and access data ..."
                maxlength="200"
                className="v_details v_desc"
                name="description"
                value={inputs.description}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              <div>
                <span className="v_details_titles">Nominee Details :</span>
              </div>
              <div className="n_details">
                {nominees.map((nominees, index) => (
                  <div key={index} className="n_container">
                    <label>
                      <input
                        type="text"
                        placeholder={`Nominee -${index + 1}  Name`}
                        className="v_details"
                        id={`Nominee - ${index + 1}  Name`}
                        name="n_name"
                        value={nominees.n_name}
                        onChange={(event) => n_handleChange(index, event)}
                        required
                      />
                    </label>
                    <label>
                      <input
                        type="email"
                        placeholder={`Nominee - ${index + 1}  Email`}
                        className="v_details"
                        name="n_email"
                        id={`Nominee - ${index + 1}  Email`}
                        value={nominees.n_email}
                        onChange={(event) => n_handleChange(index, event)}
                        required
                      />
                    </label>
                    <label>
                      <input
                        type="tel"
                        placeholder={`Nominee - ${index + 1}  Mobile No.`}
                        className="v_details"
                        name="n_ph_no"
                        id={`Nominee - ${index + 1}  Mobile No.`}
                        value={nominees.n_ph_no}
                        onChange={(event) => n_handleChange(index, event)}
                        required
                      />
                    </label>
                    <img
                      onClick={() => deleteReplica(index)}
                      src={d_icon}
                      className="d_icon"
                      alt=""
                    />
                  </div>
                ))}
                <div className="">
                  <button onClick={addReplica} className="add_button">
                    Add Nominee
                  </button>
                </div>
              </div>
            </label>
            <label>
              <span className="v_details_titles">Data : </span>
              <TextareaAutosize
                minRows={5}
                type="text"
                className="v_details v_data"
                name="data"
                value={inputs.data}
                onChange={handleChange}
                required
              />
            </label>
            <div className="">
              <button className="cv_button " onClick={createhandleSubmit}>
                Create Vault
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
