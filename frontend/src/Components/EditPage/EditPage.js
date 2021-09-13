import React from 'react'
import { useParams } from 'react-router-dom';
import Header from '../AlwaysVisible/Header';
import Floater from '../AlwaysVisible/Floater';

function EditPage() {
    let { id } = useParams();

    return (
        <div>
            <Header />
            <div className="mainContent animate__animated animate__fadeIn">
                {id}
            </div>
            <Floater />
        </div>
    )
}

export default EditPage
