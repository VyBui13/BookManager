import FormController from '../components/Form/FormController.jsx'
import { Link } from "react-router-dom"
import '../styles/Form.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faList, faWallet, faUser, faTag } from '@fortawesome/free-solid-svg-icons'
import { useAuthorizations } from '../components/AuthorizationContext.jsx'

function Form() {
    const { authorization } = useAuthorizations();
    return (
        <div className="formdashboard">
            <div className="formdashboard__header__wrapper">
                <div className="formdashboard__header page__header">
                    <div className="title">
                        <p>Manager</p>
                        <h1>Form</h1>
                    </div>

                    <div className="formdashboard__navbar">
                        <div className="formdashboard__item">
                            <Link to="">
                                <FontAwesomeIcon icon={faList} className='icon__navbar' />
                            </Link>
                        </div>


                        {authorization.importbook && <div className="formdashboard__item">
                            <Link to="book" title='Book'>
                                <FontAwesomeIcon icon={faBook} className='icon__navbar' />
                                <div className="formdashboard__item-text">Book</div>
                            </Link>
                        </div>}

                        {authorization.createbill && <div className="formdashboard__item">
                            <Link to="bill">
                                <FontAwesomeIcon icon={faWallet} className='icon__navbar' />
                                <div className="formdashboard__item-text">Bill</div>
                            </Link>
                        </div>}

                        {authorization.createpayment && <div className="formdashboard__item">
                            <Link to="customer">
                                <FontAwesomeIcon icon={faUser} className='icon__navbar' />
                                <div className="formdashboard__item-text">Fee</div>
                            </Link>
                        </div>}

                        {authorization.setprice && <div className="formdashboard__item">
                            <Link to="setprice">
                                <FontAwesomeIcon icon={faTag} className='icon__navbar' />
                                <div className="formdashboard__item-text">Price</div>
                            </Link>

                        </div>}


                    </div>
                </div>
            </div>
            <div className="formdashboard__display">
                <FormController />
            </div>

        </div >

    );
}

export default Form;