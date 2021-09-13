import React from 'react'
import Header from '../AlwaysVisible/Header';
import Floater from '../AlwaysVisible/Floater';

function CategoriesPage() {
    return (
        <div className="mainBody">
            <Header currentPage="categories" />
            <Floater />
        </div>
    )
}

export default CategoriesPage
