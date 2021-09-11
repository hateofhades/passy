import React from 'react';
import logoImg from './logo.svg';
import './style.scss'

function Register() {
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
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="Password" />
                    </div>
                </div>
            </div>
            <div className="footer">
                <button type="button" className="btn">Register</button>
            </div>
        </div>
    );
}

export default Register;
