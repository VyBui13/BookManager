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
                console.log(data);
                setBooks(data);
            });
    }, []);

    return (
        <>
            <div className="booklist-container">
                <div className="booklist">
                    <div className="booklist__title">
                        Book List
                    </div>
                    <div className="booklist__content">
                        <div className="booklist__field">
                            <div className="booklist__attribute">
                                Name
                            </div>
                            <div className="booklist__attribute">
                                Kind
                            </div>
                            <div className="booklist__attribute">
                                Author
                            </div>
                            <div className="booklist__attribute">
                                {/* PresentAmount */}
                                Amount
                            </div>
                        </div>

                        <div className="booklist__items">
                            {books.map((book) => (
                                <div className="booklist__item">
                                    <div className="booklist__attribute">
                                        {book.Name}
                                    </div>
                                    <div className="booklist__attribute">
                                        {book.Kind}
                                    </div>
                                    <div className="booklist__attribute">
                                        {book.Author}
                                    </div>
                                    <div className="booklist__attribute">
                                        {book.PresentAmount}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookList;