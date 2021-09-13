import React from 'react'
import './floater.scss';
import logoutImg from './logout.svg';
import syncImg from './sync.svg';
import sendImg from './send.svg';
import generatorImg from './password.svg';
import settingsImg from './settings.svg';
import { useHistory } from 'react-router-dom';

function Floater() {
    let history = useHistory();
    return (
        <div className="floater-body">
            <img src={syncImg} alt="" title="Synchronize passwords" />
            <img src={sendImg} alt="" title="Share password" />
            <img src={generatorImg} alt="" title="Generate password" />
            <img src={settingsImg} alt="" title="Settings" />
            <img onClick={e => history.push("/logout")} src={logoutImg} alt="" title="Logout" />
        </div>
    )
}

export default Floater
