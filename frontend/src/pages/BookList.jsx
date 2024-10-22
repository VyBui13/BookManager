import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import '../styles/List.css';

function BookList() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/books')
            .then(response => response.json())
            .then(data => {
                setBooks(data);
            });
    }, []); // []: run only once

    return (
        <>
            <div className="list-container">
                <div className="list">
                    <div className="list__title">
                        Book List
                        <i className="fa-solid fa-book-open"></i>
                    </div>
                    <div className="list__body">

                        <div className="list__content">

                            <div className="list__field">
                                <div className="list__attribute">
                                    Name
                                </div>
                                <div className="list__attribute">
                                    Kind
                                </div>
                                <div className="list__attribute">
                                    Author
                                </div>
                                <div className="list__attribute">
                                    {/* PresentAmount */}
                                    Amount
                                </div>
                            </div>

                            <div className="list__items">
                                {books.map((book) => (
                                    <div className="list__item" key={book._id}>
                                        <div className="list__attribute">
                                            {book._bookName}
                                        </div>
                                        <div className="list__attribute">
                                            {book._bookKind}
                                        </div>
                                        <div className="list__attribute">
                                            {book._bookAuthor}
                                        </div>
                                        <div className="list__attribute">
                                            {book._bookPresentAmount}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookList;