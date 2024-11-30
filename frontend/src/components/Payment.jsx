import "../styles/Payment.css";
import { useState } from "react";
import { getDateTime } from "../utils/DateCurrent";
import { formatCurrency } from "../utils/FormatCurrency";
import { useNotification } from "./NotificationContext";
import { useConfirmPrompt } from "./ConfirmPromptContext";
import { useAuthorizations } from "./AuthorizationContext";

function Payment({ bookList, setBookList, bill, setBill, setIsHidePayment }) {
    const { user } = useAuthorizations();
    const { setIsConfirmPrompt, setConfirmPromptData } = useConfirmPrompt();
    const { notify } = useNotification();
    const datenow = new Date();
    const current = getDateTime(datenow);
    const [payment, setPayment] = useState(bill);
    const [fee, setFee] = useState(0);

    function totalPayment(booklist) {
        let total = 0;
        booklist.forEach((book) => {
            total += (Number(book.amountBought) * Number(book.bookPrice));
        });
        return total;
    }

    const totalPrice = totalPayment(payment.bookList);

    function handleExport() {
        if (fee < totalPrice) {
            notify({ type: 'error', msg: 'Payment is not enough!' });
            return;
        }

        fetch('http://localhost:5000/bills/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...payment, userID: user._id, totalPrice: totalPrice, payment: fee }),
        }).then(response => response.json())
            .then(data => {
                notify({ type: data.status, msg: data.message });
                setBill({
                    customerName: '',
                    customerPhone: '',
                    bookList: [],
                });
                const newBookList = bookList.map((book) => {
                    const newBook = { ...book };
                    const foundBook = payment.bookList.find((item) => item._id === book._id);
                    if (foundBook) {
                        newBook.bookCurrentAmount = Number(newBook.bookCurrentAmount) - Number(foundBook.amountBought);
                    }
                    return newBook;
                });
                setBookList(newBookList);
                setIsHidePayment(true);

            })
            .catch((error) => {
                notify({ type: 'error', msg: error.message });
            });
    }

    return (
        <>
            <div className="virtual-background">

                <div className="payment">
                    <div className="payment__header">
                        <h3>B-BOOKSHOP</h3>
                        <p>207 St., Cu Chi district, Ho Chi Minh city</p>
                        <p>{current}</p>
                        <h4>BOOK BILL</h4>
                    </div>

                    <div className="payment__body">
                        <div className="payment__customer__detail">
                            <h5>Customer: {payment.customerName} - {payment.customerPhone}</h5>
                        </div>

                        <div className="payment__book__temp">

                            <div className="payment__book__detail">
                                <div className="payment__booklist">
                                    {payment.bookList.map((book, index) => (
                                        <div className="payment__book" key={index}>
                                            <p>{index + 1}. {book.bookName}</p>
                                            <p>x{book.amountBought}</p>
                                            <p>{totalPrice}</p>
                                        </div>
                                    ))}
                                    {/* <div className="payment__book">
                                    <p>Total</p>
                                    <p>{totalPayment(payment.bookList)}</p>
                                    </div> */}
                                </div>
                            </div>

                            <div className="payment__calculation">
                                <div className="payment__caculation__item">
                                    <p>Total</p>
                                    <p>{formatCurrency(totalPayment(payment.bookList))}</p>
                                </div>
                                <div className="payment__caculation__item">
                                    <p>Payment</p>

                                    <input
                                        value={fee}
                                        onChange={(e) => {
                                            setFee(e.target.value)
                                        }}
                                        type="text" />

                                </div>

                                <div className="payment__caculation__item">
                                    <p>Change</p>
                                    <p>{formatCurrency(Number(fee) - totalPayment(payment.bookList))}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="payment__footer">
                        <p>Thank you for shopping with us!</p>
                        <p>See you again!</p>
                    </div>

                    <div className="payment__button">
                        <button onClick={() => {
                            setConfirmPromptData({
                                message: "Do you want to export this bill?",
                                action: "export",
                                onConfirm: handleExport,
                            });
                            setIsConfirmPrompt(true);
                        }}>Export</button>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Payment;