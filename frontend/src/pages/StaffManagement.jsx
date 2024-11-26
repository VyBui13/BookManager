import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faScrewdriverWrench, faUser } from '@fortawesome/free-solid-svg-icons'
import '../styles/StaffManagement.css'
import { useState, useEffect } from 'react'
import StaffForm from '../components/StaffForm'

function StaffManagement() {
    const [users, setUsers] = useState([]);
    const [isForm, setIsForm] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5000/users/list')
            .then(response => response.json())
            .then(data => {
                setUsers(data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <>
            <div className="management">
                {isForm && <StaffForm setIsForm={setIsForm} />}
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


                        <button onClick={() => setIsForm(true)} className="management__card">
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
                        {users.map(user => (

                            <div className="management__card">
                                <div className="management__card__avatar">
                                    <FontAwesomeIcon icon={faUser} className='icon__card' />
                                </div>
                                <div className="management__card__body">

                                    <div className="management__card__title">
                                        <h2>
                                            {user.userName} - {user.userRole}
                                        </h2>
                                    </div>

                                    <div className="management__card__content">
                                        <p>
                                            Email:
                                            <span>{user.userEmail}</span>
                                        </p>

                                        <p>
                                            Phone:
                                            <span>{user.userPhone}</span>
                                        </p>
                                        <p>
                                            Address:
                                            <span>{user.userAddress}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>))
                        }

                        {/* <div className="management__card">
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

                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default StaffManagement;