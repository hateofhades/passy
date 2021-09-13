import React from 'react'
import Header from '../AlwaysVisible/Header';
import Floater from '../AlwaysVisible/Floater';

function AddPage() {
    return (
        <div className="mainBody">
            <Header currentPage="add" />
            <Floater />
        </div>
    )
}

export default AddPage
