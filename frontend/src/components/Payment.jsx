import "../styles/Payment.css";
import { useState } from "react";
import { getDateTime } from "../utils/DateCurrent";
import { formatCurrency } from "../utils/FormatCurrency";
import { useNotification } from "./NotificationContext";
import { useConfirmPrompt } from "./ConfirmPromptContext";
import { useAuthorizations } from "./AuthorizationContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruckFast } from '@fortawesome/free-solid-svg-icons'
import { useConfig } from "./ConfigContext";
import { useLoading } from "./LoadingContext";

function Payment({ bookList, setBookList, bill, setBill, setIsHidePayment }) {
    const { rules } = useConfig();
    const { setIsLoading } = useLoading();
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
        if (rules.allowDebt !== true && Number(fee) < Number(totalPrice)) {
            notify({ type: 'error', msg: 'You need to pay ' + formatCurrency(Number(totalPrice) - Number(fee)) + ' more to export this bill!' });
            return;
        }

        if (Number(fee) > Number(totalPrice)) {
            notify({ type: 'error', msg: 'Payment must be equal to ' + formatCurrency(totalPrice) + '!' });
            return;
        }

        const fetchData = async () => {
            const loadingRef = setTimeout(() => {
                setIsLoading(true);
            }, 500);
            try {

                const res = await fetch('http://localhost:5000/bills', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...payment, userID: user._id, totalPrice: totalPrice, payment: fee }),
                });
                const data = await res.json();
                // console.log('after fetching')

                if (data.status === 'error') {
                    console.log(data.message);
                    setIsHidePayment(true);
                    return;
                }

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
                notify({ type: data.status, msg: data.message });
                setIsHidePayment(true);
            }
            catch (error) {
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
                        <div className="payment__customer__detail">
                            <h5>Staff: {user.userName}</h5>
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
                                <div className="payment__status">
                                    <div className="payment__status__icon">
                                        <FontAwesomeIcon icon={faTruckFast} className="icon__payment__status" />
                                    </div>
                                </div>
                                <div className="payment__caculation__items">

                                    <div className="payment__caculation__item">
                                        <p>Total</p>
                                        <p>{formatCurrency(totalPayment(payment.bookList))}</p>
                                    </div>
                                    {rules.allowDebt !== true && <div className="payment__caculation__item">
                                        <p>Payment</p>

                                        <input
                                            value={fee}
                                            onChange={(e) => {
                                                if (!Number.isInteger(Number(e.target.value)) || Number(e.target.value) < 0) {
                                                    setFee('');
                                                    notify({ type: 'error', msg: 'Please enter a valid number' });
                                                    return;
                                                }
                                                setFee(e.target.value)
                                            }}
                                            type="text" />

                                    </div>}

                                    <div className="payment__caculation__item">
                                        <p>Payment</p>
                                        <p>{formatCurrency(totalPayment(payment.bookList))}</p>
                                    </div>

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