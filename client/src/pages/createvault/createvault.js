import Navbar from "../../components/navbar";
import "./createvault.css";
import TextareaAutosize from "react-textarea-autosize";
import { useState } from "react";
import d_icon from "../../pics/trash.png";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";

const token = sessionStorage.getItem("token");

export default function Createvault() {
  const navigate = useNavigate();

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
    v_seckey: "",
    v_desc: "",
    v_data: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const n_handleChange = (index, event) => {
    let data = [...nominees];
    data[index][event.target.name] = event.target.value;
    setnominees(data);
  };
 
  const v_name = inputs.v_name;
  const description = inputs.v_desc;
  const data = inputs.v_data;
  const vaultSecretKey = inputs.v_seckey;
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
        await axios.post("/vault/addVault", vaultdetails,{headers: {
          "Content-Type": "application/json",
          "Authorization": token
      },});
        console.log(token);
        navigate("/home");
      } else {
        alert("Try Again");
      }
    } catch (error) {
      setError(error.response.data);
      // console.log(isError);
      alert(isError.error);
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
                name="v_seckey"
                value={inputs.v_seckey}
                onChange={handleChange}
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
                name="v_desc"
                value={inputs.v_desc}
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
                name="v_data"
                value={inputs.v_data}
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
