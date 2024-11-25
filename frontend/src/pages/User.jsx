import "../styles/User.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPencil } from '@fortawesome/free-solid-svg-icons'
import Calendar from "../components/Calendar";

function User() {
    return (
        <>
            <div className="user">
                <div className="user__left">
                    <div className="user__general">
                        <div className="user__general__header">
                            <h3>Your profile</h3>
                            <p>Join 07/06/2023</p>
                        </div>
                        <div className="user__general__avatar">
                            <div className="user__general__avatar__wrapper">
                                <FontAwesomeIcon icon={faUser} className="icon__user" />
                            </div>
                        </div>

                        <div className="user__general__body">
                            <div className="user__general__name">
                                <h3>Bui Dinh Gia Vy</h3>
                                <button>
                                    <FontAwesomeIcon icon={faPencil} className="icon__edit" />
                                    Edit
                                </button>
                            </div>
                            <div className="user__general__role">
                                <p>Role:
                                    <span>Admin</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="user__detail">
                        <div className="user__detail__item">
                            <div className="user__detail__item__title">
                                <h3>Email</h3>
                            </div>
                            <div className="user__detail__item__content">
                                <div className="user__detail__info">
                                    <p>vybuoi0904@gmail.com</p>
                                    <button>
                                        <FontAwesomeIcon icon={faPencil} className="icon__edit" />
                                    </button>
                                </div>
                            </div>

                        </div>

                        <div className="user__detail__item">
                            <div className="user__detail__item__title">
                                <h3>Phone</h3>
                            </div>
                            <div className="user__detail__item__content">

                                <div className="user__detail__info">
                                    <p>0797347660</p>
                                    <button>
                                        <FontAwesomeIcon icon={faPencil} className="icon__edit" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="user__detail__item">
                            <div className="user__detail__item__title">
                                <h3>Address</h3>
                            </div>
                            <div className="user__detail__item__content">

                                <div className="user__detail__info">
                                    <p>Cu Chi district, Ho Chi Minh City</p>
                                    <button>
                                        <FontAwesomeIcon icon={faPencil} className="icon__edit" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="user__right">
                    <div className="user__activity">
                        <Calendar />
                    </div>

                    <div className="user__option">
                        <div className="user__option__header">
                            <h3>Option</h3>
                        </div>

                        <div className="user__option__btn">
                            <button>Change password</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default User;