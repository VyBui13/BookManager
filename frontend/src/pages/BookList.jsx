import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import '../styles/BookList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faMagnifyingGlass, faUpLong, faDownLong } from '@fortawesome/free-solid-svg-icons'
import EachPageHeader from '../components/EachPageHeader';

function BookList() {
    const [books, setBooks] = useState([]);
    const [kinds, setKinds] = useState([]);
    const [kindsFilter, setKindsFilter] = useState([]);
    const [search, setSearch] = useState('');

    function handleSearch(sortFeature, type) {
        let url = 'http://localhost:5000/books/search?';
        let flag = false;
        if (kindsFilter.length !== 0) {
            url += 'bookKind=' + kindsFilter.join(',');
            flag = true;
        }
        if (search !== '') {
            if (flag) {
                url += '&';
            }
            url += 'keySearch=' + search;
            flag = true;
        }

        if (sortFeature !== '') {
            if (flag) {
                url += '&';
            }
            if (sortFeature === 'price') {
                url += 'sort=bookPrice';
            } else {
                url += 'sort=bookName';
            }

            if (type === 'asc') {
                url += '&type=asc';
            } else {
                url += '&type=desc';
            }
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setBooks(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        handleSearch('', '');
    }, [kindsFilter]);


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
            {/* <div className="page__header">
                <p>Manager</p>
                <h1>Booklist</h1>
            </div> */}

            <EachPageHeader title="Booklist" description="BookPage" />

            <div className="booklist__body">
                <div className="booklist__search">
                    <div className="booklist__search-header">
                        <h2>Search</h2>
                    </div>
                    <div className="booklist__searchbar">

                        <input type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name" />
                        <button onClick={() => {
                            handleSearch('', '');
                        }}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} className='icon__search' />
                        </button>
                    </div>

                    <div className="booklist__search-header">
                        <h2>Kind</h2>
                    </div>
                    <div className="booklist__filterkind">
                        {kinds.map(kind => (
                            <div className="booklist__filterkind-item" key={kind}>
                                <input type="checkbox"
                                    onChange={
                                        () => {
                                            if (kindsFilter.includes(kind)) {
                                                setKindsFilter(kindsFilter.filter(item => item !== kind));
                                            } else {
                                                setKindsFilter([...kindsFilter, kind]);
                                            }
                                        }
                                    } id={kind} />
                                <label htmlFor={kind} >{kind}</label>
                            </div>
                        ))}
                    </div>

                    <div className="booklist__search-header">
                        <h2>Sort</h2>
                    </div>

                    <div className="booklist__sort">
                        <button onClick={
                            () => {
                                handleSearch('price', 'asc');
                            }
                        } className="booklist__sort-item">
                            <FontAwesomeIcon icon={faUpLong} className='icon__sort' />
                            <div className="booklist__sort-nameitem">
                                Price
                            </div>
                        </button>

                        <button onClick={
                            () => {
                                handleSearch('price', 'desc');
                            }
                        } className="booklist__sort-item">
                            <FontAwesomeIcon icon={faDownLong} className='icon__sort' />
                            <div className="booklist__sort-nameitem">
                                Price
                            </div>
                        </button>

                        <button onClick={
                            () => {
                                handleSearch('name', 'asc');
                            }
                        } className="booklist__sort-item">
                            <FontAwesomeIcon icon={faUpLong} className='icon__sort' />
                            <div className="booklist__sort-nameitem">
                                Name
                            </div>
                        </button>

                        <button onClick={
                            () => {
                                handleSearch('name', 'desc');
                            }
                        } className="booklist__sort-item">
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
                                        <span>
                                            {new Intl.NumberFormat('de-DE').format(book.bookPrice)} VND
                                        </span>
                                    </div>

                                    <div className="booklist__detail">
                                        Latest udated date: {book.updateDate}
                                    </div>

                                    <div className="booklist__detail">
                                        Author: {book.bookAuthor.slice(0, 2).join(', ')}{book.bookAuthor.length > 2 ? ',...' : ''}
                                    </div>

                                    <div className="booklist__detail">
                                        Kind: {book.bookKind.slice(0, 2).join(', ')}{book.bookKind.length > 2 ? ',...' : ''}
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
        </>
    )
}

export default BookList;