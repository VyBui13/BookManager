import React, { useEffect } from 'react';
import { useState, useContext } from 'react';
import { useNotification } from '../NotificationContext.jsx';
import '../../styles/Book.css';
import BookImportForm from '../BookImportForm.jsx';
import { getCurrentDateTime } from '../../utils/DateCurrent.js';
import { ConfigContext } from '../Config.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faFolder } from '@fortawesome/free-solid-svg-icons'

function Book() {
    const { notify } = useNotification();
    const [booksImport, setBooksImport] = useState([]);
    const { regulation } = useContext(ConfigContext);
    const [addAuthor, setAddAuthor] = useState('');
    const [addKind, setAddKind] = useState('');
    const [isImportForm, setIsImportForm] = useState(false);
    // const [listBook, setListBook] = useState([]);
    const [book, setBook] = useState({
        bookName: 'To Kill a Mockingbird',
        bookKind: [
            'Action',
            'Adventure',
        ],
        bookAuthor: [
            'Harper Lee',
            'J.K. Rowling',
            'J.R.R. Tolkien',
        ],
        bookAmount: 0,
    });

    function handleAddBook() {
        if (book.bookName === '' || book.bookKind.length === 0 || book.bookAuthor.length === 0 || book.bookAmount === 0) {
            notify({ type: 'error', msg: 'Please fill all field!' });
            return;
        }

        if (Number(book.bookAmount) < Number(regulation.bookMinAmountInput)) {
            notify({ type: 'warning', msg: 'The minimum number of import amount books is ' + regulation.bookMinAmountInput });
            return;
        }

        fetch('http://localhost:5000/books/rule', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...book, bookMaxAmountAllow: regulation.bookMaxAmountAllow })
        }).then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    if (booksImport.length === 0) {
                        setBooksImport([...booksImport, book]);
                    } else {
                        const checkBook = booksImport.find(item => item.bookName === book.bookName);
                        if (checkBook) {
                            const newBooksImport = booksImport.map(item => {
                                if (item.bookName === book.bookName) {
                                    return { ...item, bookAmount: item.bookAmount + book.bookAmount };
                                }
                                return item;
                            });
                            setBooksImport(newBooksImport);
                        } else {
                            setBooksImport([...booksImport, book]);
                        }
                    }
                    notify({ type: data.status, msg: "Add book in form successfully" });
                } else {
                    notify({ type: data.status, msg: data.message });
                }
            })
            .catch((error) => {
                notify({ type: 'error', msg: error.message });
            });
    }

    function handleSummit() {
        // if (book.bookName === '' || book.bookKind === '' || book.bookAuthor === '' || book.bookAmount === 0) {
        //     notify({ type: 'error', msg: 'Please fill all field!' });
        // }
        // else if (Number(book.bookAmount) < Number(regulation.bookMinAmountInput)) {
        //     notify({ type: 'warning', msg: 'The minimum number of import amount books is ' + regulation.bookMinAmountInput });
        //     return;
        // }
        // else {
        //     fetch('http://localhost:5000/books', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({ ...book, updateDate: getCurrentDateTime(), regulation: regulation.bookMaxAmountAllow })
        //     })
        //         .then(response => response.json())
        //         .then(data => {
        //             notify({ type: data.status, msg: data.message });
        //         })
        //         .catch((error) => {
        //             notify({ type: 'error', msg: error.message });
        //         });
        //     setBook({
        //         ...book,
        //         bookName: '',
        //         bookKind: '',
        //         bookAuthor: '',
        //         bookAmount: 0,
        //     });
        // }
    }


    return (
        <>
            {/* <div className="form-container">
                <div className="form">
                    <div className="form__title">
                        book import
                    </div>

                    <div className="form__localtime">
                        <div className="form__localtime-content">
                            {currDate}
                        </div>
                        <div className="form__localtime-icon">
                            <FontAwesomeIcon icon={faCalendar} className='icon__time' />

                        </div>
                    </div>
                    <form action="#">
                        <div className="form__userdetail">
                            <div className="form__inputbox">
                                <span className="form__detail">Name</span>
                                <input
                                    value={book.bookName}
                                    onChange={(e) => setBook({ ...book, bookName: e.target.value.trim() })}
                                    type="text" required />
                                <div className="form__labelline">Enter book name</div>
                            </div>

                            <div className="form__inputbox">
                                <span className="form__detail">Kind</span>
                                <input
                                    value={book.bookKind}
                                    onChange={(e) => setBook({ ...book, bookKind: e.target.value.trim() })}
                                    type="text" required />
                                <div className="form__labelline">Enter book kind</div>
                            </div>

                            <div className="form__inputbox">
                                <span className="form__detail">Author</span>
                                <input
                                    value={book.bookAuthor}
                                    onChange={(e) => setBook({ ...book, bookAuthor: e.target.value.trim() })}
                                    type="text" required />
                                <div className="form__labelline">Enter book author</div>
                            </div>

                            <div className="form__inputbox">
                                <span className="form__detail">Amount</span>
                                <input
                                    value={book.bookAmount === 0 ? '' : book.bookAmount}
                                    onChange={(e) => setBook({ ...book, bookAmount: e.target.value.trim() })}
                                    type="number" required />
                                <div className="form__labelline">Enter book amount</div>
                            </div>
                        </div>
                    </form>

                    <div className="form__button">
                        <button className="form__submit" onClick={handleSummit}>Submit</button>
                    </div>

                </div>
            </div> */}

            <div className="book-container">
                <div className="book">
                    {isImportForm && <BookImportForm bookList={booksImport} setBookList={setBooksImport} setIsImportForm={setIsImportForm} />}
                    <div className="book__review">
                        <div className="book__icon">
                            <FontAwesomeIcon icon={faBook} className='icon__book' />
                        </div>
                        <div className="book__review__title">
                            {book.bookName}
                        </div>

                        <div className="book__review__body">
                            <div className="book__review__item">
                                <span className="book__review__label">Kind</span>
                                <span className="book__review__value">{book.bookKind.slice(0, 2).join(', ')}{book.bookKind.length > 2 ? ',...' : ''}</span>
                            </div>

                            <div className="book__review__item">
                                <span className="book__review__label">Author</span>
                                <span className="book__review__value">{book.bookAuthor.slice(0, 2).join(', ')}{book.bookAuthor.length > 2 ? ',...' : ''}</span>
                            </div>

                            <div className="book__review__item">
                                <span className="book__review__label">Amount</span>
                                <span className="book__review__value">{book.bookAmount}</span>
                            </div>
                        </div>
                    </div>
                    <div className="book__detail">
                        <div className="book__detail__wrapper">

                            <div className="book__detail__inputbox">
                                <span className="book__detail__label">Name</span>
                                <input
                                    value={book.bookName}
                                    onChange={(e) => setBook({ ...book, bookName: e.target.value })}
                                    type="text"
                                    placeholder='Enter book name' />
                            </div>

                            <div className="book__detail__amount">
                                <button onClick={
                                    () => {
                                        if (book.bookAmount === '') {
                                            setBook({ ...book, bookAmount: 0 });
                                        }
                                        else if (book.bookAmount > 0) {
                                            setBook({ ...book, bookAmount: book.bookAmount - 1 });
                                        }
                                    }
                                }>-</button>
                                <input
                                    value={book.bookAmount}
                                    onChange={(e) => setBook({ ...book, bookAmount: e.target.value })}
                                    type="number" />
                                <button onClick={
                                    () => {
                                        if (book.bookAmount === '') {
                                            setBook({ ...book, bookAmount: 0 });
                                        }
                                        else {

                                            setBook({ ...book, bookAmount: book.bookAmount + 1 });
                                        }
                                    }
                                }>+</button>
                            </div>
                        </div>

                        <div className="book__detail__wrapper">
                            <div className="book__detail__container">

                                <div className="book__detail__item">
                                    <span className="book__detail__label">Author</span>
                                    <input
                                        value={addAuthor}
                                        onChange={(e) => setAddAuthor(e.target.value)}
                                        type="text" />
                                    <button onClick={
                                        () => {
                                            if (addAuthor === '') {
                                                return;
                                            }
                                            else {
                                                setBook({ ...book, bookAuthor: [...book.bookAuthor, addAuthor.trim()] });
                                                setAddAuthor('');
                                            }
                                        }
                                    }>+</button>
                                </div>

                                <div className="book__detail__content">
                                    {book.bookAuthor.map((author, index) => (
                                        <div key={index} className="book__detail__content__item">
                                            <button onClick={
                                                () => {
                                                    const newAuthor = [...book.bookAuthor];
                                                    newAuthor.splice(index, 1);
                                                    setBook({ ...book, bookAuthor: newAuthor });
                                                }
                                            }>{author}</button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="book__detail__container">
                                <div className="book__detail__item">
                                    <span className="book__detail__label">Kind</span>
                                    <input
                                        value={addKind}
                                        onChange={(e) => setAddKind(e.target.value)}
                                        type="text" />
                                    <button onClick={
                                        () => {
                                            if (addKind === '') {
                                                return;
                                            }
                                            else {
                                                setBook({ ...book, bookKind: [...book.bookKind, addKind.trim()] });
                                                setAddKind('');
                                            }
                                        }
                                    }>+</button>
                                </div>

                                <div className="book__detail__content">
                                    {book.bookKind.map((kind, index) => (
                                        <div key={index} className="book__detail__content__item">
                                            <button onClick={
                                                () => {
                                                    const newKind = [...book.bookKind];
                                                    newKind.splice(index, 1);
                                                    setBook({ ...book, bookKind: newKind });
                                                }
                                            }>{kind}</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="book__detail__footer">
                            <button onClick={
                                () => {
                                    setIsImportForm(!isImportForm);
                                }
                            } className="book__detail__cart">
                                <FontAwesomeIcon icon={faFolder} className='icon__cart' />
                                {booksImport.length !== 0 && <div className="display__amount">
                                    {booksImport.length}
                                </div>}
                            </button>
                            <div className="book__detail__button">
                                <button>Clear</button>
                                <button onClick={handleAddBook}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Book;