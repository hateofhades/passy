import React from 'react'
import Header from '../AlwaysVisible/Header';
import Floater from '../AlwaysVisible/Floater';

function GeneratorPage() {
    return (
        <div className="mainBody">
            <Header />
            <Floater selectedFloater="generator" />
        </div>
    )
}

export default GeneratorPage
