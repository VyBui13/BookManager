import React from 'react';
import { useState, useRef, useEffect } from 'react';
import '../styles/BookList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faMagnifyingGlass, faUpLong, faDownLong, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import EachPageHeader from '../components/EachPageHeader';
import { useLoading } from '../components/LoadingContext';

function BookList() {
    const { setIsLoading } = useLoading();
    const [books, setBooks] = useState([]);
    const [kinds, setKinds] = useState([]);
    const [kindsFilter, setKindsFilter] = useState([]);
    const [search, setSearch] = useState('');
    const loadingRef = useRef(null);

    const [page, setPage] = useState(1);

    // function calculateItemsPerPage() {
    //     const screenHeight = window.innerHeight;
    //     if (screenHeight >= 900) return 6;
    //     if (screenHeight >= 768) return 4;
    //     return 2;
    // }

    const [amountItem, setAmountItem] = useState(2);
    function increasePage() {
        if (page < Math.ceil(books.length / amountItem)) {
            setPage(page + 1);
        }
    }

    function decreasePage() {
        if (page > 1) {
            setPage(page - 1);
        }
    }


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

        const fetchData = async () => {
            try {
                loadingRef.current = setTimeout(() => { setIsLoading(true) }, 500);
                const response = await fetch(url);

                const data = await response.json();
                if (data.status === 'error') {
                    console.log(data.message);
                    return;
                }

                setBooks(data.data);

            } catch (error) {
                console.log(error);
            } finally {
                clearTimeout(loadingRef.current);
                setIsLoading(false);
            }
        }

        fetchData();
    }

    useEffect(() => {
        handleSearch('', '');
    }, [kindsFilter]);


    const loading2Ref = useRef(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                loading2Ref.current = setTimeout(() => { setIsLoading(true) }, 500);
                const response = await fetch('http://localhost:5000/books/kinds');

                const data = await response.json();
                if (data.status === 'error') {
                    console.log(data.message);
                    return;
                }

                setKinds(data.data);

            } catch (error) {
                console.log(error);
            } finally {
                clearTimeout(loading2Ref.current);
                setIsLoading(false);
            }
        }
        fetchData();

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
                    <button onClick={decreasePage}>
                        <FontAwesomeIcon icon={faArrowLeft} className='icon__paging' />
                    </button>
                    <div className="booklist__data__wrapper">

                        <div className="booklist__data">
                            {
                                books.slice((page - 1) * amountItem, (page - 1) * amountItem + amountItem).map(book => (
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

                        <div className="booklist__page">
                            <span>{page}</span> |
                            <span>{Math.ceil(books.length / amountItem)}</span>
                        </div>
                    </div>
                    <button onClick={increasePage}>
                        <FontAwesomeIcon icon={faArrowRight} className='icon__paging' />
                    </button>
                </div>
            </div>
        </>
    )
}

export default BookList;