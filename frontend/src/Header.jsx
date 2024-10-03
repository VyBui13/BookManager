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
            <div class="header">
                <div class="header__logo">
                    <div class="header__logo-icon">
                        <Link to="/"> <i class="fa-solid fa-gear"></i> </Link>
                    </div>
                    <div class="header__logo-title">
                        BOOKMANAGER
                    </div>
                </div>

                <div class="header__menu">
                    <ul class="header__nav">
                        <li class="header__nav-item-container">
                            <div class="header__nav-item">
                                <Link to="/book"><i class="fa-solid fa-book"></i></Link>
                            </div>
                        </li>

                        <li class="header__nav-item-container">
                            <div class="header__nav-item">
                                <Link to="/bill"><i class="fa-solid fa-wallet"></i></Link>
                            </div>
                        </li>
                        <li class="header__nav-item-container">
                            <div class="header__nav-item">
                                <i class="fa-solid fa-rectangle-list"></i>
                            </div>
                        </li>
                        <li class="header__nav-item-container">
                            <div class="header__nav-item">
                                <i class="fa-solid fa-user-tie"></i>
                            </div>
                        </li>
                        <li class="header__nav-item-container">
                            <div class="header__nav-item">
                                <i class="fa-solid fa-newspaper"></i>
                            </div>
                        </li>
                        <li class="header__nav-item-container">
                            <div class="header__nav-item">
                                <i class="fa-solid fa-calendar"></i>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="header__sidebar">
                    <div onClick={
                        () => {
                            if (!isSidebar) {
                                setIsSidebar(true)
                            }
                            console.log(isSidebar);
                        }
                    } class="header__sidebar-icon">
                        <i class="fa-solid fa-list"></i>
                    </div>
                    <div class="header__sidebar-menu" style={isSidebar ? { transform: "translateX(0)" } : { transform: "translateX(100%)" }}>
                        <div onClick={
                            () => {
                                if (isSidebar) {
                                    setIsSidebar(false)
                                }
                            }
                        } class="header__sidebar-icon-close">
                            <i class="fa-solid fa-x"></i>
                        </div>
                        <ul class="header__sidebar-nav">
                            <li class="header__sidebar-nav-item-container">
                                <div class="header__sidebar-nav-item">
                                    <Link to="/book">
                                        <i class="fa-solid fa-book"></i>
                                        <div class="header__sidebar-nav-text">Book</div>
                                    </Link>
                                </div>
                            </li>
                            <li class="header__sidebar-nav-item-container">
                                <div class="header__sidebar-nav-item">
                                    <i class="fa-solid fa-wallet"></i>
                                    <div class="header__sidebar-nav-text">Bill</div>
                                </div>
                            </li>
                            <li class="header__sidebar-nav-item-container">
                                <div class="header__sidebar-nav-item">
                                    <i class="fa-solid fa-rectangle-list"></i>
                                    <div class="header__sidebar-nav-text">List</div>
                                </div>
                            </li>
                            <li class="header__sidebar-nav-item-container">
                                <div class="header__sidebar-nav-item">
                                    <i class="fa-solid fa-user-tie"></i>
                                    <div class="header__sidebar-nav-text">Customer</div>
                                </div>
                            </li>
                            <li class="header__sidebar-nav-item-container">
                                <div class="header__sidebar-nav-item">
                                    <i class="fa-solid fa-newspaper"></i>
                                    <div class="header__sidebar-nav-text">Report</div>
                                </div>
                            </li>
                            <li class="header__sidebar-nav-item-container">
                                <div class="header__sidebar-nav-item">
                                    <i class="fa-solid fa-calendar"></i>
                                    <div class="header__sidebar-nav-text">Regulation</div>
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