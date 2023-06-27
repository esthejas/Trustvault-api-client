import Navbar from "../../components/navbar";
import "./viewvault.css";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import Secrertdata from "../../components/context";
import axios from "../../axios";

const token = sessionStorage.getItem("token");

export default function Viewvault() {
  const { secr } = useContext(Secrertdata);

  const [vievaults, Setvievaults] = useState({
    data: null,
    description: null,
    nominee: [{ v_id: null, n_email: null, n_name: null, n_ph_no: null }],
    v_id: null,
    v_name: null,
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
        Setvievaults(res.data);
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

  const search = useLocation().search;
  const vId = new URLSearchParams(search).get("vid");
  const nom = vievaults.nominee;

  return (
    <div>
      <Navbar />
      <div className="vi_container">
        <Link to={`/updatevault?v_id=${vId}`}>
          <button className="vi_button">Edit Vault</button>
        </Link>
        <div className="">
          <h1 className="vi_title"> {vievaults.v_name} </h1>
        </div>
        <div className="vi_desc_container">
          <div>
            <h2 className="vi_sub_title">Description </h2>
          </div>
          <div>
            <p className="vi_desc">{vievaults.description}</p>
          </div>
        </div>
        <div className="vi_n_container">
          <div className="">
            <h2 className="vi_n_sub_title">Nominee Details </h2>
          </div>
          {nom.map((nom_detail, index) => (
            <div key={index} className="vi_n_details">
              <div className="vi_n_detail">
                <h3 className="vi_n_heading">{index + 1}.</h3>
              </div>
              <div className="vi_n_detail">
                <h3 className="vi_n_heading">Name : </h3>
                <span>{nom_detail.n_name}</span>
              </div>
              <div className="vi_n_detail">
                <h3 className="vi_n_heading">Email : </h3>
                <span>{nom_detail.n_email}</span>
              </div>
              <div className="vi_n_detail">
                <h3 className="vi_n_heading">Mobile No. : </h3>
                <span>{nom_detail.n_ph_no}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="vi_data_container">
          <div className="">
            <h2 className="vi_sub_title">Data </h2>
          </div>
          <div className="">
            <p>{vievaults.data}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
