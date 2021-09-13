import React from 'react';
import './header.scss';
import logoImg from '../../logo.svg';
import plusImg from './plus.svg';
import { useHistory } from 'react-router-dom';

function Header({ currentPage }) {
    let history = useHistory();
    return (
        <div className="header-body">
            <div className="identifier">
                <img src={logoImg} alt="" />
                <div className="title">Passy</div>
            </div>
            <div onClick={e => history.push("/")} className={`header-selector ${currentPage === "logins" ? "selected" : ""}`}>
                <p>Logins</p>
            </div>
            <div onClick={e => history.push("/categories")} className={`header-selector ${currentPage === "categories" ? "selected" : ""}`}>
                <p>Categories</p>
            </div>
            <div onClick={e => history.push("/add")} className="add-item">
                <img src={plusImg} alt="" />
            </div>
        </div>
    );
};

export default Header;
