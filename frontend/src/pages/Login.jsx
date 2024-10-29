// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {

    };


    return (
        <div className="login-container">
            <div className="login">
                <div className="login__title">
                    login to your account
                </div>

                <div className="login__body">
                    <div className="login__input">

                    </div>

                    <div className="login__input">

                    </div>
                </div>

                <div className="login__button">

                </div>
            </div>
        </div>
    );
}

export default Login;
