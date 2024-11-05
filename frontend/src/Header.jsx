import './styles/Header.css'
import { useState } from 'react'
import { Link } from "react-router-dom"
import './styles/Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faClipboard, faBook, faNewspaper, faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useAuthentications } from './components/AuthenticationContext.jsx';

function Header() {
    const { setIsAuthenticated } = useAuthentications();
    // const [isSidebar, setIsSidebar] = useState(false)
    return (
        <>
            <div className="header__wrapper">

                <div className="header">
                    <div className="header__logo">
                        B
                    </div>
                    <div className="header__item">
                        <div className="header__icon">
                            <Link to="/">
                                <FontAwesomeIcon icon={faHome} className="icon__header" />
                            </Link>
                        </div>
                    </div>

                    <div className="header__item">
                        <div className="header__icon">
                            <Link to="/form/*">
                                <FontAwesomeIcon icon={faClipboard} className="icon__header" />
                            </Link>
                        </div>

                    </div>

                    <div className="header__item">
                        <div className="header__icon">
                            <Link to="/booklist">
                                <FontAwesomeIcon icon={faBook} className="icon__header" />
                            </Link>
                        </div>
                    </div>

                    <div className="header__item">
                        <div className="header__icon">
                            <Link to="/report">
                                <FontAwesomeIcon icon={faNewspaper} className="icon__header" />
                            </Link>
                        </div>
                    </div>

                    <div className="header__item">
                        <div className="header__icon">
                            <Link to="/regulation">
                                <FontAwesomeIcon icon={faGear} className="icon__header" />
                            </Link>
                        </div>
                    </div>


                </div>

                <div className="logout">
                    <div className="logout__icon">
                        <Link to="/login" onClick={
                            () => {
                                setIsAuthenticated(false)
                            }
                        }>
                            <FontAwesomeIcon icon={faRightFromBracket} className="icon__header" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Header;