import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import BookSelected from '../BookSelected';
import '../../styles/List.css';

function setPrice() {
    const [books, setBooks] = useState([]);
    const [bookPrice, setBookPrice] = useState({});
    console.log(bookPrice);

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
                {bookPrice._id && <BookSelected bookPrice={bookPrice} />}
                <div className="list">
                    <div className="list__title">
                        Book List
                        <i class="fa-solid fa-book-open"></i>
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
                                    Price
                                </div>
                            </div>

                            <div className="list__items">
                                {books.map((book) => (
                                    <div className="list__item" key={book._id}>
                                        <div className="list__attribute">
                                            {book.Name}
                                        </div>
                                        <div className="list__attribute">
                                            {book.Kind}
                                        </div>
                                        <div className="list__attribute">
                                            {book.Author}
                                        </div>
                                        <div className="list__attribute">
                                            <button
                                                onClick={(e) => {
                                                    const updateBook = books.find(b => b._id === book._id);
                                                    setBookPrice(updateBook);
                                                }}
                                            >Edit</button>
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

export default setPrice;