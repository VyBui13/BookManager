import FormController from '../components/Form/FormController.jsx'
import { Link } from "react-router-dom"
import '../styles/FormPannel.css'

function Form() {
    return (
        <div className="formdashboard">
            <div className="formdashboard__header__wrapper">
                <div className="formdashboard__header">
                    <div className="formdashboard__title">
                        <p>Manager</p>
                        <h1>Form</h1>

                    </div>

                    <div className="formdashboard__navbar">
                        <div className="formdashboard__item">
                            <Link to="">
                                <i className="fa-solid fa-list"></i>
                            </Link>
                        </div>


                        <div className="formdashboard__item">
                            <Link to="book" title='Book'>
                                <i className="fa-solid fa-book"></i>
                                <div className="formdashboard__item-text">Book</div>
                            </Link>
                        </div>

                        <div className="formdashboard__item">
                            <Link to="bill">
                                <i className="fa-solid fa-wallet"></i>
                                <div className="formdashboard__item-text">Bill</div>
                            </Link>
                        </div>

                        <div className="formdashboard__item">
                            <Link to="customer">
                                <i className="fa-solid fa-user-tie"></i>
                                <div className="formdashboard__item-text">Fee</div>
                            </Link>
                        </div>

                        <div className="formdashboard__item">
                            <Link to="setprice">
                                <i className="fa-solid fa-book"></i>
                                <div className="formdashboard__item-text">Price</div>
                            </Link>

                        </div>


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