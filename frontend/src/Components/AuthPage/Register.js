import React, { useState } from 'react';
import logoImg from './logo.svg';
import axios from 'axios';
import './style.scss'
import { toast } from 'react-toastify';

const errorToast = {
    position: "bottom-right",
    pauseOnHover: false,
    draggable: false
}

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validateUsername, setValidateUsername] = useState(true);
    const [validateEmail, setValidateEmail] = useState(true);
    const [validatePassword, setValidatePassword] = useState(true);
    const [firstLoad, setFirstLoad] = useState(true);

    const handleRegister = async () => {
        setFirstLoad(false);

        let validate = validateRegister();
        if (validate.ok) {
            let response = await axios.post("http://localhost:6942/v1/auth/register", {
                username: username,
                email: email,
                password: password
            });
            if (!response.data.code)
                toast("Account registered! Please login.", errorToast);
            else if (response.data.code === 2)
                toast.error("Username is already taken!", errorToast);
            else
                toast.error("Server encountered an error. Please try again.", errorToast);
        } else {
            if (validate.username) {
                toast.error("Username can only contain alphanumeric characters, underscore and dash.", errorToast);
            } if (validate.usernameLength) {
                toast.error("Username needs to be between 6 and 28 characters.", errorToast);
            } if (validate.email) {
                toast.error("Email is invalid.", errorToast);
            } if (validate.password) {
                toast.error("Password needs at least 8 characters, one uppercase and one number", errorToast);
            }
        }
    };

    const validateRegister = () => {
        let validate = { ok: 1 };

        if (!username.match(/^[a-z0-9_-]/)) {
            validate.ok = 0;
            validate.username = true;
            setValidateUsername(false);
        }
        if (username.length < 6 || username.length > 28) {
            validate.ok = 0;
            validate.usernameLength = true;
            setValidateUsername(false);
        }
        if (!email.match(/\S+@\S+\.\S+/)) {
            validate.ok = 0;
            validate.email = true;
            setValidateEmail(false);
        }
        if (!password.match(/(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/)) {
            validate.ok = 0;
            validate.password = true;
            setValidatePassword(false);
        }

        return validate;
    };

    return (
        <div className="base-container">
            <div className="content">
                <div className="image">
                    <img src={logoImg} alt="" />
                </div>
                <div className="form">
                    <div className={`form-group animate__animated ${validateUsername ? "" : "animate__bounce"}`}>
                        <label style={{ color: validateUsername ? "black" : "red" }} htmlFor="username">Username</label>
                        <input onChange={e => { setUsername(e.target.value); setValidateUsername(true) }} value={username} type="text" name="username" placeholder="Username" />
                    </div>
                    <div className={`form-group animate__animated ${validateEmail ? firstLoad ? "animate__fadeIn" : "" : "animate__bounce"}`}>
                        <label style={{ color: validateEmail ? "black" : "red" }} htmlFor="email">Email</label>
                        <input onChange={e => { setEmail(e.target.value); setValidateEmail(true) }} value={email} type="email" name="email" placeholder="Email" />
                    </div>
                    <div className={`form-group animate__animated ${validatePassword ? firstLoad ? "animate__slideInDown" : "" : "animate__bounce"}`}>
                        <label style={{ color: validatePassword ? "black" : "red" }} htmlFor="password">Password</label>
                        <input onChange={e => { setPassword(e.target.value); setValidatePassword(true) }} value={password} type="password" name="password" placeholder="Password" />
                    </div>
                </div>
            </div>
            <div className="footer">
                <button onClick={handleRegister} type="button" className="btn animate__animated animate__fadeIn">Register</button>
            </div>
        </div>
    );
}

export default Register;
