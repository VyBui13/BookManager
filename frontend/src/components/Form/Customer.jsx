import React from 'react';
import { useState, useEffect } from 'react';
import { nofi } from '../Notify.jsx';
import '../../styles/Form.css';
import '../../styles/Customer.css';
import { getCurrentDateTime } from '../../utils/DateCurrent.js';

function Customer(props) {
    const [search, setSearch] = useState('');
    const [payment, setPayment] = useState('');
    const [customer, setCustomer] = useState({});

    useEffect(() => {
        if (props.customerName !== undefined) {
            fetch(`http://localhost:5000/customers?customerName=${props.customerName}`)
                .then(res => res.json())
                .then(data => {
                    if (data === null) {
                        nofi({ type: 'error', msg: 'Customer not found!' });
                        return;
                    }
                    setCustomer(data);
                })
                .catch((err) => {
                    nofi({ type: 'error', msg: err.message });
                }
                );
        }
    }, []);

    function handleSearch() {
        fetch(`http://localhost:5000/customers?customerName=${search}`)
            .then(res => res.json())
            .then(data => {
                if (data === null) {
                    nofi({ type: 'error', msg: 'Customer not found!' });
                    return;
                }
                setCustomer(data);
                setSearch('');
            })
            .catch((err) => {
                nofi({ type: 'error', msg: err.message });
            }
            );
    };

    function handleSummit() {
        fetch('http://localhost:5000/customers/fee', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...customer, payment: payment, updateDate: getCurrentDateTime() }),
        })
            .then(res => res.json())
            .then(data => {
                nofi({ type: data.status, msg: data.message });
                setCustomer({});
                setPayment('');
            })
            .catch((err) => {
                nofi({ type: 'error', msg: err.message });
            });

    }

    return (
        <>
            {/* <div className="form-container form--customer">
                <div className="form">
                    <div className="form__title">
                        customer
                    </div>

                    <div className="form__localtime">
                        <div className="form__localtime-content">
                            {currDate}
                        </div>
                        <div className="form__localtime-icon">
                            <i className="fa-regular fa-calendar"></i>
                        </div>
                    </div>
                    <form action="#">
                        <div className="form__userdetail">
                            <div className="form__inputbox">
                                <span className="form__detail">Name</span>
                                <input
                                    value={customer.name}
                                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                                    type="text" required />
                                <div className="form__labelline">Enter customer name</div>
                            </div>

                            <div className="form__inputbox">
                                <span className="form__detail">Address</span>
                                <input
                                    value={customer.Address}
                                    onChange={(e) => setCustomer({ ...customer, Address: e.target.value })}
                                    type="text" required />
                                <div className="form__labelline">Enter customer address</div>
                            </div>

                            <div className="form__inputbox">
                                <span className="form__detail">Phone</span>
                                <input
                                    value={customer.phone}
                                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                                    type="text" required />
                                <div className="form__labelline">Enter customer phone</div>
                            </div>

                            <div className="form__inputbox">
                                <span className="form__detail">Email</span>
                                <input
                                    value={customer.email}
                                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                                    type="number" required />
                                <div className="form__labelline">Enter customer email</div>
                            </div>

                            <div className="form__inputbox">
                                <span className="form__detail">Payment</span>
                                <input
                                    value={customer.customer}
                                    onChange={(e) => setCustomer({ ...customer, fee: e.target.value })}
                                    type="number" required />
                                <div className="form__labelline">Enter the fee (VND)</div>
                            </div>
                        </div>
                    </form>

                    <div className="form__button">
                        <button className="form__submit" onClick={handleSummit}>Submit</button>
                    </div>

                </div>
            </div> */}

            <div className="customer-wrapper">

                <div className="customer">
                    <div className="customer__header">
                        <div className="customer__title">
                            Payment
                        </div>

                        <div className="customer__search">
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                type="text" placeholder="Search..." />
                            <button onClick={handleSearch}>
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </div>

                    <div className="customer__body">
                        <div className="customer__field">
                            <div className="customer__field__name">Name</div>
                            <input
                                value={customer.customerName}
                                type="text" disabled />

                        </div>

                        <div className="customer__field">
                            <div className="customer__field__name">Email</div>
                            <input
                                value={customer.customerEmail}
                                onChange={(e) => setCustomer({ ...customer, customerEmail: e.target.value })}
                                type="text" required />

                        </div>

                        <div className="customer__field">
                            <div className="customer__field__name">Phone</div>
                            <input
                                value={customer.customerPhone}
                                onChange={(e) => setCustomer({ ...customer, customerPhone: e.target.value })}
                                type="text" required />

                        </div>

                        <div className="customer__field">
                            <div className="customer__field__name">Address</div>
                            <input
                                value={customer.customerAddress}
                                onChange={(e) => setCustomer({ ...customer, customerAddress: e.target.value })}
                                type="text" required />

                        </div>

                        <div className="customer__field">
                            <div className="customer__field__name">Fee</div>
                            <input
                                value={customer.customerCurrentDebt}
                                type="text" disabled />

                        </div>

                        <div className="customer__field">
                            <div className="customer__field__name">Payment</div>
                            <input
                                value={payment}
                                onChange={(e) => setPayment(e.target.value.trim())}
                                type="text" required />

                        </div>
                    </div>

                    <div className="customer__btn">
                        <button className="customer__btn__submit" onClick={handleSummit}>Submit</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Customer;