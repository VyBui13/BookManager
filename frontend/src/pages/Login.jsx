// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { nofi } from '../components/Notify.jsx';
import '../styles/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'

function Login({ setIsAuthenticated }) {
    const [useraccount, setUseraccount] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleSubmit() {
        fetch('http://localhost:5000/users/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userAccount: useraccount, userPassword: password }),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.status === 'error') {
                    nofi({ type: 'error', msg: data.message });
                    return;
                }
                nofi({ type: 'success', msg: data.message });
                setIsAuthenticated(true);
                navigate('/');

            })
            .catch((err) => {
                nofi({ type: 'error', msg: err.message });
            });
    };

    return (
        <div className="login-container">
            <div className="login">
                <div className="login__title">
                    <h1>Login</h1>
                    <p>Login to your account</p>
                </div>

                <div className="login__body">
                    <div className="login__input">
                        <FontAwesomeIcon icon={faUser} className='icon__login' />
                        <input type="text" placeholder="Username" value={useraccount} onChange={(e) => setUseraccount(e.target.value)} />
                    </div>

                    <div className="login__input">
                        <FontAwesomeIcon icon={faLock} className='icon__login' />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>

                <div className="login__button">
                    <button onClick={handleSubmit}>
                        <span>Login</span>
                    </button>
                </div>
            </div>

        </div>
    );
}

export default Login;
