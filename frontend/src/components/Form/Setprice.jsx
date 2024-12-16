import React from 'react';
import { useState, useRef, useEffect } from 'react';
import BookSelected from '../BookSelected';
import '../../styles/List.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'
import NothingDisplay from '../NothingDisplay';
import { useLoading } from '../LoadingContext';

function setPrice() {
    const { setIsLoading } = useLoading();
    const [books, setBooks] = useState([]);
    const [bookPrice, setBookPrice] = useState({});
    const loadingRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            loadingRef.current = setTimeout(() => setIsLoading(true), 500);
            try {
                const response = await fetch('http://localhost:5000/books');
                const data = await response.json();
                if (data.status === 'error') {
                    console.log(data.message);
                    return;
                }
                setBooks(data.data);
            } catch (error) {
                console.log(error);
            }
            finally {
                clearTimeout(loadingRef.current);
                setIsLoading(false);
            }
        }
        fetchData();
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
                        {books.length === 0 ? <NothingDisplay /> :
                            <div className="list__content">
                                <div className="list__header">

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
                                </div>

                                <div className="list__items">
                                    {books.map((book) => {
                                        const setPrice = book.bookPrice === 0 ? 'Edit' : 'Set';
                                        return (
                                            <div className="list__item" key={book._id}>
                                                <div className="list__attribute">
                                                    {book.bookName}
                                                </div>
                                                <div className="list__attribute">
                                                    {book.bookKind.slice(0, 2).join(', ')}{book.bookKind.length > 2 ? ',...' : ''}
                                                </div>
                                                <div className="list__attribute">
                                                    {book.bookAuthor.slice(0, 2).join(', ')}{book.bookAuthor.length > 2 ? ',...' : ''}
                                                </div>
                                                <div className="list__attribute">
                                                    <button
                                                        onClick={(e) => {
                                                            const updateBook = books.find(b => b._id === book._id);
                                                            setBookPrice(updateBook);
                                                        }}
                                                    >{setPrice}</button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default setPrice;