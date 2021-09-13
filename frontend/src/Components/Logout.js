import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/user';
import axios from 'axios';

function Logout() {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        await axios.get("http://localhost:6942/v1/auth/logout");
        dispatch(logout());
    };

    return (
        <div>
            <button onClick={handleLogout} type="button" className={`btn`}>Logout</button>
        </div>
    )
}

export default Logout
