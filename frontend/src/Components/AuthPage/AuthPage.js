import React, { useState, useEffect } from 'react';
import Login from './Login';
import Register from './Register';
import './style.scss';

function AuthPage() {
    const [isLogginActive, setLoggin] = useState(true);
    const [mounted, setMounted] = useState(0);

    const Switcher = props => {
        return <div className={`switcher ${isLogginActive ? "right" : "left"} animate__animated ${mounted > 1 ? !isLogginActive ? "animate__slideInRight" : "animate__slideInLeft" : ""}`} onClick={props.onClick}>
            <div className="inner-container">
                <div className="text">{props.current}</div>
            </div>
        </div>
    }

    const changeState = () => {
        isLogginActive ? setLoggin(false) : setLoggin(true);
    }

    useEffect(() => {
        setMounted(m => m + 1);
    }, [isLogginActive]);

    return (
        <div className="authPage">
            <div className="contained">
                <div className="container">
                    {isLogginActive && <Login playAnimation={mounted > 1} />}
                    {!isLogginActive && <Register />}
                </div>
                <Switcher current={isLogginActive ? "Register" : "Login"} onClick={changeState} />
            </div>
        </div>
    )
}

export default AuthPage
