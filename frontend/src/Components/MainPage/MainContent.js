import React from 'react';
import './styles.scss';
import Password from './Password';
import { useHistory } from 'react-router-dom';
function MainContent() {
    let history = useHistory();
    return (
        <div className="mainContent animate__animated animate__fadeIn">
            <div className="scrollableContent">
                <Password
                    history={history}
                    image="https://play-lh.googleusercontent.com/ccWDU4A7fX1R24v-vvT480ySh26AYp97g1VrIB_FIdjRcuQB2JP2WdY7h_wVVAeSpg"
                    login={{
                        id: "1",
                        title: "Facebook",
                        account: "nache.cuceritorul.de.femei@gmail.com",
                        password: "...",
                        website: "...",
                        application: "..."
                    }}
                />
            </div>
        </div>
    );
};

export default MainContent;
