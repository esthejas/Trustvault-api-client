import './navbar.css'
import { Link } from 'react-router-dom'
import icon from '../pics/logo.svg'
import profileicon from '../pics/profpic.png'

export default function Navbar() {

    return (
        <div className="">
            <div className="navcontainer">
                <div className="title-block">
                    <img src={icon} className="titleicon" alt="" />
                    <Link to ='/home'className="titletext">Trust Vault</Link>
                </div>
                <div className="profilecont">
                    <img src={profileicon} className="profileimage" alt="" />
                    <div className="profilemenu">
                        <ul>
                            <li>Profile</li>
                            <li>Logout</li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}