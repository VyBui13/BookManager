import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import '../styles/BookList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faMagnifyingGlass, faUpLong, faDownLong } from '@fortawesome/free-solid-svg-icons'

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
            <div className="booklist-container">
                <div className="page__header">
                    <p>Manager</p>
                    <h1>Booklist</h1>
                </div>

                {/* <div className="booklist__search">
                    <button className="booklist__search-item">
                        <div className="booklist__search-icon">
                            <FontAwesomeIcon icon={faBook} className='icon__book' />
                        </div>
                        <div className="booklist__search-title">
                            <h1>Search</h1>
                            <p>by name</p>
                        </div>
                    </button>

                    <button className="booklist__search-item">
                        <div className="booklist__search-icon">
                            <FontAwesomeIcon icon={faBook} className='icon__book' />
                        </div>
                        <div className="booklist__search-title">
                            <h1>Search</h1>
                            <p>by kind</p>
                        </div>
                    </button>

                    <button className="booklist__search-item">
                        <div className="booklist__search-icon">
                            <FontAwesomeIcon icon={faBook} className='icon__book' />
                        </div>
                        <div className="booklist__search-title">
                            <h1>Search</h1>
                            <p>by author</p>
                        </div>
                    </button>

                    <button className="booklist__search-item">
                        <div className="booklist__search-icon">
                            <FontAwesomeIcon icon={faBook} className='icon__book' />
                        </div>
                        <div className="booklist__search-title">
                            <h1>Sort</h1>
                            <p>by price</p>
                        </div>
                    </button>

                </div> */}
                <div className="booklist__body">
                    <div className="booklist">
                        {
                            books.map(book => (
                                <div className="booklist__item">
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
                            <div className="booklist__filterkind-item">
                                <input type="checkbox" id="1" />
                                <label htmlFor="1">Novel</label>
                            </div>

                            <div className="booklist__filterkind-item">
                                <input type="checkbox" id="2" />
                                <label htmlFor="2">Fiction</label>
                            </div>

                            <div className="booklist__filterkind-item">
                                <input type="checkbox" id="3" />
                                <label htmlFor="3">Biography</label>
                            </div>

                            <div className="booklist__filterkind-item">
                                <input type="checkbox" id="4" />
                                <label htmlFor="4">Autobiography</label>
                            </div>
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

                </div>
            </div >
        </>
    )
}

export default BookList;