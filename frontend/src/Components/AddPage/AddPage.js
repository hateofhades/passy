import React, { useState } from 'react'
import Header from '../AlwaysVisible/Header';
import Floater from '../AlwaysVisible/Floater';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import './styles.scss';
import axios from 'axios';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

const errorToast = {
    position: "bottom-right",
    pauseOnHover: false,
    draggable: false
}

function AddPage() {
    const user = useSelector(state => state.user.value);
    let history = useHistory();

    const [name, setName] = useState("");
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const [website, setWebsite] = useState("");

    const handleAdd = async () => {
        if (!isUndefined()) {
            axios.defaults.withCredentials = true;
            let response = await axios.post("http://localhost:6942/v1/passwords/add", {
                encryptionKey: user.encryptionKey,
                name: name,
                account: account,
                password: password,
                website: website
            });
            if (response.data.code === 1) {
                history.push("/logout");
            } else if (response.data.code === 2) {
                toast.error("Something went wrong.", errorToast);
            } else if (response.data.code === 0) {
                history.push("/");
            } else {
                toast.error("Something went wrong.", errorToast);
            }
        }
    }

    const isUndefined = () => {
        let ok = true;

        if (name === "") {
            ok = false;
            toast.error("Name cannot be undefined.", errorToast);
        }
        if (account === "") {
            ok = false;
            toast.error("Account cannot be undefined.", errorToast);
        }
        if (password === "") {
            ok = false;
            toast.error("Password cannot be undefined", errorToast);
        }

        return !ok;
    }

    return (
        <div className="mainBody">
            <Header currentPage="add" />
            <div className="mainContent animate__animated animate__fadeIn">
                <div className="itemInfo">
                    <div className="item">
                        <span for="name">Name</span>
                        <input value={name} onChange={e => setName(e.target.value)} type="text" name="name" className="name" />
                    </div>
                    <div className="item">
                        <span for="account">Account</span>
                        <input value={account} onChange={e => setAccount(e.target.value)} type="text" name="account" className="account" />
                    </div>
                    <div className="item">
                        <span for="password">Password</span>
                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" name="password" className="password" />
                    </div>
                    <div className="item">
                        <span for="website">Website</span>
                        <input value={website} onChange={e => setWebsite(e.target.value)} type="text" name="website" className="website" />
                    </div>
                    <div className="item">
                        <button onClick={e => handleAdd()} className="add-btn" type="button">Add login</button>
                    </div>
                </div>
            </div>
            <Floater />
            <ToastContainer />
        </div>
    )
}

export default AddPage
