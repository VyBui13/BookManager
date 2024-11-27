import '../styles/BookImportForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import NothingDisplay from './NothingDisplay';
import { useNotification } from './NotificationContext';
import { useConfirmPrompt } from './ConfirmPromptContext';

function BookImportForm({ bookList, setBookList, setIsImportForm }) {
    const { setIsConfirmPrompt, setConfirmPromptData } = useConfirmPrompt();
    const { notify } = useNotification();
    const [books, setBooks] = useState(bookList);

    function handleCancel() {
        setIsImportForm(false);
    }

    function handleSave() {
        setBookList(books);
        setIsImportForm(false);
    }

    function handleImport() {
        if (books.length === 0) {
            notify({ type: 'error', msg: 'No books are available to import!' });
        }
        else {
            fetch('http://localhost:5000/books', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bookList: books, staff: 'Bui Dinh Gia Vy' })
            })
                .then(response => response.json())
                .then(data => {
                    notify({ type: data.status, msg: data.message });
                    setBookList([]);
                    setIsImportForm(false);
                })
                .catch((error) => {
                    notify({ type: 'error', msg: error.message });
                });
        }
    }

    return (
        <div className="importform">
            <div className="importform__content">
                {books.length === 0 && <NothingDisplay desciption="It seem there's no book in the book import form. Please enter some books!" />}
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
                <button onClick={() => {
                    setConfirmPromptData({
                        message: "Are you sure you want to import these books?",
                        action: "import",
                        onConfirm: handleImport,
                    });
                    setIsConfirmPrompt(true);
                }}>Import</button>
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    )
}

export default BookImportForm;