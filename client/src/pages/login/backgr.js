import "./login.css"
import icon from '../../pics/logo.svg'
import img from '../../pics/img.svg'

export default function Backgr() {
    return (
        <div className="left block">
            <div>
                <div className="title">
                    <img src={icon} className="icon" alt=""/>
                    <h1 className="titlename">Trust Vault</h1>
                </div>
                <div>
                    <span className="subtitle">For Safety Of Your Sensitivity</span>
                </div>
            </div>
            <img src={img} className="image" alt="" />
        </div>
    )
}