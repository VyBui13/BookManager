import '../styles/Bookselected.css';
import { useState } from 'react';

function BookSelected({ bookPrice, updateBookPrice, setBooks }) {
    const [bookSelected, setBookSelected] = useState({ ...bookPrice });

    // async function handleSave() {

    //     try {
    //         const response = await fetch('http://localhost:5000/books/setprice', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(bookSelected)
    //         });

    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }

    //         // const data = await response.json();

    //     } catch (error) {
    //         console.error('Error:', error);
    //     }


    //     console.log("1");
    //     setBooks((prevBooks) => {
    //         return prevBooks.map((book) => {
    //             if (book._id === bookSelected._id) {
    //                 return bookSelected;
    //             }
    //             return book;
    //         });
    //     });

    //     updateBookPrice({});
    // }

    function handleCancel() {
        updateBookPrice({});
    }

    function handleSave() {
        fetch('http://localhost:5000/books/setprice', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookSelected)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error:', error);
            })

        setBooks((prevBooks) => {
            return prevBooks.map((book) => {
                if (book._id === bookSelected._id) {
                    return bookSelected;
                }
                return book;
            });
        });
        updateBookPrice({});

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
                                {bookSelected._bookName}
                            </div>

                        </div>

                        <div className="bookprice__attribute">

                            <div className="bookprice__attribute-name">
                                Kind
                            </div>
                            <div className="bookprice__attribute-value">
                                {bookSelected._bookKind}
                            </div>

                        </div>

                        <div className="bookprice__attribute">

                            <div className="bookprice__attribute-name">
                                Author
                            </div>
                            <div className="bookprice__attribute-value">
                                {bookSelected._bookAuthor}
                            </div>

                        </div>

                        <div className="bookprice__attribute">

                            <div className="bookprice__attribute-name">
                                Amount
                            </div>
                            <div className="bookprice__attribute-value">
                                {bookSelected._bookPresentAmount}
                            </div>

                        </div>

                        <div className="bookprice__attribute">

                            <div className="bookprice__attribute-name">
                                Price
                            </div>
                            <div className="bookprice__attribute-value">
                                <input
                                    value={bookSelected._bookPrice}
                                    onChange={(e) => setBookSelected({ ...bookSelected, _bookPrice: e.target.value })}
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