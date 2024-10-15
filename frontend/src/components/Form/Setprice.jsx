import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import '../../styles/BookList.css';

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
            <div className="booklist-container">
                <div className="booklist">
                    <div className="booklist__title">
                        Book List
                        <i class="fa-solid fa-book-open"></i>
                    </div>
                    <div className="booklist__body">

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
                                    Price
                                </div>
                            </div>

                            <div className="booklist__items">
                                {books.map((book) => (
                                    <div className="booklist__item" key={book._id}>
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
                                            <input
                                                type="text"
                                                value={book.Price}
                                                onInput={(e) => {
                                                    const updatedBooks = books.map((b) => {
                                                        if (book._id === b._id) {
                                                            console.log(b._id);
                                                            console.log("1");
                                                            return { ...b, Price: e.target.value };
                                                        } else {
                                                            console.log("2");
                                                            return b;
                                                        }
                                                    }
                                                    );
                                                    console.log(updatedBooks);
                                                    setBooks(updatedBooks);
                                                }
                                                }
                                            />
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