import React from 'react';
import { useState, useRef } from 'react';
import { useNotification } from '../NotificationContext.jsx';
import '../../styles/Form.css';
import '../../styles/Customer.css';
import { getDateTime } from "../../utils/DateCurrent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser, faArrowLeft, faArrowRight, faCheck, faX } from '@fortawesome/free-solid-svg-icons'
import NothingDisplay from '../NothingDisplay.jsx';
import { useAuthorizations } from '../AuthorizationContext.jsx';
import { useLoading } from '../LoadingContext.jsx';

function Customer() {
    const { setIsLoading } = useLoading();
    const { user } = useAuthorizations();
    const { notify } = useNotification();
    const [payment, setPayment] = useState('');
    const [bill, setBill] = useState(null);
    const [customer, setCustomer] = useState({
        customerName: '',
        customerPhone: '',
        customerEmail: '',
        customerAddress: '',
        customerCurrentDebt: '',
    });
    const [phone, setPhone] = useState('');
    const [indexBill, setIndexBill] = useState(0);
    const loadingRef = useRef(null);

    // if (bill) {
    //     console.log(bill.billBookList[0]);
    // }


    function handleSubmit() {
        const fetchData = async () => {
            try {
                loadingRef.current = setTimeout(() => setIsLoading(true), 500);
                const res = await fetch('http://localhost:5000/payments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        customer: customer,
                        billID: bill[indexBill]._id,
                        paymentFee: payment,
                        userID: user._id,
                    })
                });

                const data = await res.json();

                if (data.status === 'error') {
                    console.log(data.message);
                    return;
                }
                setPayment('');
                setBill(null);
                setCustomer({
                    customerName: '',
                    customerPhone: '',
                    customerEmail: '',
                    customerAddress: '',
                    customerCurrentDebt: '',
                });
                notify({ type: 'success', msg: data.message });
            }
            catch (err) {
                console.log(err.message);
            }
            finally {
                clearTimeout(loadingRef.current);
                setIsLoading(false);
            }
        }

        fetchData();
    }

    function handleIncreaseIndex() {
        if (indexBill === bill.length - 1) {
            notify({ type: 'error', msg: 'This is the last bill' });
            return;
        }

        setIndexBill(indexBill + 1);
    }

    function handleDecreaseIndex() {
        if (indexBill === 0) {
            notify({ type: 'error', msg: 'This is the first bill' });
            return;
        }

        setIndexBill(indexBill - 1);
    }


    function handleSearch() {
        const fetchData = async () => {
            try {
                loadingRef.current = setTimeout(() => setIsLoading(true), 500);
                const res = await fetch('http://localhost:5000/bills/' + phone);
                const data = await res.json();

                if (data.status === 'error') {
                    notify({ type: 'error', msg: data.message });
                    return;
                }
                setCustomer(data.customer);
                setBill(data.billList);
            }
            catch (err) {
                notify({ type: 'error', msg: err.message });
            }
            finally {
                clearTimeout(loadingRef.current);
                setIsLoading(false);
            }
        }

        fetchData();
        // fetch('http://localhost:5000/bills/' + phone)
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data);
        //         if (data.status === 'error') {
        //             notify({ type: 'error', msg: data.message });
        //             return;
        //         }
        //         setCustomer(data.customer);
        //         setBill(data.billList);
        //     })
        //     .catch((err) => {
        //         notify({ type: 'error', msg: err.message });
        //     }
        //     );
    };

    const datenow = new Date();
    const current = getDateTime(datenow);
    return (
        <>

            <div className="customer">
                <div className="customer__left">
                    {bill && <span>{bill.length}</span>}
                    <div className="customer__info">
                        <div className="customer__title">
                            <div className="logo__shop">B</div>
                            <span>
                                Customer's Payment
                            </span>

                        </div>
                        <div className="customer__info__wrapper">

                            <div className="customer__info__left">
                                <div className="customer__input">
                                    <span>Name</span>
                                    <input
                                        value={customer.customerName}
                                        onChange={(e) => setCustomer({ ...customer, customerName: e.target.value })}
                                        type="text" />
                                </div>

                                <div className="customer__input">
                                    <span>Email</span>
                                    <input
                                        value={customer.customerEmail}
                                        onChange={(e) => setCustomer({ ...customer, customerEmail: e.target.value })}
                                        type="text" />
                                </div>

                                <div className="customer__input">
                                    <span>Address</span>
                                    <input
                                        value={customer.customerAddress}
                                        onChange={(e) => setCustomer({ ...customer, customerAddress: e.target.value })}
                                        type="text" />
                                </div>

                                <div className="customer__input">
                                    <span>Debt</span>
                                    <input
                                        value={customer.customerCurrentDebt}
                                        type="text" disabled />
                                </div>

                                <div className="customer__input">
                                    <span>Bill {indexBill + 1}</span>
                                    <input
                                        value={bill === null ? '' : bill[indexBill].billTotalPrice - bill[indexBill].billPayment}
                                        type="text" disabled />
                                </div>

                                <div className="customer__input">
                                    <span>Payment</span>
                                    <input
                                        value={payment}
                                        onChange={
                                            (e) => {
                                                if (!Number.isInteger(Number(e.target.value)) || Number(e.target.value) < 0) {
                                                    setPayment('');
                                                    notify({ type: 'error', msg: 'Do not enter invalid character' });
                                                    return;
                                                }

                                                setPayment(e.target.value);
                                            }
                                        }
                                        type="text" />
                                </div>

                                <div className="customer__submit__button">
                                    <button onClick={handleSubmit}>Submit</button>
                                </div>
                            </div>

                            <div className="customer__info__right">
                                <div onClick={handleSearch}
                                    className="customer__avatar">
                                    <FontAwesomeIcon icon={faUser} className='icon__customer__avatar' />
                                </div>
                                <div className="customer__phone">
                                    <input
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        type="text" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="customer__right">
                    <div className="payment">
                        {bill === null ? <NothingDisplay /> :

                            <>
                                <button
                                    onClick={handleDecreaseIndex}
                                    className='payment__change__btn payment__change__left'>
                                    <FontAwesomeIcon icon={faArrowLeft} className='icon__change' />
                                </button>

                                <button
                                    onClick={handleIncreaseIndex}
                                    className='payment__change__btn payment__change__right'>
                                    <FontAwesomeIcon icon={faArrowRight} className='icon__change' />
                                </button>
                                <div className="payment__header">
                                    <h3>B-BOOKSHOP</h3>
                                    <p>207 St., Cu Chi district, Ho Chi Minh city</p>
                                    <p>{current}</p>
                                    <h4>BOOK BILL</h4>
                                </div>

                                <div className="payment__body">
                                    <div className="payment__customer__detail">
                                        <h5>Customer: {customer.customerName} - {customer.customerPhone}</h5>
                                    </div>

                                    <div className="payment__book__temp">

                                        <div className="payment__book__detail">
                                            <div className="payment__booklist">
                                                {bill[indexBill].billBookList.map((book, index) => (
                                                    <div className="payment__book" key={index}>
                                                        <p>{index + 1}. {book.bookName}</p>
                                                        <p>x{book.amountBought}</p>
                                                        <p>{new Intl.NumberFormat('de-DE').format(book.bookPrice)}</p>
                                                    </div>
                                                ))}

                                            </div>
                                        </div>

                                        <div className="payment__calculation">
                                            <div className="payment__status">
                                                <div className="payment__status__icon">
                                                    {bill[indexBill].billPayment === bill[indexBill].billTotalPrice ?
                                                        <FontAwesomeIcon icon={faCheck} className='icon__payment__status' />
                                                        :
                                                        <FontAwesomeIcon icon={faX} className='icon__payment__status' />
                                                    }
                                                </div>
                                            </div>
                                            <div className="payment__calculation__items">
                                                <div className="payment__caculation__item">
                                                    <p>Total</p>
                                                    <p>{new Intl.NumberFormat('de-DE').format(bill[indexBill].billTotalPrice)}</p>
                                                </div>
                                                <div className="payment__caculation__item">
                                                    <p>Payment</p>
                                                    <p>{new Intl.NumberFormat('de-DE').format(payment)}</p>
                                                </div>

                                                <div className="payment__caculation__item">
                                                    <p>Left</p>
                                                    <p>{new Intl.NumberFormat('de-DE').format(Number(bill[indexBill].billPayment) - Number(bill[indexBill].billTotalPrice))}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }

                    </div>
                </div>
            </div>

        </>

    );
};

export default Customer;