import React from 'react'
import Header from '../Header/Header';
import Floater from '../Header/Floater';

function CategoriesPage() {
    return (
        <div className="mainBody">
            <Header currentPage="categories" />
            <Floater />
        </div>
    )
}

export default CategoriesPage
