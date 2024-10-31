import './styles/Header.css'
import { useState } from 'react'
import { Link } from "react-router-dom"
import './styles/Header.css'

function Header() {
    // const [isSidebar, setIsSidebar] = useState(false)
    return (
        <>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <div className="header__wrapper">

                <div className="header">
                    <div className="header__logo">
                        B
                    </div>
                    <div className="header__item">
                        <div className="header__icon">
                            <Link to="/"><i className="fa-solid fa-home"></i></Link>
                        </div>
                    </div>

                    <div className="header__item">
                        <div className="header__icon">
                            <Link to="/form/*"><i className="fa-solid fa-clipboard"></i></Link>
                        </div>

                    </div>

                    <div className="header__item">
                        <div className="header__icon">
                            <Link to="/booklist"><i className="fa-solid fa-book"></i></Link>
                        </div>
                    </div>

                    <div className="header__item">
                        <div className="header__icon">
                            <Link to="/report"><i className="fa-solid fa-newspaper"></i></Link>
                        </div>
                    </div>

                    <div className="header__item">
                        <div className="header__icon">
                            <Link to="/regulation"><i class="fa-solid fa-gear"></i></Link>
                        </div>
                    </div>


                </div>

                <div className="logout">
                    <div className="logout__icon">
                        <Link to="/login"><i class="fa-solid fa-right-from-bracket"></i></Link>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Header;