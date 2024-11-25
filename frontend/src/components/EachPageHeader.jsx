import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserTie } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';

function EachPageHeader({ title, description, isHide = true }) {
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

    const toggleTheme = () => {
        const theme = isDarkMode ? lightTheme : darkTheme;
        Object.keys(theme).forEach((key) => {
            document.documentElement.style.setProperty(key, theme[key]);
        });
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className="page__header">
            <div className="page__title">
                <p>{description}</p>
                <h1>{title}</h1>
            </div>

            {isHide && <div className="page__user">
                <button onClick={toggleTheme}>
                    <FontAwesomeIcon icon={faUserTie} className='icon__user' />
                </button>
            </div>}
        </div>
    )
}

export default EachPageHeader;