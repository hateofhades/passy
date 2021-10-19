import React, { useEffect, useState } from 'react';
import './styles.scss';
import Password from './Password';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

function MainContent() {
    const [passwords, setPasswords] = useState([]);
    let history = useHistory();
    const user = useSelector(state => state.user.value);

    useEffect(() => {
        async function fetchPasswords() {
            axios.defaults.withCredentials = true;
            let response = await axios.post("http://localhost:6942/v1/passwords/get", {
                encryptionKey: user.encryptionKey
            });

            if (response.data.code === 0) {
                setPasswords(response.data.passwords);
            }
            else history.push("/logout");
        }
        fetchPasswords();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="mainContent animate__animated animate__fadeIn">
            <div className="scrollableContent">
                    {passwords.map((passwordObject, index) => {
                        return (
                            <Password
                                key={passwordObject.id}
                                history={history}
                                login={{
                                    id: passwordObject.id,
                                    title: passwordObject.title,
                                    account: passwordObject.account,
                                    password: passwordObject.password,
                                    website: passwordObject.website
                                }}
                            />
                        )
                    })}
            </div>
        </div>
    );
};

export default MainContent;
