import { useState, useRef, useEffect } from 'react';
import { useNotification } from '../NotificationContext.jsx';
import '../../styles/Form.css';
import '../../styles/Bill.css';
import BillAmount from '../BillAmount.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faMagnifyingGlass, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Payment from '../Payment.jsx';
import { getDate } from '../../utils/DateCurrent.js';
import { useConfig } from '../ConfigContext.jsx';
import { useLoading } from '../LoadingContext.jsx';

function Bill() {
    const { setIsLoading } = useLoading();
    const { notify } = useNotification();
    const { rules } = useConfig();
    const [bill, setBill] = useState({
        bookList: [],
        customerName: '',
        customerPhone: '',
    });
    const [book, setBook] = useState({});
    const [books, setBooks] = useState([]);
    const [isHidePayment, setIsHidePayment] = useState(true);
    const loadingRef = useRef(null);

    const [page, setPage] = useState(1);
    function calculateItemsPerPage() {
        const screenHeight = window.innerHeight;
        if (screenHeight >= 900) return 13;
        if (screenHeight >= 800) return 11;
        if (screenHeight >= 768) return 9;
        if (screenHeight >= 600) return 7;
        return 5;
    }

    const [amountItem, setAmountItem] = useState(calculateItemsPerPage());
    function increasePage() {
        if (page < Math.ceil(books.length / amountItem)) {
            setPage(page + 1);
        }
    }

    function decreasePage() {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                loadingRef.current = setTimeout(() => {
                    setIsLoading(true);
                }, 500);
                const response = await fetch('http://localhost:5000/books');
                const data = await response.json();
                if (data.status === 'error') {
                    console.log(data.message);
                    return;
                }
                setBooks(data.data);
            } catch (error) {
                console.log(error);
            } finally {
                clearTimeout(loadingRef.current);
                setIsLoading(false);
            }
        }

        fetchData();

        // fetch('http://localhost:5000/books')
        //     .then(response => response.json())
        //     .then(data => {
        //         if (data.status === 'error') {
        //             console.log(data.message);
        //             return;
        //         }
        //         setBooks(data.data);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    }, []); //

    function handleSummit() {
        if (bill.customerName === '') {
            notify({ type: 'error', msg: 'Please fill customer name!' });
            return;
        }
        if (bill.customerPhone === '') {
            notify({ type: 'error', msg: 'Please fill customer phone!' });
            return;
        }
        if (bill.bookList.length === 0) {
            notify({ type: 'error', msg: 'Please choose book!' });
            return;
        }
        const fetchData = async () => {
            try {
                loadingRef.current = setTimeout(() => {
                    setIsLoading(true);
                }, 500);
                const response = await fetch('http://localhost:5000/customers/checking', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        customerName: bill.customerName,
                        customerPhone: bill.customerPhone,
                    }),
                });

                const data = await response.json();
                if (data.status === 'error') {
                    notify({ type: 'error', msg: data.message });
                    return;
                }
                setIsHidePayment(false);
            } catch (error) {
                console.log(error);
            } finally {
                clearTimeout(loadingRef.current);
                setIsLoading(false);
            }
        }

        fetchData();

        // fetch('http://localhost:5000/customers/checking', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         customerName: bill.customerName,
        //         customerPhone: bill.customerPhone,
        //     }),
        // }).then(response => response.json())
        //     .then(data => {
        //         if (data.status === 'error') {
        //             notify({ type: 'error', msg: data.message });
        //             return;
        //         }
        //         setIsHidePayment(false);
        //     })
    }

    return (
        <>
            {book.bookName && <BillAmount book={book} setBook={setBook} bill={bill} setBill={setBill} />}
            {!isHidePayment && <Payment bookList={books} setBookList={setBooks} bill={bill} setBill={setBill} setIsHidePayment={setIsHidePayment} />}
            <div className="bill">
                <div className="bill__pannel">
                    <div className="bill__form">
                        <div className="bill__formtitle">
                            Bill
                        </div>

                        <div className="bill__formbody">
                            <div className="bill__formitem">
                                <span className="bill__formdetail">Name</span>
                                <input
                                    value={bill.customerName}
                                    onChange={(e) => setBill({ ...bill, customerName: e.target.value })}
                                    type="text"
                                    required />
                            </div>

                            <div className="bill__formitem">
                                <span className="bill__formdetail">Phone</span>
                                <input
                                    value={bill.customerPhone}
                                    onChange={(e) => setBill({ ...bill, customerPhone: e.target.value })}
                                    type="text"
                                    required />
                            </div>
                        </div>

                        <div className="bill__btn">
                            <button onClick={handleSummit}>
                                {bill.bookList.length !== 0 && <span>{bill.bookList.length}</span>}
                                Pay
                            </button>
                        </div>
                        {/* {(bill.bookList.length !== 0) && <div className="bill__listcontainer">
                            <div className="bill__list bill__headerlist">
                            <div className="bill__listitem">
                            <span>Name</span>
                            </div>
                                <div className="bill__listitem">
                                    <span>Kind</span>
                                </div>
                                <div className="bill__listitem">
                                    <span>Author</span>
                                </div>
                                <div className="bill__listitem">
                                    <span>Price</span>
                                </div>
                                <div className="bill__listitem">
                                    <span>Amount</span>
                                </div>
                                <div className="bill__listitem">
                                    <span>BTN</span>
                                </div>

                            </div>

                            {
                                bill.bookList.map(book => (
                                    <>
                                        <div className="bill__list" key={book.bookName}>
                                            <div className="bill__listitem">
                                                <span>{book.bookName}</span>
                                            </div>
                                            <div className="bill__listitem">
                                                <span>{book.bookKind}</span>
                                            </div>
                                            <div className="bill__listitem">
                                                <span>{book.bookAuthor}</span>
                                            </div>
                                            <div className="bill__listitem">
                                                <span>{book.bookPrice}</span>
                                            </div>
                                            <div className="bill__listitem">
                                                <span>{book.amountBought}</span>
                                            </div>
                                            <div className="bill__listitem">
                                                <button onClick={
                                                    () => {
                                                        setBill({
                                                            ...bill,
                                                            bookList: bill.bookList.filter(item => item._id !== book._id)
                                                        });
                                                    }
                                                }>-</button>
                                            </div>
                                        </div>
                                    </>
                                ))
                            }
                        </div>} */}
                    </div>

                    <div className="bill__search">
                        <div className="bill__searchtitle">
                            Search
                        </div>
                        <div className="bill__searchinput">
                            <input type="text" placeholder="Search" />
                            <FontAwesomeIcon icon={faMagnifyingGlass} className='icon__search' />
                        </div>

                    </div>

                </div>

                <div className="bill__booklist">
                    <div className="bill__booklist__header">
                        <div className="bill__booklist__attribute">
                            ID
                        </div>
                        <div className="bill__booklist__attribute">
                            Name
                        </div>
                        <div className="bill__booklist__attribute">
                            Num
                        </div>
                    </div>

                    <div className="bill__booklist__data">
                        {books.slice((page - 1) * amountItem, page * amountItem).map((book, index) => (
                            <button onClick={
                                () => {
                                    if (bill.bookList.length > rules.maxBoughtBook) {
                                        notify({ type: 'error', msg: `You can only buy ${rules.maxBoughtBook} books at a time!` });
                                        return;
                                    }
                                    books.forEach((item) => {
                                        if (item._id === book._id) {
                                            setBook({
                                                _id: item._id,
                                                bookName: item.bookName,
                                                bookKind: item.bookKind,
                                                bookAuthor: item.bookAuthor,
                                                bookPrice: item.bookPrice,
                                                amountBought: 0,
                                                amountAvailable: item.bookCurrentAmount,
                                            });
                                            return;
                                        }
                                    });
                                }
                            } className="bill__booklist__item" key={book._id}>
                                <div className="bill__booklist__attribute">
                                    {book._id.slice(-5)}
                                </div>
                                <div className="bill__booklist__attribute">
                                    {book.bookName}
                                </div>
                                <div className="bill__booklist__attribute">
                                    {book.bookCurrentAmount}
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="bill__booklist__button">
                        <button onClick={decreasePage}>
                            <FontAwesomeIcon icon={faArrowLeft} className='icon__paging' />
                        </button>
                        <span>{page}</span>

                        <span>{Math.ceil(books.length / amountItem)}</span>

                        <button onClick={increasePage}>
                            <FontAwesomeIcon icon={faArrowRight} className='icon__paging' />
                        </button>
                    </div>
                </div>

            </div >

        </>
    );
};

export default Bill;

{/* <div className="booklist__button">
    <div onClick={
        () => {
            if (bill.bookList.length > rules.maxBoughtBook) {
                notify({ type: 'error', msg: `You can only buy ${rules.maxBoughtBook} books at a time!` });
                return;
            }
            books.forEach((item) => {
                if (item._id === book._id) {
                    setBook({
                        _id: item._id,
                        bookName: item.bookName,
                        bookKind: item.bookKind,
                        bookAuthor: item.bookAuthor,
                        bookPrice: item.bookPrice,
                        amountBought: 0,
                        amountAvailable: item.bookCurrentAmount,
                    });
                    return;
                }
            });
        }
    }
        className="booklist__buttonwrapper">
        <span>+</span>
    </div>
</div> */}