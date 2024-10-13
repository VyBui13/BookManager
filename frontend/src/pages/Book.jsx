import React, { useEffect } from 'react';
import { useState } from 'react';
import { nofi } from '../components/Notify.jsx';
import '../styles/Form.css';

function Book() {
    function getCurrentDate() {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = today.getFullYear();

        return `${day}/${month}/${year}`;
    }

    const currDate = getCurrentDate();
    const [book, setBook] = useState({
        name: '',
        kind: '',
        author: '',
        amount: 0,
        updateDate: currDate,
    });

    function handleSummit() {
        if (book.name === '' || book.kind === '' || book.author === '' || book.amount === '') {
            nofi({ type: 'error', msg: 'Please fill all fields!' });
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
                });

            setBook({
                ...book,
                name: '',
                kind: '',
                author: '',
                amount: ''
            });
            nofi({ type: 'success', msg: 'Everything is good!' });
        }
    }


    return (
        <>
            <div className="form-container form--bookimport">
                <div class="form">
                    <div class="form__title">
                        book import
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
                                    value={book.name}
                                    onChange={(e) => setBook({ ...book, name: e.target.value })}
                                    type="text" required />
                                <div class="form__labelline">Enter book name</div>
                            </div>

                            <div class="form__inputbox">
                                <span class="form__detail">Kind</span>
                                <input
                                    value={book.kind}
                                    onChange={(e) => setBook({ ...book, kind: e.target.value })}
                                    type="text" required />
                                <div class="form__labelline">Enter book kind</div>
                            </div>

                            <div class="form__inputbox">
                                <span class="form__detail">Author</span>
                                <input
                                    value={book.author}
                                    onChange={(e) => setBook({ ...book, author: e.target.value })}
                                    type="text" required />
                                <div class="form__labelline">Enter book author</div>
                            </div>

                            <div class="form__inputbox">
                                <span class="form__detail">Amount</span>
                                <input
                                    value={book.amount === 0 ? '' : book.amount}
                                    onChange={(e) => setBook({ ...book, amount: e.target.value })}
                                    type="number" required />
                                <div class="form__labelline">Enter book amount</div>
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

export default Book;