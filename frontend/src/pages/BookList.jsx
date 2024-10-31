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
            })
            .catch((error) => {
                console.log(error);
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
                        </div>
                    ))
                }


            </div>
        </>
    )
}

export default BookList;