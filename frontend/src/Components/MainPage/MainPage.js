import React from 'react';
import { ToastContainer } from 'react-toastify';
import Header from '../AlwaysVisible/Header';
import Floater from '../AlwaysVisible/Floater';
import MainContent from './MainContent';

function MainPage() {
    return (
        <div className="mainBody">
            <Header currentPage="logins" />
            <Floater />
            <MainContent />
            <ToastContainer />
        </div>
    );
};

export default MainPage;
