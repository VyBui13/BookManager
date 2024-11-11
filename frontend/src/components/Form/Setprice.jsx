import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import BookSelected from '../BookSelected';
import '../../styles/List.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'

function setPrice() {
    const [books, setBooks] = useState([]);
    const [bookPrice, setBookPrice] = useState({});

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
                {bookPrice._id && <BookSelected bookPrice={bookPrice} setBookPrice={setBookPrice} setBooks={setBooks} />}
                <div className="list">
                    <div className="list__title">
                        Book List
                        <FontAwesomeIcon icon={faBookOpen} className="icon__header" />
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
                                            {book.bookName}
                                        </div>
                                        <div className="list__attribute">
                                            {book.bookKind}
                                        </div>
                                        <div className="list__attribute">
                                            {book.bookAuthor}
                                        </div>
                                        <div className="list__attribute">
                                            <button style={book.bookPrice === 0 ? { backgroundColor: 'red' } : { backgroundColor: '#77f740' }}
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