import React from 'react'
import './styles.scss';
import userIcon from './user.svg';
import passIcon from './key.svg';
import editIcon from './edit.svg';

function Password({ image, login, history }) {
    return (
        <div className="passwordBody">
            <img src={image} alt="" className="icon" />
            <div className="details">
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
