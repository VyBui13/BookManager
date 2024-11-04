// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../components/NotificationContext';
import '../styles/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'

function Login({ setIsAuthenticated }) {
    const [useraccount, setUseraccount] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { notify } = useNotification();

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
                    notify({ type: 'error', msg: data.message });
                    return;
                }
                notify({ type: 'success', msg: 'Login successfully' });
                setIsAuthenticated(true);
                navigate('/');

            })
            .catch((err) => {
                console.log(err);
                notify({ type: 'error', msg: 'Server error' });
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
