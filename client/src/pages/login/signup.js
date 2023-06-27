import "./login.css"

import usernameic from '../../pics/username.png'
import emailic from '../../pics/email.png'
import passwordic from '../../pics/password.png'
import Backgr from "./backgr"
import { useNavigate } from "react-router-dom"
import { useState } from 'react';
import axios from "../../axios";






export default function Signup() {
    const navigate = useNavigate();
    const token1 = sessionStorage.getItem("token")
    if(token1){
        navigate("/home");
    }

    const [isError, setError] = useState(null);
    const [isActive, setIsActive] = useState(false);

    const [inputs, setInputs] = useState({
        username: "",
        lpassword: "",
        lemail: "",
        semail: "",
        spassword: "",
        srepassword: "",
    });

  

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    };


    function svalidateForm() {

        const username = inputs.username
        const email = inputs.semail
        const password = inputs.spassword
        const srepassword = inputs.srepassword

        if (username.length === 0 || email.length === 0 || password.length === 0 || srepassword.length === 0) {
            alert('Please fill all details to signup');
            return false;
        }

        const regex = /^\S+@\S+\.\S+$/;
        if (!regex.test(email)) {
            alert('Please enter a valid email address');
            return false;
        }

        if (password !== srepassword) {
            alert('Confirm Password is not matched with password');
            return false;
        }
        return true;
    }

    const shandleSubmit = async (e) => {
        e.preventDefault();

        const username = inputs.username
        const email = inputs.semail
        const password = inputs.spassword
        const signdetails = { username, email, password }
        // console.log(signdetails);

        if (svalidateForm()) {
            try {
                const response = await axios.post("/auth/signup", signdetails)
                const token = response.data.token;

                if (token) {
                    sessionStorage.setItem('token', token);
                    console.log(token);
                    navigate("/home");
                } else {
                    alert("SignUp Again");
                }
            } catch (error) {
                setError(error.response.data);
                console.log(isError);
                // alert(isError.error);
            }
        }
    }
    
    function lvalidateForm() {
       
        const email = inputs.lemail
        const password = inputs.lpassword


        if ( email.length === 0 || password.length === 0 ) {
            alert('Please fill all details to login');
            return false;
        }

        const regex = /^\S+@\S+\.\S+$/;
        if (!regex.test(email)) {
            alert('Please enter a valid email address');
            return false;
        }

        return true;
    }

    const lhandleSubmit = async (e) => {
        e.preventDefault();

        const email = inputs.lemail
        const password = inputs.lpassword

        const logindetails = { email, password }

        if (lvalidateForm()) {
            try {
                const response = await axios.post("/auth/signin", logindetails)
                const token = response.data.token;

                if (token) {
                    sessionStorage.setItem('token', token);
                    console.log(token);
                    navigate("/home");
                } else {
                    alert("SignUp Again");
                }
            } catch (error) {
                setError(error.response.data);
                // console.log(isError);
                // alert(isError.error);
            }
        }
    }

    const clickrotate = event => {
        setIsActive(current => !current);
    };

    return (
        <div className="container">
            <Backgr />
            <div className="subcont">
                <div className={isActive ? 'right1 cont block' : "right1 rotated cont block"}>
                    <form className="ok" >
                        <h2 className="ls_title">Login</h2>
                        <label >
                            <img src={emailic} className="logicons" alt="" />
                            <input
                                required
                                type="email"
                                className="input"
                                value={inputs.lemail}
                                name="lemail"
                                id="lemail"
                                placeholder="email"
                                onChange={handleChange} />
                        </label>
                        <label >
                            <img src={passwordic} className="logicons" alt="" />
                            <input
                                required
                                type="password"
                                className="input"
                                value={inputs.lpassword}
                                id="lpassword"
                                name="lpassword"
                                placeholder="password"
                                onChange={handleChange} />
                        </label>
                        <div className="forgetpass">
                            <span>Forget password?</span>
                        </div>
                        <button className="button" onClick={lhandleSubmit}>Login</button>
                        <div className="error">
                            {isError && <p >{JSON.stringify(isError.error)}</p>}
                        </div>
                        <div className="movetosignup">
                            <span >Don't have an account ?</span>
                            <span className="sign" onClick={clickrotate} >SignUp</span>
                        </div>
                    </form>
                </div>
                <div className={isActive ? 'right rotated cont block' : "right cont block"}>
                    <form className='ok' >

                        <h2 className="ls_title">SignUp</h2>
                        <label >
                            <img src={usernameic} className="logicons" alt="" />
                            <input type="text"
                                className="input"
                                value={inputs.username}
                                id="username"
                                name="username"
                                placeholder="username"
                                required
                                onChange={handleChange} />
                        </label>
                        <label >
                            <img src={emailic} className="logicons" alt="" />
                            <input type="email"
                                className="input"
                                value={inputs.semail}
                                id="semail"
                                name="semail"
                                placeholder="email"
                                required onChange={handleChange} />
                        </label>
                        <label >
                            <img src={passwordic} className="logicons" alt="" />
                            <input type="password"
                                className="input"
                                value={inputs.spassword}
                                id="spassword"
                                name="spassword"
                                placeholder="password"
                                required
                                onChange={handleChange} />
                        </label>
                        <label >
                            <img src={passwordic} className="logicons" alt="" />
                            <input type="password"
                                className="input"
                                value={inputs.srepassword}
                                id="srepassword"
                                name="srepassword"
                                placeholder="Re-Password"
                                required
                                onChange={handleChange} />
                        </label>
                        <button className="button" onClick={shandleSubmit}>SignUp</button>
                        <div className="error">
                            {isError && <p>{JSON.stringify(isError.error)}</p>}
                        </div>
                        <div className="movetologin">
                            <span >Already have an account ?</span>
                            <span className="log" onClick={clickrotate}>login</span>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}