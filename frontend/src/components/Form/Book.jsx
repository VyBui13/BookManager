import React, { useEffect } from 'react';
import { useState } from 'react';
import { nofi } from '../Notify.jsx';
import '../../styles/Form.css';
import { getCurrentDate } from '../../utils/DateCurrent.js';

function Book() {
    const currDate = getCurrentDate();
    const [book, setBook] = useState({
        bookName: '',
        bookKind: '',
        bookAuthor: '',
        bookAmount: 0,
        updateDate: currDate,
    });

    function handleSummit() {
        if (book.bookName === '' || book.bookKind === '' || book.bookAuthor === '' || book.bookAmount === 0) {
            nofi({ type: 'error', msg: 'Please fill all field!' });

        }
        else {
            fetch('http://localhost:5000/books', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(book)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
                .catch((error) => { console.log(error) })
                ;


            setBook({
                ...book,
                bookName: '',
                bookKind: '',
                bookAuthor: '',
                bookAmount: 0,
            });
            nofi({ type: 'success', msg: 'Everything is good!' });
        }
    }


    return (
        <>
            <div className="form-container form--bookimport">
                <div className="form">
                    <div className="form__title">
                        book import
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
                                    value={book.bookName}
                                    onChange={(e) => setBook({ ...book, bookName: e.target.value })}
                                    type="text" required />
                                <div className="form__labelline">Enter book name</div>
                            </div>

                            <div className="form__inputbox">
                                <span className="form__detail">Kind</span>
                                <input
                                    value={book.bookKind}
                                    onChange={(e) => setBook({ ...book, bookKind: e.target.value })}
                                    type="text" required />
                                <div className="form__labelline">Enter book kind</div>
                            </div>

                            <div className="form__inputbox">
                                <span className="form__detail">Author</span>
                                <input
                                    value={book.bookAuthor}
                                    onChange={(e) => setBook({ ...book, bookAuthor: e.target.value })}
                                    type="text" required />
                                <div className="form__labelline">Enter book author</div>
                            </div>

                            <div className="form__inputbox">
                                <span className="form__detail">Amount</span>
                                <input
                                    value={book.bookAmount === 0 ? '' : book.bookAmount}
                                    onChange={(e) => setBook({ ...book, bookAmount: e.target.value })}
                                    type="number" required />
                                <div className="form__labelline">Enter book amount</div>
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

export default Book;