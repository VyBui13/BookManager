import "../styles/Payment.css";
import { getCurrentDateTime } from "../utils/DateCurrent";
import { useState } from "react";
import { formatCurrency } from "../utils/FormatCurrency";
import { useNotification } from "./NotificationContext";

function Payment({ bill, setBill, setIsHidePayment }) {
    const { notify } = useNotification();
    const current = getCurrentDateTime();
    const [payment, setPayment] = useState(bill);
    const [fee, setFee] = useState(0)

    function totalPayment(booklist) {
        let total = 0;
        booklist.forEach((book) => {
            total += (Number(book.amountBought) * Number(book.bookPrice));
        });
        return total;
    }

    function handleExport() {
        fetch('http://localhost:5000/bills/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...payment, staff: 'Bui Dinh Gia Vy' }),
        }).then(response => response.json())
            .then(data => {
                notify({ type: data.status, msg: data.message });
                setBill({
                    customerName: '',
                    customerPhone: '',
                    bookList: [],
                });
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
                                            <p>{formatCurrency(book.bookPrice)}</p>
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
                        <button onClick={handleExport}>Export</button>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Payment;