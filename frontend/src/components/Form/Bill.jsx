import React, { useEffect } from 'react';
import { useState } from 'react';
import { nofi } from '../Notify.jsx';
import '../../styles/Form.css';
import { getCurrentDate } from '../../utils/DateCurrent.js';

function Bill() {
    const currDate = getCurrentDate();

    const [bill, setBill] = useState({
        nameBook: '',
        kindBook: '',
        authorBook: '',
        amountBook: '',
        priceBook: '',
        customer: '',
        updateDate: currDate,
    });

    function handleSummit() {

        if (bill.nameBook === '' || bill.kindBook === '' || bill.authorBook === '' || bill.amountBook === '' || bill.priceBook === '' || bill.customer === '') {
            nofi({ type: 'error', msg: 'Please fill all fields!' });
        }
        else {
            fetch('http://localhost:5000/customers/bill', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bill)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
                .catch((error) => { console.log(error) });

            setBill({
                ...bill,
                nameBook: '',
                kindBook: '',
                authorBook: '',
                amountBook: '',
                priceBook: '',
                customer: '',
            });
            nofi({ type: 'success', msg: 'Everything is good!' });
        }
    }

    return (
        <>
            <div className="form-container form--bill">
                <div className="form">
                    <div className="form__title">
                        bill
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
                                    value={bill.nameBook}
                                    onChange={(e) => setBill({ ...bill, nameBook: e.target.value })}
                                    type="text" required />
                                <div className="form__labelline">Enter book name</div>
                            </div>

                            <div className="form__inputbox">
                                <span className="form__detail">Kind</span>
                                <input
                                    value={bill.kindBook}
                                    onChange={(e) => setBill({ ...bill, kindBook: e.target.value })}
                                    type="text" required />
                                <div className="form__labelline">Enter book kind</div>
                            </div>

                            <div className="form__inputbox">
                                <span className="form__detail">Author</span>
                                <input
                                    value={bill.authorBook}
                                    onChange={(e) => setBill({ ...bill, authorBook: e.target.value })}
                                    type="text" required />
                                <div className="form__labelline">Enter book author</div>
                            </div>

                            <div className="form__inputbox">
                                <span className="form__detail">Amount</span>
                                <input
                                    value={bill.amountBook}
                                    onChange={(e) => setBill({ ...bill, amountBook: e.target.value })}
                                    type="number" required />
                                <div className="form__labelline">Enter amount book</div>
                            </div>

                            <div className="form__inputbox">
                                <span className="form__detail">Price</span>
                                <input
                                    value={bill.priceBook}
                                    onChange={(e) => setBill({ ...bill, priceBook: e.target.value })}
                                    type="number" required />
                                <div className="form__labelline">Enter book price</div>
                            </div>

                            <div className="form__inputbox">
                                <span className="form__detail">Customer</span>
                                <input
                                    value={bill.customer}
                                    onChange={(e) => setBill({ ...bill, customer: e.target.value })}
                                    type="text" required />
                                <div className="form__labelline">Enter book customer</div>
                            </div>
                        </div>
                    </form>

                    <div className="form__button">
                        <button className="form__submit" onClick={handleSummit}>Submit</button>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Bill;