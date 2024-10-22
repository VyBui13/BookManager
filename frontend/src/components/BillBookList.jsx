import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { nofi } from './Notify';
import '../styles/BillBookList.css';

function BillBookList({ setIsHide, setBill, booklist }) {
    const [books, setBooks] = useState([]);
    const [billbooks, setBillBooks] = useState(booklist);
    const [bookSelected, setBookSelected] = useState(
        {
            nameBook: '',
            kindBook: '',
            authorBook: '',
            priceBook: '',
            amountBought: '',
        }
    );
    const inputRefs = useRef([]);

    function handleclose() {
        setBill((bill) => ({
            ...bill,
            bookList: billbooks,
        }));
        setIsHide(true);
    }

    useEffect(() => {
        fetch('http://localhost:5000/books')
            .then(response => response.json())
            .then(data => {
                setBooks(data);
            });
    }, []); // []: run only once

    return (
        <>
            <div className="virtual-background">
                <div className="bbooklist">
                    <div className="bbooklist__header">
                        <h1 className="bbooklist__title">BOOKLIST</h1>
                        <div className="bbooklist__btn">
                            <div className="bbooklist__search">
                                <input type="text" className="bbooklist__search-input" placeholder="Search for book" />
                                <button className="bbooklist__search-button">
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                            <div className="bbooklist__closebtn">
                                <i className="fas fa-x" onClick={handleclose}></i>
                            </div>
                        </div>
                    </div>

                    <div className="bbooklist__body">
                        <div className="bbooklist__feature">
                            <div className="bbooklist__title">
                                Bill List
                            </div>

                            <div className="bbooklist__field">
                                <div className="bbooklist__attribute">
                                    Name
                                </div>
                                <div className="bbooklist__attribute">
                                    Kind
                                </div>
                                <div className="bbooklist__attribute">
                                    Author
                                </div>
                                <div className="bbooklist__attribute">
                                    Amount
                                </div>
                                <div className="bbooklist__attribute">
                                    BTN
                                </div>
                            </div>
                            <div className="bbooklist__items">
                                {billbooks.map((book) => (
                                    <div className="bbooklist__item" key={book._id}>
                                        <div className="bbooklist__attribute">
                                            {book._bookName}
                                        </div>
                                        <div className="bbooklist__attribute">
                                            {book._bookKind}
                                        </div>
                                        <div className="bbooklist__attribute">
                                            {book._bookAuthor}
                                        </div>
                                        <div className="bbooklist__attribute">
                                            <div className="wrapper__item">
                                                {book._amountBought}
                                            </div>
                                        </div>

                                        <div className="bbooklist__attribute">
                                            <button className='bbooklist__remove-btn'
                                                onClick={() => {
                                                    const filterArr = billbooks.filter(obj => obj._id !== book._id);
                                                    setBillBooks(filterArr);
                                                }
                                                }

                                            >-</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bbooklist__feature">
                            <div className="bbooklist__title">
                                Book List
                            </div>
                            <div className="bbooklist__field">
                                <div className="bbooklist__attribute">
                                    Name
                                </div>
                                <div className="bbooklist__attribute">
                                    Kind
                                </div>
                                <div className="bbooklist__attribute">
                                    Author
                                </div>
                                <div className="bbooklist__attribute">
                                    Amount
                                </div>
                                <div className="bbooklist__attribute">
                                    BTN
                                </div>
                            </div>

                            <div className="bbooklist__items">
                                {books.map((book, index) => {
                                    if (!inputRefs.current[index]) {
                                        inputRefs.current[index] = React.createRef();
                                    }
                                    return (

                                        <div className="bbooklist__item" key={book._id}>
                                            <div className="bbooklist__attribute">
                                                {book._bookName}
                                            </div>
                                            <div className="bbooklist__attribute">
                                                {book._bookKind}
                                            </div>
                                            <div className="bbooklist__attribute">
                                                {book._bookAuthor}
                                            </div>
                                            <div className="bbooklist__attribute">
                                                <input type="number" ref={inputRefs.current[index]} />
                                            </div>

                                            <div className="bbooklist__attribute">
                                                <button className='bbooklist__add-btn'
                                                    onClick={() => {
                                                        const amountBought = inputRefs.current[index].current.value;
                                                        if (amountBought === '') {
                                                            nofi({ type: 'error', msg: 'Please fill the amount book!' });
                                                            return;
                                                        }
                                                        const indexFind = billbooks.findIndex(obj => obj._id === book._id);
                                                        if (indexFind !== -1) {
                                                            const updatedArray = billbooks.map(obj =>
                                                                obj._id === book._id ? { ...obj, _amountBought: Number(obj._amountBought) + Number(amountBought) } : obj
                                                            );

                                                            setBillBooks(updatedArray);
                                                        } else {
                                                            const bookSelected = {
                                                                _id: book._id,
                                                                _bookName: book._bookName,
                                                                _bookKind: book._bookKind,
                                                                _bookAuthor: book._bookAuthor,
                                                                _bookPrice: book._bookPrice,
                                                                _amountBought: amountBought,
                                                            };
                                                            setBillBooks([...billbooks, bookSelected]);
                                                        }
                                                    }
                                                    }
                                                >+</button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="bbooklist__footer">

                    </div>
                </div>
            </div >
        </>
    )
}

export default BillBookList;