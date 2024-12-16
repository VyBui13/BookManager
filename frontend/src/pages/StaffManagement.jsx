import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faScrewdriverWrench, faUser, faX, faGear, faArrowLeft, faArrowRight, faUserTie, faUserSecret } from '@fortawesome/free-solid-svg-icons'
import '../styles/StaffManagement.css'
import { useState, useEffect } from 'react'
import StaffForm from '../components/StaffForm'
import { useConfirmPrompt } from '../components/ConfirmPromptContext'
import { useNotification } from '../components/NotificationContext'
import StaffRole from '../components/StaffRole'
import Card from '../components/Card'

function StaffManagement({ setIsHide }) {
    const { notify } = useNotification();
    const [users, setUsers] = useState([]);
    const [isForm, setIsForm] = useState(false);
    const { setIsConfirmPrompt, setConfirmPromptData } = useConfirmPrompt();
    const [theChosenUser, setTheChosenUser] = useState({});
    const [theChosenUserCard, setTheChosenUserCard] = useState({});

    const [page, setPage] = useState(1);

    function calculateItemsPerPage() {
        const screenHeight = window.innerHeight;
        if (screenHeight >= 900) return 16;
        if (screenHeight >= 800) return 14;
        if (screenHeight >= 768) return 12;
        if (screenHeight >= 600) return 10;
        return 8;
    }

    const [amountItem, setAmountItem] = useState(calculateItemsPerPage());
    function increasePage() {
        if (page < Math.ceil(users.length / amountItem)) {
            setPage(page + 1);
        }
    }

    function decreasePage() {
        if (page > 1) {
            setPage(page - 1);
        }
    }

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

    function handleExit() {
        setIsHide(true);
    }

    function handleDeleteStaff(id) {
        fetch('http://localhost:5000/users/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    notify({ type: data.status, msg: data.message });
                    setUsers(users.filter(user => user._id !== id));
                }
                else {
                    notify({ type: data.status, msg: data.message });
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <>
            <div className="management">
                {theChosenUserCard._id && <Card theChosenUserCard={theChosenUserCard} setTheChosenUserCard={setTheChosenUserCard} />}
                {/* {isPrompt && <ConfirmPrompt message="Delete Staff" action="Delete" onConfirm={() => { console.log("hehehe") }} onCancel={() => setIsPrompt(false)} />} */}
                {isForm && <StaffForm setIsForm={setIsForm} setUsers={setUsers} />}
                {theChosenUser._id && <StaffRole theChosenUser={theChosenUser} setTheChosenUser={setTheChosenUser} setUsers={setUsers} />}
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

                        <button onClick={handleExit} className="management__card">
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
                        {users.slice((page - 1) * amountItem, (page - 1) * amountItem + amountItem).map(user => (
                            <div className="management__card" key={user._id}>
                                <button onClick={() => {
                                    setTheChosenUserCard(user);
                                }} className="management__card__avatar">
                                    {user.userRole.toLowerCase() === 'admin' && <FontAwesomeIcon icon={faUserSecret} className='icon__card' />}
                                    {user.userRole.toLowerCase() === 'manager' && <FontAwesomeIcon icon={faUserTie} className='icon__card' />}
                                    {user.userRole.toLowerCase() === 'staff' && <FontAwesomeIcon icon={faUser} className='icon__card' />}
                                </button>
                                <div className="clone1">
                                    <span>Export card</span>
                                </div>
                                <div className="management__card__body">

                                    <div className="management__card__title">
                                        <h2>
                                            {user.userName}
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
                                <button onClick={() => {
                                    setConfirmPromptData({
                                        message: `Delete ${user.userName}`,
                                        action: "Delete",
                                        onConfirm: () => {
                                            handleDeleteStaff(user._id);
                                        },
                                    });
                                    setIsConfirmPrompt(true);
                                }} className="management__card__delete">
                                    <FontAwesomeIcon icon={faX} className='icon__card__button' />
                                </button>

                                <button onClick={
                                    () => {
                                        setTheChosenUser(user);
                                    }
                                } className="management__card__change">
                                    <FontAwesomeIcon icon={faGear} className='icon__card__button' />
                                </button>
                            </div>))
                        }
                    </div>

                    <div className="management__button">
                        <button onClick={decreasePage} className="management__button__prev">
                            <FontAwesomeIcon icon={faArrowLeft} className='icon__paging' />
                        </button>
                        <button onClick={increasePage} className="management__button__next">
                            <FontAwesomeIcon icon={faArrowRight} className='icon__paging' />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StaffManagement;