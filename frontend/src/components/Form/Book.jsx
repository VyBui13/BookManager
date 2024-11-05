import React, { useEffect } from 'react';
import { useState, useContext } from 'react';
import { useNotification } from '../NotificationContext.jsx';
import '../../styles/Book.css';
import { getCurrentDateTime } from '../../utils/DateCurrent.js';
import { ConfigContext } from '../Config.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'

function Book() {
    const { notify } = useNotification();
    const currDate = getCurrentDateTime();
    const { regulation } = useContext(ConfigContext);
    // const [listBook, setListBook] = useState([]);
    const [book, setBook] = useState({
        bookName: '',
        bookKind: '',
        bookAuthor: '',
        bookAmount: 0,
    });

    function handleSummit() {
        if (book.bookName === '' || book.bookKind === '' || book.bookAuthor === '' || book.bookAmount === 0) {
            notify({ type: 'error', msg: 'Please fill all field!' });
        }
        else if (book.bookAmount < regulation.bookMinAmountInput) {
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
            <div className="form-container">
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
            </div>
        </>
    );
};

export default Book;