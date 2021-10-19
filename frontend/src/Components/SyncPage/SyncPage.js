import React from 'react'
import Header from '../AlwaysVisible/Header';
import Floater from '../AlwaysVisible/Floater';

function SyncPage() {
    return (
        <div className="mainBody">
            <Header />
            <Floater selectedFloater="sync" />
        </div>
    )
}

export default SyncPage
