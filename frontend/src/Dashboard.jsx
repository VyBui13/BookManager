import App from './App.jsx';
import Header from './Header.jsx';
import './styles/Dashboard.css'
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from './components/NotificationContext';
import Cookies from 'js-cookie';
import { useAuthorizations } from './components/AuthorizationContext.jsx';
import { useConfig } from './components/ConfigContext.jsx';
import { useLoading } from './components/LoadingContext.jsx';
import Loading from './components/Loading.jsx';

function Dashboard() {
    const { isLoading, setIsLoading } = useLoading();
    const { setAuthorization, setUser } = useAuthorizations();
    const { setRules } = useConfig();
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const loadingRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                loadingRef.current = setTimeout(() => setIsLoading(true), 500);

                const resUser = await fetch('http://localhost:5000/users', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Cookies.get('token')
                    },
                });


                const dataUser = await resUser.json();
                if (dataUser.status === 'error') {
                    setIsAuthenticated(false);
                    navigate('/login');
                    return;
                }

                setAuthorization(dataUser.authorization);
                setUser(dataUser.user);
                setIsAuthenticated(true);

                const resRules = await fetch('http://localhost:5000/rules');
                const dataRules = await resRules.json();
                if (dataRules.status === 'error') {
                    console.log(dataRules.message);
                    return;
                }

                setRules(dataRules.data);

            } catch (error) {
                console.log(error);
                setIsAuthenticated(false);
                navigate('/login');
            }
            finally {
                clearTimeout(loadingRef.current);
                loadingRef.current = null;
                setIsLoading(false);
            }
        }

        fetchData();
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