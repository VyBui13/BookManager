import App from './App.jsx';
import Header from './Header.jsx';
import './styles/Dashboard.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from './components/NotificationContext';
import Cookies from 'js-cookie';
import { useAuthorizations } from './components/AuthorizationContext.jsx';
import { useConfig } from './components/ConfigContext.jsx';
import { useLoading } from './components/LoadingContext.jsx';
import Loading from './components/Loading.jsx';

function Dashboard() {
    const { isLoading } = useLoading();
    const { setAuthorization, setUser } = useAuthorizations();
    const { setRules } = useConfig();
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5000/users', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('token')
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'error') {
                    setIsAuthenticated(false);
                    navigate('/login');
                } else {
                    setAuthorization(data.authorization);
                    setUser(data.user);

                    setIsAuthenticated(true);
                    fetch('http://localhost:5000/rules')
                        .then(res => res.json())
                        .then(data => {
                            if (data.status === 'error') {
                                console.log(data.message);
                                return;
                            }
                            setRules(data.data);
                        });

                }
            })
            .catch((err) => {
                setIsAuthenticated(false);
                navigate('/login');
            });
    }, []);

    return (
        <>
            <div id="dashboard">
                {isAuthenticated &&
                    <>
                        <div id="header">
                            <Header />
                        </div>
                        <div id="content">
                            {isLoading && <Loading />}
                            <App />
                        </div>
                    </>}
            </div>
        </>
    )
}

export default Dashboard;