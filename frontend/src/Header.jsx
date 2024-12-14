import './styles/Header.css'
import { Link } from "react-router-dom"
import { useEffect, useState } from 'react'
import './styles/Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faClipboard, faBook, faNewspaper, faGear, faRightFromBracket, faSun, faMoon, faSliders } from '@fortawesome/free-solid-svg-icons'
import { useNotification } from './components/NotificationContext.jsx'
import Cookies from 'js-cookie';
import { useAuthorizations } from './components/AuthorizationContext.jsx'

function Header() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const lightTheme = {
        "--border-radius": "10px",
        "--main-color": "#80002a",
        "--main-scroll-color": "#3b3b3b93",
        "--background-color": "#fff",
        "--item-color": "#f2f2f2",
        "--text-color": "#000",
        "--text-in-background-color": "#fff",
    };

    const darkTheme = {
        "--border-radius": "10px",
        "--main-color": "#fff",
        "--main-scroll-color": "#88878793",
        "--background-color": "#000",
        "--item-color": "#121212",
        "--text-color": "#fff",
        "--text-in-background-color": "#000",
    };

    useEffect(() => {
        const theme = isDarkMode ? darkTheme : lightTheme;
        Object.keys(theme).forEach((key) => {
            document.documentElement.style.setProperty(key, theme[key]);
        });
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };
    // const [isSidebar, setIsSidebar] = useState(false)
    const { authorization } = useAuthorizations();
    const { notify } = useNotification();

    function handleLogout(e) {
        e.preventDefault();
        fetch('http://localhost:5000/users/logout', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('token')
            },
        })
            .then(res => res.json())
            .then(data => {
                location.reload(true);
                notify({ type: data.status, msg: data.message });
            })
            .catch((err) => {
                notify({ type: 'error', msg: err });
            }
            )

    }

    return (
        <>
            <div className="header__wrapper">

                <div className="header">
                    <button onClick={toggleTheme} className="header__logo">
                        {(isDarkMode) ?
                            <FontAwesomeIcon icon={faMoon} className="icon__header" />
                            :
                            <FontAwesomeIcon icon={faSun} className="icon__header" />
                        }
                    </button>
                    {authorization.home && <div className="header__item">
                        <div className="header__icon">
                            <Link to="/">
                                <FontAwesomeIcon icon={faHome} className="icon__header" />
                            </Link>
                        </div>
                    </div>}

                    {(authorization.importbook || authorization.createbill || authorization.createpayment || authorization.setprice) && <div className="header__item">
                        <div className="header__icon">
                            <Link to="/form/*">
                                <FontAwesomeIcon icon={faClipboard} className="icon__header" />
                            </Link>
                        </div>
                    </div>}

                    {authorization.reviewbook && <div className="header__item">
                        <div className="header__icon">
                            <Link to="/booklist">
                                <FontAwesomeIcon icon={faBook} className="icon__header" />
                            </Link>
                        </div>
                    </div>}

                    {authorization.reviewreport && <div className="header__item">
                        <div className="header__icon">
                            <Link to="/report">
                                <FontAwesomeIcon icon={faNewspaper} className="icon__header" />
                            </Link>
                        </div>
                    </div>}

                    {authorization.setting && <div className="header__item">
                        <div className="header__icon">
                            <Link to="/setting">
                                <FontAwesomeIcon icon={faGear} className="icon__header" />
                            </Link>
                        </div>
                    </div>}

                    {authorization.setting && <div className="header__item">
                        <div className="header__icon">
                            <Link to="/staff">
                                <FontAwesomeIcon icon={faSliders} className="icon__header" />
                            </Link>
                        </div>
                    </div>}


                </div>

                <div className="logout">
                    <div className="logout__icon">
                        <Link to="/login" onClick={handleLogout}>
                            <FontAwesomeIcon icon={faRightFromBracket} className="icon__header" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Header;