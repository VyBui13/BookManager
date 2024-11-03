import React, { useEffect } from 'react';
import { useState } from 'react';
import { nofi } from '../Notify.jsx';
import '../../styles/Form.css';
import { getCurrentDate } from '../../utils/DateCurrent.js';
import '../../styles/Bill.css';
import BillAmount from '../BillAmount.jsx';

function Bill() {
    const currDate = getCurrentDate();
    const [bill, setBill] = useState({
        bookList: [],
        customerName: '',
        updateDate: currDate,
    });
    console.log(bill);
    const [book, setBook] = useState({});
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/books')
            .then(response => response.json())
            .then(data => {
                setBooks(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []); //

    // function handleAdd() {
    //     if (bill.customerName === '') {
    //         nofi({ type: 'error', msg: 'Please fill customer name!' });
    //     }
    //     else {
    //         setIsHide(!isHide);
    //     }
    // }

    function handleSummit() {
        if (bill.customerName === '') {
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
                    nofi({ type: data.status, msg: data.message });
                })
                .catch((error) => {
                    nofi({ type: error.status, msg: error.message });
                });

            setBill({
                ...bill,
                bookList: [],
                customerName: '',
            });
        }
    }

    return (
        <>
            {book.bookName && <BillAmount book={book} setBook={setBook} bill={bill} setBill={setBill} />}
            <div className="bill">
                <div className="bill__booklist">
                    <div className="booklist">
                        {
                            books.map(book => (
                                <div className="booklist__item" key={book._id}>
                                    <div className="booklist__icon">
                                        <i className="fa-solid fa-book"></i>
                                    </div>

                                    <div className="booklist__header">
                                        <div className="booklist__bookname">
                                            {book.bookName}
                                        </div>
                                    </div>

                                    <div className="booklist__content">

                                        <div className="booklist__price">
                                            {book.bookPrice} VND
                                        </div>

                                        <div className="booklist__detail">
                                            Latest udated date: {book.updateDate}
                                        </div>

                                        <div className="booklist__detail">
                                            Author: {book.bookAuthor}
                                        </div>

                                        <div className="booklist__detail">
                                            Kind: {book.bookKind}
                                        </div>

                                        <div className="booklist__detail">
                                            Amount:
                                            <span>{book.bookCurrentAmount}</span>
                                        </div>

                                    </div>

                                    <div className="booklist__button">
                                        <div onClick={
                                            () => {
                                                books.forEach((item) => {
                                                    if (item._id === book._id) {
                                                        setBook({
                                                            _id: item._id,
                                                            bookName: item.bookName,
                                                            bookKind: item.bookKind,
                                                            bookAuthor: item.bookAuthor,
                                                            bookPrice: item.bookPrice,
                                                            amountBought: 0,
                                                        });
                                                        return;
                                                    }
                                                });
                                            }
                                        }
                                            className="booklist__buttonwrapper">
                                            <span>+</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                </div>

                <div className="bill__form">
                    <div className="bill__formtitle">
                        Bill
                    </div>

                    <div className="bill__formbody">
                        <div className="bill__formitem">
                            <span className="bill__formdetail">CustomerName:</span>
                            <input
                                value={bill.customerName}
                                onChange={(e) => setBill({ ...bill, customerName: e.target.value.trim() })}
                                type="text" required />
                        </div>

                        {(bill.bookList.length !== 0) && <div className="bill__formitem">
                            <span className="bill__formdetail">BookList:</span>
                        </div>}

                        {(bill.bookList.length !== 0) && <div className="bill__listcontainer">
                            <div className="bill__list">
                                <div className="bill__listitem">
                                    <span>Name</span>
                                </div>
                                <div className="bill__listitem">
                                    <span>Kind</span>
                                </div>
                                <div className="bill__listitem">
                                    <span>Author</span>
                                </div>
                                <div className="bill__listitem">
                                    <span>Price</span>
                                </div>
                                <div className="bill__listitem">
                                    <span>Amount</span>
                                </div>
                                <div className="bill__listitem">
                                    <span>BTN</span>
                                </div>

                            </div>

                            {
                                bill.bookList.map(book => (
                                    <>
                                        <div className="bill__list">
                                            <div className="bill__listitem">
                                                <span>{book.bookName}</span>
                                            </div>
                                            <div className="bill__listitem">
                                                <span>{book.bookKind}</span>
                                            </div>
                                            <div className="bill__listitem">
                                                <span>{book.bookAuthor}</span>
                                            </div>
                                            <div className="bill__listitem">
                                                <span>{book.bookPrice}</span>
                                            </div>
                                            <div className="bill__listitem">
                                                <span>{book.amountBought}</span>
                                            </div>
                                            <div className="bill__listitem">
                                                <button onClick={
                                                    () => {
                                                        setBill({
                                                            ...bill,
                                                            bookList: bill.bookList.filter(item => item._id !== book._id)
                                                        });
                                                    }
                                                }>-</button>
                                            </div>
                                        </div>
                                    </>
                                ))
                            }
                        </div>}
                    </div>

                    <div className="bill__btn">
                        <button onClick={handleSummit}>Submit</button>
                    </div>
                </div>



            </div >

        </>
    );
};

export default Bill;