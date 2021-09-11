import React from 'react';
import logoImg from './logo.svg';
import './style.scss'
import { Link } from '@material-ui/core';

function Login({ playAnimation }) {
    return (
        <div className="base-container">
            <div className="content">
                <div className="image">
                    <img src={logoImg} alt="" />
                </div>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" placeholder="Username" />
                    </div>
                    <div className={`form-group animate__animated ${playAnimation ? "animate__slideInUp" : ""}`}>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="Password" />
                    </div>
                </div>
            </div>
            <div className="footer">
                <button type="button" className={`btn animate__animated ${playAnimation ? "animate__fadeIn" : ""}`}>Login</button>
                <Link className={`text animate__animated ${playAnimation ? "animate__fadeIn" : ""}`} color="inherit" href="#" variant="body2" onClick={e => e.preventDefault()}>Problems logging in?</Link>
            </div>
        </div >
    );
}

export default Login;
