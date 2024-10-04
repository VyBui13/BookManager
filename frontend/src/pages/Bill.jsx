import React from 'react';
import { useState } from 'react';
import { nofi } from '../components/Notify.jsx';
import '../styles/Form.css';

function Bill() {
    const [bill, setBill] = useState({
        nameBook: '',
        kindBook: '',
        authorBook: '',
        priceBook: '',
        customer: '',
    });

    function handleSummit() {

        if (bill.nameBook === '' || bill.kindBook === '' || bill.authorBook === '' || bill.priceBook === '' || bill.customer === '') {
            nofi({ type: 'error', msg: 'Please fill all fields!' });
        }
        else {
            setBill({
                nameBook: '',
                kindBook: '',
                authorBook: '',
                amountBook: '',
                customer: '',
            });
            nofi({ type: 'success', msg: 'Everything is good!' });
        }
    }

    const currDate = new Date().toLocaleDateString();

    return (
        <>
            <div className="form-container">
                <div class="form form--bill">
                    <div class="form__title">
                        bill
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
                                    value={bill.nameBook}
                                    onChange={(e) => setBill({ ...bill, nameBook: e.target.value })}
                                    type="text" required />
                                <div class="form__labelline">Enter book name</div>
                            </div>

                            <div class="form__inputbox">
                                <span class="form__detail">Kind</span>
                                <input
                                    value={bill.kindBook}
                                    onChange={(e) => setBill({ ...bill, kindBook: e.target.value })}
                                    type="text" required />
                                <div class="form__labelline">Enter book kind</div>
                            </div>

                            <div class="form__inputbox">
                                <span class="form__detail">Author</span>
                                <input
                                    value={bill.authorBook}
                                    onChange={(e) => setBill({ ...bill, authorBook: e.target.value })}
                                    type="text" required />
                                <div class="form__labelline">Enter book author</div>
                            </div>

                            <div class="form__inputbox">
                                <span class="form__detail">Price</span>
                                <input
                                    value={bill.priceBook}
                                    onChange={(e) => setBill({ ...bill, priceBook: e.target.value })}
                                    type="number" required />
                                <div class="form__labelline">Enter book price</div>
                            </div>

                            <div class="form__inputbox">
                                <span class="form__detail">Customer</span>
                                <input
                                    value={bill.customer}
                                    onChange={(e) => setBill({ ...bill, customer: e.target.value })}
                                    type="number" required />
                                <div class="form__labelline">Enter book customer</div>
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

export default Bill;