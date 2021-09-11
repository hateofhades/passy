import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import './style.scss';


function AuthPage() {
    const [isLogginActive, setLoggin] = useState(true);

    const Switcher = props => {
        return <div className={`switcher ${isLogginActive ? "right" : "left"}`} onClick={props.onClick}>
            <div className="inner-container">
                <div className="text">{props.current}</div>
            </div>
        </div>
    }

    const changeState = () => {
        isLogginActive ? setLoggin(false) : setLoggin(true);
    }

    return (
        <div className="authPage">
            <div className="contained">
                <div className="container">
                    {isLogginActive && <Login />}
                    {!isLogginActive && <Register />}
                </div>
                <Switcher current={isLogginActive ? "Register" : "Login"} onClick={changeState} />
            </div>
        </div>
    )
}

export default AuthPage
