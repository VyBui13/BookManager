import '../styles/BillAmount.css';
import { useState } from 'react';

function BillAmount(props) {
    const [book, setBook] = useState(props.book);
    function handleSave() {
        const newArray = [...props.bill.bookList];
        const existingBookIndex = newArray.findIndex(item => item._id === book._id);
        if (existingBookIndex !== -1) {
            newArray[existingBookIndex] = {
                ...newArray[existingBookIndex],
                amountBought: Number(newArray[existingBookIndex].amountBought) + Number(book.amountBought)
            };
        } else {
            newArray.push(book);
        }

        props.setBill(
            (item) => ({
                ...item,
                bookList: newArray
            })
        )

        props.setBook({});
    }

    function handleCancel() {
        props.setBook({});
    }

    return (
        <>
            <div className="virtual-background">
                <div className="billamount">
                    <div className="billamount__info">
                        <div className="billamount__title">
                            Amount
                        </div>
                        <input
                            value={book.amountBought}
                            onChange={(e) => {
                                setBook({ ...book, amountBought: e.target.value.trim() })
                            }
                            }
                            type="number" />
                    </div>

                    <div className="billamount__button">
                        <button onClick={handleCancel}>
                            <span>Cancel</span>
                        </button>

                        <button onClick={handleSave}>
                            <span>Save</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BillAmount;