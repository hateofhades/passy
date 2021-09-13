import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/user';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Logout() {
    let history = useHistory();
    const dispatch = useDispatch();

    const handleLogout = () => {
        axios.get("http://localhost:6942/v1/auth/logout");
        dispatch(logout());
    };

    useEffect(() => {
        handleLogout();
        history.push('/');
    });

    return (
        <div>

        </div>
    )
}

export default Logout
