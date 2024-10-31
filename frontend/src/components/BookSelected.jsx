import '../styles/Bookselected.css';
import { useState } from 'react';
import nofi from './Notify';

function BookSelected({ bookPrice, updateBookPrice, setBooks }) {
    const [bookSelected, setBookSelected] = useState({ ...bookPrice });


    function handleCancel() {
        updateBookPrice({});
    }

    function handleSave() {
        fetch('http://localhost:5000/books/price', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookSelected)
        })
            .then(response =>
                response.json()
            )
            .then(data => {
                nofi({ type: data.status, msg: data.message });
                return fetch('http://localhost:5000/books')
            })
            .then(response => response.json())
            .then(data => {
                setBooks(data);
                updateBookPrice({});
            })
            .catch(error => {
                console.log(error);
                nofi({ type: error.status, msg: error.message });
            })

    }

    return (
        <>
            <div className="bookprice">
                <div className="bookprice__header">
                    <div className="bookprice__title">
                        Price Setting
                        <div className="bookprice__description">
                            Dashboard
                        </div>
                    </div>
                </div>

                <div className="bookprice__body">
                    <div className="bookprice__information">

                        <div className="bookprice__attribute">

                            <div className="bookprice__attribute-name">
                                Name
                            </div>
                            <div className="bookprice__attribute-value">
                                {bookSelected.bookName}
                            </div>

                        </div>

                        <div className="bookprice__attribute">

                            <div className="bookprice__attribute-name">
                                Kind
                            </div>
                            <div className="bookprice__attribute-value">
                                {bookSelected.bookKind}
                            </div>

                        </div>

                        <div className="bookprice__attribute">

                            <div className="bookprice__attribute-name">
                                Author
                            </div>
                            <div className="bookprice__attribute-value">
                                {bookSelected.bookAuthor}
                            </div>

                        </div>

                        <div className="bookprice__attribute">

                            <div className="bookprice__attribute-name">
                                Amount
                            </div>
                            <div className="bookprice__attribute-value">
                                {bookSelected.bookCurrentAmount}
                            </div>

                        </div>

                        <div className="bookprice__attribute">

                            <div className="bookprice__attribute-name">
                                Price
                            </div>
                            <div className="bookprice__attribute-value">
                                <input
                                    value={bookSelected.bookPrice}
                                    onChange={(e) => setBookSelected({ ...bookSelected, bookPrice: e.target.value })}
                                    type="number" />
                            </div>

                        </div>
                    </div>
                </div>

                <div className="bookprice__submit">
                    <button onClick={handleCancel}>Cancel</button>
                    <button id="bookprice__savebtn" onClick={handleSave}>Save</button>
                </div>
            </div>
        </>
    );
}

export default BookSelected;    