import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.scss';
import userIcon from './user.svg';
import passIcon from './key.svg';
import editIcon from './edit.svg';
import logoImg from '../../logo.svg';

function Password({ login, history }) {
    const [image, setImage] = useState("");
    const handleOpen = () => {
        let link = login.website;

        if (!(link.includes("https://") || link.includes("http://")))
            link = "https://" + link;

        window.open(link, '_blank').focus();
    };

    const compareSize = (a, b) => {
        if(a.size > b.size)
            return -1;
        if(a.size < b.size)
            return 1;
        return 0;
    }

    useEffect(() => {
        async function fetchData() {
            let url = login.website;
            if (!url)
                return setImage(logoImg);
            else {
                axios.defaults.withCredentials = false;
                let response = await axios.get(`https://grab-favicons.herokuapp.com/api/v1/grab-favicons?url=${url}`);
                let icons = response.data.sort(compareSize);
                return setImage(icons[0].url);
            }
        };

        fetchData();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="passwordBody">
            <img onClick={e => handleOpen()} src={image} alt="" className={`icon ${login.website !== "" ? "pointer" : ""}`} />
            <div onClick={e => handleOpen()} className={`details ${login.website !== "" ? "pointer" : ""}`}>
                <div className="title">{login.title}</div>
                <div className="login">{login.account}</div>
            </div>
            <div className="actions">
                <img onClick={e => navigator.clipboard.writeText(login.account)} src={userIcon} alt="" className="action" title="Copy Login" />
                <img onClick={e => navigator.clipboard.writeText(login.password)} src={passIcon} alt="" className="action" title="Copy Password" />
                <img onClick={e => history.push("/edit/" + login.id)} src={editIcon} alt="" className="action" title="Edit Login" />
            </div>
        </div>
    )
}

export default Password
