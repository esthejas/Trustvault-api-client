import "./home.css";
import Navbar from "../../components/navbar";
import Vaulticon from "../../pics/vault.png";
import plus from "../../pics/plus.png";
import Delete from "../../pics/trash.png";
import Nominee from "../../pics/nomineeicon.png";
import { Link } from "react-router-dom";
import axios from "../../axios";
import { useEffect, useState } from "react";
import { Dialogkey } from "../../components/secretkey";
import { Deletepop } from "../deletevault/deletevault";

// const vaults = [
//     {
//         v_id: 1,
//         v_name: "Lorem it",
//         data: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
//         // n_name: ["aearrtrdctdu","gxayugyu"],
//         n_name: [{n_name:"aearrtrdctdu"},{n_name:"gxayugyu"}],
//     },
//     {
//         v_id: 2,
//         v_name: "cing elit",
//         data: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
//         n_name:["aeactdu"],
//     },
//     {
//         v_id: 3,
//         v_name: " dolor s",
//         data: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
//         n_name:["aeactdu"],
//     },
//     {
//         v_id: 4,
//         v_name: "teturadipisic",
//         data: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
//         n_name:["aeactdu"],
//     },
// ];

export default function Home() {
  const token = sessionStorage.getItem("token");
  const [isError, setError] = useState(null);
  const [vaults, setvaults] = useState([]);
  const [dialogkey, setdialogkey] = useState({
    isLoading: false,
    vaultname: "",
    vId: "",
  });
  const [deletekey, setdeletekey] = useState({
    isLoading: false,
    vaultname: "",
    vId: "",
  });

  const getallvaults = async (e) => {
    try {
      if (token) {
        const res = await axios.get("/vault/getAllVaults", {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        setvaults(res.data.filterData);
      } else {
        alert("Try Again");
      }
    } catch (error) {
      setError(error.response.data);
      // console.log(isError);
      alert(isError.error);
    }
  };

  useEffect(() => {
    getallvaults();
  }, []);

  const handleDialog = (isLoading, vaultname, vId) => {
    setdialogkey({
      isLoading,
      vaultname,
      vId,
    });
  };
  const handleDeletepop = (isLoading, vaultname, vId) => {
    setdeletekey({
      isLoading,
      vaultname,
      vId,
    });
  };

  const opendialog = (id) => {
    const vId = id;
    const index = vaults.findIndex((vaults) => vaults.v_id === id);

    handleDialog(true, vaults[index].v_name, vId);
  };
  const opendeletepop = (id) => {
    const vId = id;
    const index = vaults.findIndex((vaults) => vaults.v_id === id);

    handleDeletepop(true, vaults[index].v_name, vId);
  };

  const areUSure = (choose) => {
    if (choose) {
      // alert("req sent");
      handleDialog(false);
    } else {
      handleDialog(false);
    }
  };

  const areUSure1 = (choose) => {
    if (choose) {
      // alert("req sent");
      handleDeletepop(false);
    } else {
      handleDeletepop(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="homecontainer">
        {vaults.map((vault) => (
          <div className="outvault" key={vault.v_id}>
            <div className="vault 1">
              <div className="invault">
                <div className="vaultdetails">
                  <img
                    src={Vaulticon}
                    onClick={() => opendialog(vault.v_id)}
                    className="homeicon"
                    alt=""
                  />
                  <p className="vaultname" key={vault.v_name}>
                    {vault.v_name}
                  </p>
                </div>
                <div className="sidevault">
                  <div className="nominee">
                    <img src={Nominee} className="nomineeicon" alt="" />
                    <div className="nomineelist">
                      <ul>
                        {vault.n_name.map((n_name, index) => (
                          <li key={index}>{n_name.n_name}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="trash">
                    <img
                      src={Delete}
                      onClick={() => opendeletepop(vault.v_id)}
                      className="trashicon"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="plusicon">
          <Link to="/createvault">
            <img src={plus} className="addicon" alt="" />
          </Link>
        </div>
      </div>
      {dialogkey.isLoading && (
        <Dialogkey
          onDialog={areUSure}
          vaultname={dialogkey.vaultname}
          vId={dialogkey.vId}
        />
      )}
      {deletekey.isLoading && (
        <Deletepop
          onDialog={areUSure1}
          vaultname={deletekey.vaultname}
          vId={deletekey.vId}
        />
      )}
    </div>
  );
}
