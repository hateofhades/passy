import React, { useState } from 'react';
import logoImg from '../../logo.svg';
import './style.scss'
import { Link } from '@material-ui/core';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { login } from '../../features/user';
import { useHistory } from 'react-router';

const errorToast = {
    position: "bottom-right",
    pauseOnHover: false,
    draggable: false
}

function Login({ playAnimation, registeredUsername }) {
    const dispatch = useDispatch();

    const [username, setUsername] = useState(registeredUsername);
    const [password, setPassword] = useState("");
    const [validateUsername, setValidateUsername] = useState(true);
    const [validatePassword, setValidatePassword] = useState(true);

    const [playAnimationState, setPlayAnimationState] = useState(playAnimation);

    let history = useHistory();

    const handleLogin = async () => {
        setPlayAnimationState(false);

        if (username !== "" && password !== "") {
            let response = await axios.post("http://localhost:6942/v1/auth/login", {
                username: username,
                password: password
            });

            if (!response.data.code) {
                dispatch(login({ username: username, encryptionKey: password }));
                history.push('/');
            } else if (response.data.code === 1) toast.error("Username or password is incorrect.", errorToast);
            else toast.error("Username or password is undefined.", errorToast);
        } else {
            if (username === "") {
                toast.error("Username cannot be empty.", errorToast);
                setValidateUsername(false);
            }
            if (password === "") {
                toast.error("Password cannot be empty.", errorToast);
                setValidatePassword(false);
            }
        }
    };

    return (
        <div className="auth-base-container">
            <div className="content">
                <div className="image">
                    <img src={logoImg} alt="" />
                </div>
                <div className="form">
                    <div className={`form-group animate__animated ${!validateUsername ? "animate__bounce" : ""}`}>
                        <label style={{ color: validateUsername ? "black" : "red" }} htmlFor="username">Username</label>
                        <input onChange={e => { setUsername(e.target.value); setValidateUsername(true); }} type="text" value={username} name="username" placeholder="Username" />
                    </div>
                    <div className={`form-group animate__animated ${playAnimationState ? "animate__slideInUp" : ""} ${!validatePassword ? "animate__bounce" : ""}`}>
                        <label style={{ color: validatePassword ? "black" : "red" }} htmlFor="password">Password</label>
                        <input onChange={e => { setPassword(e.target.value); setValidatePassword(true); }} type="password" value={password} name="password" placeholder="Password" />
                    </div>
                </div>
            </div>
            <div className="footer--auth">
                <button onClick={handleLogin} type="button" className={`auth-btn animate__animated ${playAnimation ? "animate__fadeIn" : ""}`}>Login</button>
                <Link className={`text animate__animated ${playAnimation ? "animate__fadeIn" : ""}`} color="inherit" href="#" variant="body2" onClick={e => e.preventDefault()}>Problems logging in?</Link>
            </div>
        </div >
    );
}

export default Login;
