import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import '../styles/BookList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faMagnifyingGlass, faUpLong, faDownLong } from '@fortawesome/free-solid-svg-icons'

function BookList() {
    const [books, setBooks] = useState([]);
    const [kinds, setKinds] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/books')
            .then(response => response.json())
            .then(data => {
                setBooks(data);
            })
            .catch((error) => {
                console.log(error);
            });

        fetch('http://localhost:5000/books/kinds')
            .then(response => response.json())
            .then(data => {
                setKinds(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []); // []: run only once

    return (
        <>
            <div className="booklist-container">
                <div className="page__header">
                    <p>Manager</p>
                    <h1>Booklist</h1>
                </div>

                <div className="booklist__body">
                    <div className="booklist__search">
                        <div className="booklist__search-header">
                            <h2>Search</h2>
                        </div>
                        <div className="booklist__searchbar">

                            <input type="text" placeholder="Search by name" />
                            <button>
                                <FontAwesomeIcon icon={faMagnifyingGlass} className='icon__search' />
                            </button>
                        </div>

                        <div className="booklist__search-header">
                            <h2>Kind</h2>
                        </div>
                        <div className="booklist__filterkind">
                            {kinds.map(kind => (
                                <div className="booklist__filterkind-item" key={kind}>
                                    <input type="checkbox" id={kind} />
                                    <label htmlFor={kind}>{kind}</label>
                                </div>
                            ))}
                        </div>

                        <div className="booklist__search-header">
                            <h2>Sort</h2>
                        </div>

                        <div className="booklist__sort">
                            <button className="booklist__sort-item">
                                <FontAwesomeIcon icon={faUpLong} className='icon__sort' />
                                <div className="booklist__sort-nameitem">
                                    Price
                                </div>
                            </button>

                            <button className="booklist__sort-item">
                                <FontAwesomeIcon icon={faDownLong} className='icon__sort' />
                                <div className="booklist__sort-nameitem">
                                    Price
                                </div>
                            </button>

                            <button className="booklist__sort-item">
                                <FontAwesomeIcon icon={faUpLong} className='icon__sort' />
                                <div className="booklist__sort-nameitem">
                                    Name
                                </div>
                            </button>

                            <button className="booklist__sort-item">
                                <FontAwesomeIcon icon={faDownLong} className='icon__sort' />
                                <div className="booklist__sort-nameitem">
                                    Name
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="booklist">
                        {
                            books.map(book => (
                                <div className="booklist__item" key={book._id}>
                                    <div className="booklist__icon">
                                        <FontAwesomeIcon icon={faBook} className='icon__book' />
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


                </div>
            </div >
        </>
    )
}

export default BookList;