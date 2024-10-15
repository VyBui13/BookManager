import './styles/Header.css'
import { useState } from 'react'
import { Link } from "react-router-dom"
import './styles/Header.css'
// import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css'

function Header() {
    const [isSidebar, setIsSidebar] = useState(false)

    return (
        <>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"></link>
            <div className="header">
                <div className="header__logo">
                    <div className="header__logo-icon">
                        <Link to="/"> <i className="fa-solid fa-gear"></i> </Link>
                    </div>
                    <div className="header__logo-title">
                        BOOKMANAGER
                    </div>
                </div>

                <div className="header__menu">
                    <ul className="header__nav">
                        {/* <li className="header__nav-item-container">
                            <div className="header__nav-item">
                                <Link to="/book"><i className="fa-solid fa-book"></i></Link>
                            </div>
                        </li> */}

                        {/* <li className="header__nav-item-container">
                            <div className="header__nav-item">
                                <Link to="/bill"><i className="fa-solid fa-wallet"></i></Link>
                            </div>
                        </li> */}

                        <li className="header__nav-item-container">
                            <div className="header__nav-item">
                                <Link to="/form"><i className="fa-solid fa-file-invoice"></i></Link>
                            </div>
                        </li>

                        <li className="header__nav-item-container">
                            <div className="header__nav-item">
                                <Link to="/booklist"><i className="fa-solid fa-rectangle-list"></i></Link>
                            </div>
                        </li>

                        {/* <li className="header__nav-item-container">
                            <div className="header__nav-item">
                                <Link to="/customer"><i className="fa-solid fa-user-tie"></i></Link>
                            </div>
                        </li> */}

                        <li className="header__nav-item-container">
                            <div className="header__nav-item">
                                <Link to="#"><i className="fa-solid fa-newspaper"></i></Link>
                            </div>
                        </li>

                        <li className="header__nav-item-container">
                            <div className="header__nav-item">
                                <Link to="/regulation"><i className="fa-solid fa-calendar"></i></Link>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="header__sidebar">
                    <div onClick={
                        () => {
                            if (!isSidebar) {
                                setIsSidebar(true)
                            }
                            console.log(isSidebar);
                        }
                    } className="header__sidebar-icon">
                        <i className="fa-solid fa-list"></i>
                    </div>
                    <div className="header__sidebar-menu" style={isSidebar ? { transform: "translateX(0)" } : { transform: "translateX(100%)" }}>
                        <div onClick={
                            () => {
                                if (isSidebar) {
                                    setIsSidebar(false)
                                }
                            }
                        } className="header__sidebar-icon-close">
                            <i className="fa-solid fa-x"></i>
                        </div>
                        <ul className="header__sidebar-nav">
                            {/* <li className="header__sidebar-nav-item-container">
                                <div className="header__sidebar-nav-item">
                                    <Link to="/book">
                                        <i className="fa-solid fa-book"></i>
                                        <div className="header__sidebar-nav-text">Book</div>
                                    </Link>
                                </div>
                            </li> */}

                            {/* <li className="header__sidebar-nav-item-container">
                                <div className="header__sidebar-nav-item">
                                    <Link to="/bill">
                                        <i className="fa-solid fa-wallet"></i>
                                        <div className="header__sidebar-nav-text">Bill</div>
                                    </Link>
                                </div>
                            </li> */}

                            <li className="header__sidebar-nav-item-container">
                                <div className="header__sidebar-nav-item">
                                    <Link to="/form">
                                        <i className="fa-solid fa-file-invoice"></i>
                                        <div className="header__sidebar-nav-text">Form</div>
                                    </Link>
                                </div>
                            </li>

                            <li className="header__sidebar-nav-item-container">
                                <div className="header__sidebar-nav-item">
                                    <Link to="/booklist">
                                        <i className="fa-solid fa-rectangle-list"></i>
                                        <div className="header__sidebar-nav-text">List</div>
                                    </Link>
                                </div>
                            </li>

                            {/* <li className="header__sidebar-nav-item-container">
                                <div className="header__sidebar-nav-item">
                                    <Link to="/customer">
                                        <i className="fa-solid fa-user-tie"></i>
                                        <div className="header__sidebar-nav-text">Customer</div>
                                    </Link>
                                </div>
                            </li> */}

                            <li className="header__sidebar-nav-item-container">
                                <div className="header__sidebar-nav-item">
                                    <Link to="#">
                                        <i className="fa-solid fa-newspaper"></i>
                                        <div className="header__sidebar-nav-text">Report</div>
                                    </Link>
                                </div>
                            </li>

                            <li className="header__sidebar-nav-item-container">
                                <div className="header__sidebar-nav-item">
                                    <Link to="/regulation">
                                        <i className="fa-solid fa-calendar"></i>
                                        <div className="header__sidebar-nav-text">Regulation</div>
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Header;