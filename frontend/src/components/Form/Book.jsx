import React, { useState, useRef } from 'react';
import { useNotification } from '../NotificationContext.jsx';
import '../../styles/Book.css';
import BookImportForm from '../BookImportForm.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faFolder } from '@fortawesome/free-solid-svg-icons'
import { useLoading } from '../LoadingContext.jsx';

function Book() {
    const { isLoading, setIsLoading } = useLoading();
    const { notify } = useNotification();
    const [booksImport, setBooksImport] = useState([]);
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

    const loadingRef = useRef(null);

    function handleAddBook() {
        if (book.bookName === '' || book.bookKind.length === 0 || book.bookAuthor.length === 0 || book.bookAmount === 0) {
            notify({ type: 'error', msg: 'Please fill all field!' });
            return;
        }

        const fetchData = async () => {
            try {
                loadingRef.current = setTimeout(() => {
                    setIsLoading(true);
                }, 500);
                const res = await fetch('http://localhost:5000/rules/checking', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ bookName: book.bookName, bookKind: book.bookKind, bookAuthor: book.bookAuthor, amountInputBook: book.bookAmount })
                });
                const data = await res.json();

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
                }
                notify({ type: data.status, msg: data.message });
            }
            catch (err) {
                console.error(err);
            }
            finally {
                clearTimeout(loadingRef.current);
                setIsLoading(false);
            }
        }

        fetchData();
    }

    function handleClear() {
        setBook({
            bookName: '',
            bookKind: [],
            bookAuthor: [],
            bookAmount: 0,
        });
    }

    return (
        <>

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
                                            notify({ type: 'warning', msg: 'Please enter the amount of book!' });
                                        }
                                        else if (book.bookAmount > 0) {
                                            setBook({ ...book, bookAmount: book.bookAmount - 1 });
                                        }
                                    }
                                }>-</button>
                                <input
                                    value={book.bookAmount}
                                    onInput={(e) => {
                                        if (!Number.isInteger(Number(e.target.value)) || Number(e.target.value) < 0) {
                                            setBook({ ...book, bookAmount: '' });
                                            notify({ type: 'error', msg: 'Fcuk you' });
                                            return;
                                        }

                                        setBook({ ...book, bookAmount: Number(e.target.value) || '' });
                                    }} />
                                <button onClick={
                                    () => {
                                        if (book.bookAmount === '') {
                                            // setBook({ ...book, bookAmount: 0 });
                                            notify({ type: 'warning', msg: 'Please enter the amount of book!' });
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
                                <button onClick={handleClear}>Clear</button>
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