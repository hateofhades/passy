import React from 'react'
import Header from '../AlwaysVisible/Header';
import Floater from '../AlwaysVisible/Floater';

function SharePage() {
    return (
        <div className="mainBody">
            <Header />
            <Floater selectedFloater="share" />
        </div>
    )
}

export default SharePage
