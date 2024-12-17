import '../styles/Bookselected.css';
import { useState } from 'react';
import { useNotification } from './NotificationContext.jsx';
import { useLoading } from './LoadingContext.jsx';

function BookSelected({ bookPrice, setBookPrice, setBooks }) {
    const { setIsLoading } = useLoading();
    const { notify } = useNotification();
    const [bookSelected, setBookSelected] = useState({ ...bookPrice });

    function handleCancel() {
        setBookPrice({});
    }

    function handleSave() {
        const fetchData = async () => {
            const loadingRef = setTimeout(() => setIsLoading(true), 500);
            try {
                const response = await fetch('http://localhost:5000/books/price', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(bookSelected)
                });
                const data = await response.json();
                const responseBooks = await fetch('http://localhost:5000/books');
                const dataBooks = await responseBooks.json();
                if (dataBooks.status === 'error') {
                    console.log(dataBooks.message);
                    return;
                }
                setBooks(dataBooks.data);
                setBookPrice({});
                notify({ type: data.status, msg: data.message });

            } catch (error) {
                console.log(error);
            }
            finally {
                clearTimeout(loadingRef);
                setIsLoading(false);
            }
        }

        fetchData();
    }

    return (
        <>
            <div className="virtual-background">

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
            </div>
        </>
    );
}

export default BookSelected;    