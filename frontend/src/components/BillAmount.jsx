import '../styles/BillAmount.css';
import { useState } from 'react';
import { useNotification } from './NotificationContext';

function BillAmount(props) {
    const { notify } = useNotification();
    const [book, setBook] = useState(props.book);
    function handleSave() {
        const newArray = [...props.bill.bookList];
        if (book.amountBought === '') {
            notify({ type: 'error', msg: 'Please enter a number!' });
            return;
        }
        if (Number(book.amountBought) > Number(book.amountAvailable)) {
            notify({ type: 'error', msg: 'Please enter a number which above ' + book.amountAvailable });
            return;
        }
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

                        <div className="billamount__input">
                            <button onClick={
                                () => {
                                    if (book.amountBought === '') {
                                        notify({ type: 'error', msg: 'Please enter a number!' });
                                        return;
                                    }
                                    if (Number(book.amountBought) <= 0) {
                                        return;
                                    }
                                    setBook({ ...book, amountBought: Number(book.amountBought) - 1 })
                                }
                            }>-</button>
                            <input
                                value={book.amountBought}
                                onChange={(e) => {
                                    if (!Number.isInteger(Number(e.target.value)) || Number(e.target.value) < 0) {
                                        setBook({ ...book, amountBought: '' });
                                        notify({ type: 'error', msg: 'Please enter a valid number' });
                                        return;
                                    }
                                    setBook({ ...book, amountBought: e.target.value.trim() })
                                }
                                }
                            />
                            <button onClick={
                                () => {
                                    if (book.amountBought === '') {
                                        notify({ type: 'error', msg: 'Please enter a number!' });
                                        return;
                                    }
                                    setBook({ ...book, amountBought: Number(book.amountBought) + 1 })
                                }
                            }>+</button>
                        </div>
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