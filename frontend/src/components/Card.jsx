import "../styles/Card.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faQrcode, faCreditCard, faInfinity, faCompactDisc, faUser, faUserGear } from '@fortawesome/free-solid-svg-icons'


function Card() {
    return (

        <>
            <div className="card-wrapper">

                <div className="card card--firstperson">
                    <input type="checkbox" id="btn-flip" />
                    <div className="card__container">
                        <div className="card__side card__frontside">
                            <div className="card__header">
                                <div className="card__text-header">PERSONAL CARD</div>

                                <FontAwesomeIcon icon={faStar} className="icon__card__header" />
                                <FontAwesomeIcon icon={faStar} className="icon__card__header" />
                                <FontAwesomeIcon icon={faStar} className="icon__card__header" />
                            </div>

                            <label for="btn-flip" className="card__QR">
                                <FontAwesomeIcon icon={faQrcode} />
                            </label>

                            <div className="card__picture-container">
                                <div className="card__picture">
                                    <FontAwesomeIcon icon={faUserGear} className="icon__card__picture" />
                                    {/* <FontAwesomeIcon icon={faPerson} className="icon__card__picture" /> */}
                                </div>
                            </div>

                            <div className="card__title">
                                Personal Identity Card
                                <FontAwesomeIcon icon={faCreditCard} className="card__icon-title" />

                            </div>

                            <div className="card__information">
                                <ul className="card__content">
                                    <li className="card__content-item special">
                                        <div className="card__content-header">No:</div>
                                        <ul className="card__content-body card__id">
                                            <li className="card__id-item">0</li>
                                            <li className="card__id-item">9</li>
                                            <li className="card__id-item">0</li>
                                            <li className="card__id-item">4</li>
                                            <li className="card__id-item">2</li>
                                            <li className="card__id-item">0</li>
                                            <li className="card__id-item">0</li>
                                            <li className="card__id-item">4</li>
                                        </ul>
                                    </li>
                                    <li className="card__content-item">
                                        <div className="card__content-header">Fullname: </div>
                                        <div className="card__content-body">Bui Dinh Gia Vy</div>
                                    </li>
                                    <li className="card__content-item">
                                        <div className="card__content-header">Phone: </div>
                                        <div className="card__content-body">(+84) 797 347XXX</div>
                                    </li>
                                    <li className="card__content-item">
                                        <div className="card__content-header">Place: </div>
                                        <div className="card__content-body">Ho Chi Minh City</div>
                                    </li>
                                </ul>
                            </div>

                            <div className="card__footer">
                                <div className="card__content-header">You can call me by: </div>
                                <div className="card__content-body">Lilyofthevalley</div>
                            </div>

                            <div className="card__expiry">
                                Date expiry:
                                <FontAwesomeIcon icon={faInfinity} className="icon-card-expiry" />
                            </div>

                            <div className="card__disc">
                                <FontAwesomeIcon icon={faCompactDisc} />
                            </div>

                        </div>
                        <div className="card__side card__backside">
                            <div className="card__header">
                                <div className="card__text-header">PERSONAL CARD</div>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                            </div>

                            <label for="btn-flip" className="card__QR">
                                <FontAwesomeIcon icon={faQrcode} />
                            </label>

                            <div className="card__social-preview">
                                <FontAwesomeIcon icon={faUser} />
                            </div>

                            <div className="card__title-social">
                                <div className="card__text-title-social">Activity History</div>

                            </div>

                            {/* <div className="card__information-social">
                                <ul className="card__social">
                                    <li className="card__social-item">
                                        <div className="card__social-icon">
                                            <i className="fa-brands fa-facebook"></i> :
                                        </div>
                                        <div className="card__social-link">
                                            <a href="" target="_blank">Vy Bui</a>
                                        </div>
                                    </li>
                                    <li className="card__social-item">
                                        <div className="card__social-icon">
                                            <i className="fa-brands fa-instagram"></i> :
                                        </div>
                                        <div className="card__social-link">
                                            <a href="" target="_blank">Lilyofthevalley</a>
                                        </div>
                                    </li>
                                    <li className="card__social-item">
                                        <div className="card__social-icon">
                                            <i className="fa-brands fa-github"></i> :
                                        </div>
                                        <div className="card__social-link">
                                            <a href="" target="_blank">VyBui13</a>
                                        </div>
                                    </li>
                                    <li className="card__social-item">
                                        <div className="card__social-icon">
                                            <i className="fa-brands fa-youtube"></i> :
                                        </div>
                                        <div className="card__social-link">
                                            <a href="" target="_blank">None</a>
                                        </div>
                                    </li>
                                </ul>
                            </div> */}

                            <div className="card__line"></div>


                            <div className="card__disc">
                                <FontAwesomeIcon icon={faCompactDisc} />
                                {/* <i className="fa-solid fa-compact-disc"></i> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Card;