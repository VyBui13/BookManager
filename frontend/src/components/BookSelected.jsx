import '../styles/Bookselected.css';
import { useState } from 'react';

function BookSelected({ bookPrice }) {
    const [bookSelected, setBookSelected] = useState({ ...bookPrice });

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
                                {bookSelected.Name}
                            </div>

                        </div>

                        <div className="bookprice__attribute">

                            <div className="bookprice__attribute-name">
                                Kind
                            </div>
                            <div className="bookprice__attribute-value">
                                {bookSelected.Kind}
                            </div>

                        </div>

                        <div className="bookprice__attribute">

                            <div className="bookprice__attribute-name">
                                Author
                            </div>
                            <div className="bookprice__attribute-value">
                                {bookSelected.Author}
                            </div>

                        </div>

                        <div className="bookprice__attribute">

                            <div className="bookprice__attribute-name">
                                Amount
                            </div>
                            <div className="bookprice__attribute-value">
                                {bookSelected.PresentAmount}
                            </div>

                        </div>

                        <div className="bookprice__attribute">

                            <div className="bookprice__attribute-name">
                                Price
                            </div>
                            <div className="bookprice__attribute-value">
                                <input
                                    value={bookSelected.Price}
                                    onChange={(e) => setBookSelected({ ...bookSelected, Price: e.target.value })}
                                    type="number" />
                            </div>

                        </div>
                    </div>
                </div>

                <div className="bookprice__submit">
                    <button>Cancel</button>
                    <button id="bookprice__savebtn">Save</button>
                </div>
            </div>
        </>
    );
}

export default BookSelected;    