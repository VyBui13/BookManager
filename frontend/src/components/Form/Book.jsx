import React, { useEffect } from 'react';
import { useState, useContext } from 'react';
import { useNotification } from '../NotificationContext.jsx';
import '../../styles/Book.css';
import { getCurrentDateTime } from '../../utils/DateCurrent.js';
import { ConfigContext } from '../Config.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'

function Book() {
    const { notify } = useNotification();
    const currDate = getCurrentDateTime();
    const { regulation } = useContext(ConfigContext);
    // const [listBook, setListBook] = useState([]);
    const [book, setBook] = useState({
        bookName: 'To Kill a Mockingbird',
        bookKind: [
            'Action',
            'Adventure',
        ],
        bookAuthor: [
            'Harper Lee',
            'J.K. Rowling',
            'J.R.R. Tolkien',
        ],
        bookAmount: 0,
    });

    function handleSummit() {
        if (book.bookName === '' || book.bookKind === '' || book.bookAuthor === '' || book.bookAmount === 0) {
            notify({ type: 'error', msg: 'Please fill all field!' });
        }
        else if (Number(book.bookAmount) < Number(regulation.bookMinAmountInput)) {
            notify({ type: 'warning', msg: 'The minimum number of import amount books is ' + regulation.bookMinAmountInput });
            return;
        }
        else {
            fetch('http://localhost:5000/books', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...book, updateDate: getCurrentDateTime(), regulation: regulation.bookMaxAmountAllow })
            })
                .then(response => response.json())
                .then(data => {
                    notify({ type: data.status, msg: data.message });
                })
                .catch((error) => {
                    notify({ type: 'error', msg: error.message });
                });
            setBook({
                ...book,
                bookName: '',
                bookKind: '',
                bookAuthor: '',
                bookAmount: 0,
            });
        }
    }


    return (
        <>
            {/* <div className="form-container">
                <div className="form">
                    <div className="form__title">
                        book import
                    </div>

                    <div className="form__localtime">
                        <div className="form__localtime-content">
                            {currDate}
                        </div>
                        <div className="form__localtime-icon">
                            <FontAwesomeIcon icon={faCalendar} className='icon__time' />

                        </div>
                    </div>
                    <form action="#">
                        <div className="form__userdetail">
                            <div className="form__inputbox">
                                <span className="form__detail">Name</span>
                                <input
                                    value={book.bookName}
                                    onChange={(e) => setBook({ ...book, bookName: e.target.value.trim() })}
                                    type="text" required />
                                <div className="form__labelline">Enter book name</div>
                            </div>

                            <div className="form__inputbox">
                                <span className="form__detail">Kind</span>
                                <input
                                    value={book.bookKind}
                                    onChange={(e) => setBook({ ...book, bookKind: e.target.value.trim() })}
                                    type="text" required />
                                <div className="form__labelline">Enter book kind</div>
                            </div>

                            <div className="form__inputbox">
                                <span className="form__detail">Author</span>
                                <input
                                    value={book.bookAuthor}
                                    onChange={(e) => setBook({ ...book, bookAuthor: e.target.value.trim() })}
                                    type="text" required />
                                <div className="form__labelline">Enter book author</div>
                            </div>

                            <div className="form__inputbox">
                                <span className="form__detail">Amount</span>
                                <input
                                    value={book.bookAmount === 0 ? '' : book.bookAmount}
                                    onChange={(e) => setBook({ ...book, bookAmount: e.target.value.trim() })}
                                    type="number" required />
                                <div className="form__labelline">Enter book amount</div>
                            </div>
                        </div>
                    </form>

                    <div className="form__button">
                        <button className="form__submit" onClick={handleSummit}>Submit</button>
                    </div>

                </div>
            </div> */}

            <div className="book-container">
                <div className="book">
                    <div className="book__review">
                        <div className="book__icon">
                            <FontAwesomeIcon icon={faBook} className='icon__book' />
                        </div>
                        <div className="book__review__title">
                            {book.bookName}
                        </div>

                        <div className="book__review__body">
                            <div className="book__review__item">
                                <span className="book__review__label">Kind</span>
                                <span className="book__review__value">{book.bookKind.slice(0, 2).join(', ')}{book.bookKind.length > 2 ? ',...' : ''}</span>
                            </div>

                            <div className="book__review__item">
                                <span className="book__review__label">Author</span>
                                <span className="book__review__value">{book.bookAuthor.slice(0, 2).join(', ')}{book.bookAuthor.length > 2 ? ',...' : ''}</span>
                            </div>

                            <div className="book__review__item">
                                <span className="book__review__label">Amount</span>
                                <span className="book__review__value">{book.bookAmount}</span>
                            </div>
                        </div>
                    </div>
                    <div className="book__detail">
                        <div className="book__detail__wrapper">

                            <div className="book__detail__inputbox">
                                <span className="book__detail__label">Name</span>
                                <input
                                    value={book.bookName}
                                    onChange={(e) => setBook({ ...book, bookName: e.target.value })}
                                    type="text"
                                    placeholder='Enter book name' />
                            </div>

                            <div className="book__detail__amount">
                                <button>-</button>
                                <input
                                    value={book.bookAmount}
                                    onChange={(e) => setBook({ ...book, bookAmount: e.target.value })}
                                    type="number" />
                                <button>+</button>
                            </div>
                        </div>

                        <div className="book__detail__wrapper">

                            <div className="book__detail__item">
                                <span className="book__detail__label">Author</span>
                                <input type="text" />
                                <button>+</button>
                            </div>

                            <div className="book__detail__item">
                                <span className="book__detail__label">Kind</span>
                                <input type="text" />
                                <button>+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Book;