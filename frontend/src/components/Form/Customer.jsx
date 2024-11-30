import React from 'react';
import { useState, useEffect } from 'react';
import { useNotification } from '../NotificationContext.jsx';
import '../../styles/Form.css';
import '../../styles/Customer.css';
import { getDateTime } from "../../utils/DateCurrent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons'

function Customer() {
    const { notify } = useNotification();
    const [search, setSearch] = useState('');
    const [payment, setPayment] = useState('');
    const [customer, setCustomer] = useState({});

    // useEffect(() => {
    //     if (props.customerName !== undefined) {
    //         fetch(`http://localhost:5000/customers?customerName=${props.customerName}`)
    //             .then(res => res.json())
    //             .then(data => {
    //                 console.log(data);
    //                 if (data === null) {
    //                     notify({ type: 'error', msg: 'Customer not found!' });
    //                     return;
    //                 }
    //                 setCustomer(data);
    //             })
    //             .catch((err) => {
    //                 notify({ type: 'error', msg: err.message });
    //             }
    //             );
    //     }
    // }, []);

    function handleSearch() {
        fetch(`http://localhost:5000/customers?customerName=${search}`)
            .then(res => res.json())
            .then(data => {
                if (data === null) {
                    notify({ type: 'error', msg: 'Customer not found!' });
                    return;
                }
                setSearch('');
                setCustomer(data);
            })
            .catch((err) => {
                notify({ type: 'error', msg: err.message });
            }
            );
    };

    function handleSummit() {
        fetch('http://localhost:5000/customers/fee', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...customer, payment: payment }),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.status, data.message);
                notify({ type: data.status, msg: data.message });
                setCustomer({
                    customerName: '',
                    customerEmail: '',
                    customerPhone: '',
                    customerAddress: '',
                    customerCurrentDebt: ''
                });
                setPayment('');
            })
            .catch((err) => {
                notify({ type: 'error', msg: err.message });
            });

    }

    const datenow = new Date();
    const current = getDateTime(datenow);

    return (
        <>
            {/* <div className="customer">
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
                            <FontAwesomeIcon icon={faSearch} />
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
            </div> */}
            <div className="customer">
                <div className="customer__left">
                    <div className="customer__info">
                        <div className="customer__title">
                            <span>
                                Customer's Payment
                            </span>

                            <div className="logo__shop">B</div>
                        </div>
                        <div className="customer__info__wrapper">

                            <div className="customer__info__left">
                                <div className="customer__input">
                                    <span>Name</span>
                                    <input type="text" />
                                </div>

                                <div className="customer__input">
                                    <span>Email</span>
                                    <input type="text" />
                                </div>

                                <div className="customer__input">
                                    <span>Address</span>
                                    <input type="text" />
                                </div>

                                <div className="customer__input">
                                    <span>Debt</span>
                                    <input type="number" disabled />
                                </div>

                                <div className="customer__input">
                                    <span>Payment</span>
                                    <input type="number" />
                                </div>
                            </div>

                            <div className="customer__info__right">
                                <div className="customer__avatar">
                                    <FontAwesomeIcon icon={faUser} className='icon__customer__avatar' />
                                </div>
                                <div className="customer__phone">
                                    <input type="text" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="customer__right">
                    <div className="payment">
                        <div className="payment__header">
                            <h3>B-BOOKSHOP</h3>
                            <p>207 St., Cu Chi district, Ho Chi Minh city</p>
                            <p>{current}</p>
                            <h4>BOOK BILL</h4>
                        </div>

                        <div className="payment__body">
                            <div className="payment__customer__detail">
                                <h5>Customer: Bui Dinh Gia Vy - 123</h5>
                            </div>

                            <div className="payment__book__temp">

                                <div className="payment__book__detail">
                                    <div className="payment__booklist">
                                        {/* {payment.bookList.map((book, index) => (
                                            <div className="payment__book" key={index}>
                                                <p>{index + 1}. {book.bookName}</p>
                                                <p>x{book.amountBought}</p>
                                                <p>{totalPrice}</p>
                                            </div>
                                        ))} */}
                                        <div className="payment__book">
                                            <p>1. hehehehe</p>
                                            <p>x2</p>
                                            <p>78000</p>
                                        </div>

                                        <div className="payment__book">
                                            <p>1. hihi</p>
                                            <p>x2</p>
                                            <p>78000</p>
                                        </div>
                                        {/* <div className="payment__book">
                                    <p>Total</p>
                                    <p>{totalPayment(payment.bookList)}</p>
                                    </div> */}
                                    </div>
                                </div>

                                <div className="payment__calculation">
                                    <div className="payment__caculation__item">
                                        <p>Total</p>
                                        <p>100000</p>
                                    </div>
                                    <div className="payment__caculation__item">
                                        <p>Payment</p>
                                        <input
                                            type="text" />

                                    </div>

                                    <div className="payment__caculation__item">
                                        <p>Change</p>
                                        <p>-100000</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

        </>
    );
};

export default Customer;