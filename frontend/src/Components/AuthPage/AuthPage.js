import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Login from './Login';
import Register from './Register';
import './style.scss';
import { useLocation } from 'react-router-dom';

function AuthPage() {
    const location = useLocation();
    const [isLogginActive, setLoggin] = useState(!(location.pathname.split('/')[1].toLowerCase() === 'register'));
    const [mounted, setMounted] = useState(0);
    const [username, setUsername] = useState("");

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

    const switchToLogin = registeredUsername => {
        setUsername(registeredUsername);
        setLoggin(true);
    };

    return (
        <div className="authPage">
            <div className="contained">
                <div className="container">
                    {isLogginActive && <Login playAnimation={mounted > 1} registeredUsername={username} />}
                    {!isLogginActive && <Register handle={switchToLogin} />}
                </div>
                <Switcher current={isLogginActive ? "Register" : "Login"} onClick={changeState} />
            </div>
            <ToastContainer />
        </div>
    )
}

export default AuthPage
