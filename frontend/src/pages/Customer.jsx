import React from 'react';
import { useState } from 'react';
import { nofi } from '../components/Notify.jsx';
import '../styles/Form.css';

function Customer() {
    const [customer, setCustomer] = useState({
        name: '',
        Address: '',
        phone: '',
        email: '',
        fee: '',
    });

    function handleSummit() {

        if (customer.name === '' || customer.Address === '' || customer.phone === '' || customer.email === '' || customer.fee === '') {
            nofi({ type: 'error', msg: 'Please fill all fields!' });
        }
        else {
            setCustomer({
                name: '',
                Address: '',
                phone: '',
                amountBook: '',
                fee: '',
            });
            nofi({ type: 'success', msg: 'Everything is good!' });
        }
    }

    const currDate = new Date().toLocaleDateString();

    return (
        <>
            <div className="form-container form--customer">
                <div class="form">
                    <div class="form__title">
                        customer
                    </div>

                    <div className="form__localtime">
                        <div className="form__localtime-content">
                            {currDate}
                        </div>
                        <div className="form__localtime-icon">
                            <i class="fa-regular fa-calendar"></i>
                        </div>
                    </div>
                    <form action="#">
                        <div class="form__userdetail">
                            <div class="form__inputbox">
                                <span class="form__detail">Name</span>
                                <input
                                    value={customer.name}
                                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                                    type="text" required />
                                <div class="form__labelline">Enter customer name</div>
                            </div>

                            <div class="form__inputbox">
                                <span class="form__detail">Address</span>
                                <input
                                    value={customer.Address}
                                    onChange={(e) => setCustomer({ ...customer, Address: e.target.value })}
                                    type="text" required />
                                <div class="form__labelline">Enter customer address</div>
                            </div>

                            <div class="form__inputbox">
                                <span class="form__detail">Phone</span>
                                <input
                                    value={customer.phone}
                                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                                    type="text" required />
                                <div class="form__labelline">Enter customer phone</div>
                            </div>

                            <div class="form__inputbox">
                                <span class="form__detail">Email</span>
                                <input
                                    value={customer.email}
                                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                                    type="number" required />
                                <div class="form__labelline">Enter customer email</div>
                            </div>

                            <div class="form__inputbox">
                                <span class="form__detail">Payment</span>
                                <input
                                    value={customer.customer}
                                    onChange={(e) => setCustomer({ ...customer, fee: e.target.value })}
                                    type="number" required />
                                <div class="form__labelline">Enter the fee (VND)</div>
                            </div>
                        </div>
                    </form>

                    <div class="form__button">
                        <button class="form__submit" onClick={handleSummit}>Submit</button>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Customer;