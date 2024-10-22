import React, { useEffect } from 'react';
import { useState, useContext } from 'react';
import { nofi } from '../Notify.jsx';
import '../../styles/Form.css';
import { getCurrentDate } from '../../utils/DateCurrent.js';
import { ConfigContext } from '../Config.jsx'

function Book() {
    const currDate = getCurrentDate();
    const { regulation } = useContext(ConfigContext);
    const [listBook, setListBook] = useState([]);
    const [book, setBook] = useState({
        bookName: '',
        bookKind: '',
        bookAuthor: '',
        bookAmount: 0,
        updateDate: currDate,
    });

    useEffect(() => {
        fetch('http://localhost:5000/books')
            .then(response => response.json())
            .then(data => {
                setListBook(data);
            })
            .catch((error) => { console.log(error) })
            ;
    }, []);

    function handleSummit() {
        if (book.bookName === '' || book.bookKind === '' || book.bookAuthor === '' || book.bookAmount === 0) {
            nofi({ type: 'error', msg: 'Please fill all field!' });
        }
        else if (book.bookAmount < regulation.bookMinAmountInput) {
            nofi({ type: 'warning', msg: 'The minimum number of import amount books is ' + regulation.bookMinAmountInput });
            return;
        }
        else {
            const foundObject = listBook.find(obj => obj._bookName === book.bookName
                && obj._bookKind === book.bookKind
                && obj._bookAuthor === book.bookAuthor);

            if (foundObject) {
                if (Number(foundObject._bookPresentAmount) + Number(book.bookAmount) > Number(regulation.bookMaxAmountAllow)) {
                    nofi({ type: 'warning', msg: 'The maximum number of present amount books is ' + regulation.bookMaxAmountAllow });
                    return;
                }
                foundObject._bookPresentAmount = Number(foundObject._bookPresentAmount) + Number(book.bookAmount);
                foundObject._updateDate = currDate;
            }

            fetch('http://localhost:5000/books', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(book)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
                .catch((error) => { console.log(error) })
                ;

            if (foundObject) {
                const newListBook = listBook.map(obj => obj._id === foundObject._id ? foundObject : obj);
                setListBook(newListBook);
            } else {
                const bookAdd = {
                    _bookName: book.bookName,
                    _bookKind: book.bookKind,
                    _bookAuthor: book.bookAuthor,
                    _bookStoredAmount: book.bookAmount,
                    _bookPresentAmount: book.bookAmount,
                    _updateDate: currDate,
                    _createdDate: currDate,
                }
                setListBook([...listBook, bookAdd]);
            }

            setBook({
                ...book,
                bookName: '',
                bookKind: '',
                bookAuthor: '',
                bookAmount: 0,
            });
            nofi({ type: 'success', msg: 'Everything is good!' });
        }
    }


    return (
        <>
            <div className="form-container form--bookimport">
                <div className="form">
                    <div className="form__title">
                        book import
                    </div>

                    <div className="form__localtime">
                        <div className="form__localtime-content">
                            {currDate}
                        </div>
                        <div className="form__localtime-icon">
                            <i className="fa-regular fa-calendar"></i>
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
            </div>
        </>
    );
};

export default Book;