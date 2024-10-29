import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import '../styles/BookList.css';

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
            <div className="booklist">
                {
                    books.map(book => (
                        <div className="booklist__item">
                            <div className="booklist__icon">
                                <i className="fa-solid fa-book"></i>
                            </div>

                            <div className="booklist__header">
                                <div className="booklist__bookname">
                                    {book._bookName}
                                </div>
                            </div>

                            <div className="booklist__content">
                                <div className="booklist__price">
                                    {book._bookPrice} VND
                                </div>

                                <div className="booklist__detail">
                                    Latest udated date: {book._updateDate}
                                </div>

                                <div className="booklist__detail">
                                    Author: {book._bookAuthor}
                                </div>

                                <div className="booklist__detail">
                                    Kind: {book._bookKind}
                                </div>

                                <div className="booklist__detail">
                                    Amount:
                                    <span>{book._bookPresentAmount}</span>
                                </div>

                            </div>
                        </div>
                    ))
                }


            </div>
        </>
    )
}

export default BookList;