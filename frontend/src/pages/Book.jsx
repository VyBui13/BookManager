import React from 'react';
import '../styles/Form.css';

function Book() {
    return (
        <div className="form-container">
            <div class="form form--bookimport">
                <div class="form__title">
                    book import
                </div>

                <form action="#">
                    <div class="form__userdetail">
                        <div class="form__inputbox">
                            <span class="form__detail">Name</span>
                            <input type="text" id="book-name" required />
                            <div class="form__labelline">Enter book name</div>
                        </div>

                        <div class="form__inputbox">
                            <span class="form__detail">Kind</span>
                            <input type="text" id="book-kind" required />
                            <div class="form__labelline">Enter book kind</div>
                        </div>

                        <div class="form__inputbox">
                            <span class="form__detail">Author</span>
                            <input type="text" id="book-author" required />
                            <div class="form__labelline">Enter book author</div>
                        </div>

                        <div class="form__inputbox">
                            <span class="form__detail">Amount</span>
                            <input type="number" id="book-amount" required />
                            <div class="form__labelline">Enter book amount</div>
                        </div>
                    </div>
                </form>

                <div class="form__button">
                    <button class="form__submit" onclick="submitForm()">Submit</button>
                </div>

            </div>
        </div>
    );
};

export default Book;