import React from 'react';
import { useState } from 'react';
import { nofi } from '../components/Notify.jsx';
import '../styles/Form.css';

function Book() {
    const [book, setBook] = useState({
        name: '',
        kind: '',
        author: '',
        amount: ''
    });

    function handleSummit() {
        console.log(book);
        if (book.name === '' || book.kind === '' || book.author === '' || book.amount === '') {
            nofi({ type: 'error', msg: 'Please fill all fields!' });
        }
        else {
            setBook({
                name: '',
                kind: '',
                author: '',
                amount: ''
            });
            nofi({ type: 'success', msg: 'Everything is good!' });
        }
    }

    const currDate = new Date().toLocaleDateString();

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
                                    value={book.amount}
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