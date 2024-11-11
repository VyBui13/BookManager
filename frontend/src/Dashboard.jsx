import App from './App.jsx';
import Header from './Header.jsx';
import './styles/Dashboard.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from './components/NotificationContext';
import Cookies from 'js-cookie';
import { useAuthorizations } from './components/AuthorizationContext.jsx';

function Dashboard() {
    const { setAuthorization } = useAuthorizations();
    const { notify } = useNotification();
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
                    setIsAuthenticated(true);
                }
            })
            .catch((err) => {
                setIsAuthenticated(false);
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
                            <App />
                        </div>
                    </>}
            </div>
        </>
    )
}

export default Dashboard;