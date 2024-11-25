import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserTie } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function EachPageHeader({ title, description, isHide = true }) {

    return (
        <div className="page__header">
            <div className="page__title">
                <p>{description}</p>
                <h1>{title}</h1>
            </div>

            {isHide && <div className="page__user">
                <Link to="/user">
                    <button>
                        <FontAwesomeIcon icon={faUserTie} className='icon__user' />
                    </button>
                </Link>
            </div>}
        </div>
    )
}

export default EachPageHeader;