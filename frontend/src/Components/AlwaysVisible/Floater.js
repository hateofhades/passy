import React from 'react'
import './floater.scss';
import logoutImg from './logout.svg';
import syncImg from './sync.svg';
import sendImg from './send.svg';
import generatorImg from './password.svg';
import settingsImg from './settings.svg';
import { useHistory } from 'react-router-dom';

function Floater({ selectedFloater }) {
    let history = useHistory();
    return (
        <div className="floater-body">
            <img className={`${selectedFloater === "sync" ? "floater-selected" : ""}`} onClick={e => history.push("/sync")} src={syncImg} alt="" title="Synchronize passwords" />
            <img className={`${selectedFloater === "share" ? "floater-selected" : ""}`} onClick={e => history.push("/share")} src={sendImg} alt="" title="Share password" />
            <img className={`${selectedFloater === "generator" ? "floater-selected" : ""}`} onClick={e => history.push("/generator")} src={generatorImg} alt="" title="Generate password" />
            <img className={`${selectedFloater === "settings" ? "floater-selected" : ""}`} onClick={e => history.push("/settings")} src={settingsImg} alt="" title="Settings" />
            <img onClick={e => history.push("/logout")} src={logoutImg} alt="" title="Logout" />
        </div>
    )
}

export default Floater
