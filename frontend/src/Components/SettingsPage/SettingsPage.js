import React from 'react'
import Header from '../AlwaysVisible/Header';
import Floater from '../AlwaysVisible/Floater';

function SettingsPage() {
    return (
        <div className="mainBody">
            <Header />
            <Floater selectedFloater="settings" />
        </div>
    )
}

export default SettingsPage
