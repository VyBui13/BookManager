import '../styles/BookImportForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';

function BookImportForm({ bookList, setBookList, setIsImportForm }) {
    const [books, setBooks] = useState(bookList);

    function handleCancel() {
        setIsImportForm(false);
    }

    function handleSave() {
        setBookList(books);
        setIsImportForm(false);
    }

    function handleImport() {

    }

    return (
        <div className="importform">
            <div className="importform__content">
                {books.map((book, index) => (
                    <button onClick={
                        () => {
                            const newBooks = books.filter((item) => item.bookName !== book.bookName);
                            setBooks(newBooks);
                        }
                    } className="importform__card" key="index">
                        <div className="importcard__card__icon">
                            <FontAwesomeIcon icon={faBook} />
                        </div>
                        <div className="importform__card__title">
                            <h1>{book.bookName}</h1>
                        </div>

                        <div className="importform__card__body">
                            <p>Author: {book.bookKind.slice(0, 2).join(', ')}{book.bookKind.length > 2 ? ',...' : ''}</p>
                            <p>Kind: {book.bookAuthor.slice(0, 2).join(', ')}{book.bookAuthor.length > 2 ? ',...' : ''}</p>
                            <p>Amount: {book.bookAmount}</p>
                        </div>
                    </button>
                ))}

            </div>
            <div className="importform__button">
                <button onClick={handleImport}>Import</button>
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    )
}

export default BookImportForm;