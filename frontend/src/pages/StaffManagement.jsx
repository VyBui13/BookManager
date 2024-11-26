import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faScrewdriverWrench, faUser } from '@fortawesome/free-solid-svg-icons'
import '../styles/StaffManagement.css'


function StaffManagement() {
    return (
        <>
            <div className="management">
                <div className="management__left">
                    <div className="management__role">
                        <button className="management__card">
                            <div className="management__card-icon">
                                <FontAwesomeIcon icon={faScrewdriverWrench} />
                            </div>

                            <div className="management__card-title">
                                <p>Admin</p>
                            </div>
                        </button>

                        <button className="management__card">
                            <div className="management__card-icon">
                                <FontAwesomeIcon icon={faScrewdriverWrench} />
                            </div>

                            <div className="management__card-title">
                                <p>Manager</p>
                            </div>
                        </button>

                        <button className="management__card">
                            <div className="management__card-icon">
                                <FontAwesomeIcon icon={faScrewdriverWrench} />
                            </div>

                            <div className="management__card-title">
                                <p>Staff</p>
                            </div>
                        </button>


                        <button className="management__card">
                            <div className="management__card-icon">
                                <FontAwesomeIcon icon={faScrewdriverWrench} />
                            </div>

                            <div className="management__card-title">
                                <p>Add new</p>
                            </div>
                        </button>

                        <button className="management__card">
                            <div className="management__card-icon">
                                <FontAwesomeIcon icon={faScrewdriverWrench} />
                            </div>

                            <div className="management__card-title">
                                <p>Exit</p>
                            </div>
                        </button>
                    </div>
                </div>

                <div className="management__right">
                    <div className="management__list">
                        <div className="management__card">
                            <div className="management__card__avatar">
                                <FontAwesomeIcon icon={faUser} className='icon__card' />
                            </div>
                            <div className="management__card__body">

                                <div className="management__card__title">
                                    <h2>
                                        Bui Dinh Gia Vy - Admin
                                    </h2>
                                </div>

                                <div className="management__card__content">
                                    <p>
                                        Email:
                                        <span>blackzerogamer09@gmail.com</span>
                                    </p>

                                    <p>
                                        Phone:
                                        <span>0797347660</span>
                                    </p>
                                    <p>
                                        Address:
                                        <span>Cu Chi district, Ho Chi Minh city</span>
                                    </p>
                                </div>
                            </div>

                        </div>

                        <div className="management__card">
                            <div className="management__card__avatar">
                                <FontAwesomeIcon icon={faUser} className='icon__card' />
                            </div>
                            <div className="management__card__body">

                                <div className="management__card__title">
                                    <h2>
                                        Bui Dinh Gia Vy - Admin
                                    </h2>
                                </div>

                                <div className="management__card__content">
                                    <p>
                                        Email:
                                        <span>blackzerogamer09@gmail.com</span>
                                    </p>

                                    <p>
                                        Phone:
                                        <span>0797347660</span>
                                    </p>
                                    <p>
                                        Address:
                                        <span>Cu Chi district, Ho Chi Minh city</span>
                                    </p>
                                </div>
                            </div>

                        </div>

                        <div className="management__card">
                            <div className="management__card__avatar">
                                <FontAwesomeIcon icon={faUser} className='icon__card' />
                            </div>
                            <div className="management__card__body">

                                <div className="management__card__title">
                                    <h2>
                                        Bui Dinh Gia Vy - Admin
                                    </h2>
                                </div>

                                <div className="management__card__content">
                                    <p>
                                        Email:
                                        <span>blackzerogamer09@gmail.com</span>
                                    </p>

                                    <p>
                                        Phone:
                                        <span>0797347660</span>
                                    </p>
                                    <p>
                                        Address:
                                        <span>Cu Chi district, Ho Chi Minh city</span>
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StaffManagement;