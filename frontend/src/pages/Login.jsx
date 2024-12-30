// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../components/NotificationContext';
import '../styles/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { useLoading } from '../components/LoadingContext';

function Login() {
    const [useraccount, setUseraccount] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { notify } = useNotification();
    const { setIsLoading } = useLoading();

    function handleSubmit() {
        const fetchData = async () => {
            const loadingRef = setTimeout(() => setIsLoading(true), 500);
            try {

                const res = await fetch('http://localhost:5000/users/login', {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userAccount: useraccount, userPassword: password }),
                });

                const data = await res.json();
                notify({ type: data.status, msg: data.message });
                if (data.status === 'success') {
                    navigate('/');
                }

            } catch (error) {
                console.log(error);
            }
            finally {
                clearTimeout(loadingRef);
                setIsLoading(false);
            }
        }
        fetchData();
    };

    function handleGuest() {
        const fetchData = async () => {
            const loadingRef = setTimeout(() => setIsLoading(true), 500);
            try {

                const res = await fetch('http://localhost:5000/users/login', {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userAccount: "", userPassword: "", isGuest: true }),
                });

                const data = await res.json();
                notify({ type: data.status, msg: data.message });
                if (data.status === 'success') {
                    navigate('/');
                }

            } catch (error) {
                console.log(error);
            }
            finally {
                clearTimeout(loadingRef);
                setIsLoading(false);
            }
        }

        fetchData();
    }

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
                    <button onClick={handleGuest}>
                        <span>Guest</span>
                    </button>
                </div>
            </div>

        </div>
    );
}

export default Login;
