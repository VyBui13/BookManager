import React, { useEffect } from 'react';
import { useState } from 'react';
import { nofi } from '../Notify.jsx';
import '../../styles/Form.css';
import { getCurrentDate } from '../../utils/DateCurrent.js';
import BillBookList from '../BillBookList.jsx';

function Bill() {
    const currDate = getCurrentDate();
    const [isHide, setIsHide] = useState(true);
    const [bill, setBill] = useState({
        bookList: [],
        nameCustomer: '',
        updateDate: currDate,
    });

    function handleAdd() {
        if (bill.nameCustomer === '') {
            nofi({ type: 'error', msg: 'Please fill customer name!' });
        }
        else {
            setIsHide(!isHide);
        }
    }

    function handleSummit() {
        if (bill.nameCustomer === '') {
            nofi({ type: 'error', msg: 'Please fill customer name!' });
        }
        else if (bill.bookList.length === 0) {
            nofi({ type: 'warning', msg: 'Please choose book!' });
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
                bookList: [],
                nameCustomer: '',
            });
            nofi({ type: 'success', msg: 'Everything is good!' });
        }
    }

    return (
        <>
            <div className="form-container form--bill">
                {!isHide && <BillBookList setIsHide={setIsHide} setBill={setBill} booklist={bill.bookList} />}
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

                            {/* <div className="form__inputbox">
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
                            </div> */}

                            <div className="form__inputbox">
                                <span className="form__detail">NameCustomer</span>
                                <input
                                    value={bill.customer}
                                    onChange={(e) => setBill({ ...bill, nameCustomer: e.target.value })}
                                    type="text" required />
                                <div className="form__labelline">Enter customer name</div>
                            </div>

                            <div className="form__inputbox">
                                <span className="form__detail">Add/Edit Book</span>
                                <div className="form__addbook"
                                    onClick={handleAdd}
                                >ADD/EDIT</div>
                            </div>

                            {(bill.bookList.length !== 0) && <div className="form__booklist">
                                <div className="form__booklist-field form__booklist-header">
                                    <div className="form__booklist-attribute">
                                        Name
                                    </div>
                                    <div className="form__booklist-attribute">
                                        Kind
                                    </div>
                                    <div className="form__booklist-attribute">
                                        Author
                                    </div>
                                    <div className="form__booklist-attribute">
                                        Price
                                    </div>
                                    <div className="form__booklist-attribute">
                                        Amount
                                    </div>
                                </div>

                                {bill.bookList.map((book, index) => (
                                    <div className="form__booklist-field form__booklist-detail" key={index}>
                                        <div className="form__booklist-attribute">
                                            {book._bookName}
                                        </div>
                                        <div className="form__booklist-attribute">
                                            {book._bookKind}
                                        </div>
                                        <div className="form__booklist-attribute">
                                            {book._bookAuthor}
                                        </div>
                                        <div className="form__booklist-attribute">
                                            {book._bookPrice}
                                        </div>
                                        <div className="form__booklist-attribute">
                                            <div className="wrapper__item">

                                                {book._amountBought}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>}

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