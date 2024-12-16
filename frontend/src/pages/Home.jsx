import "../styles/Home.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faUserTie, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import EachPageHeader from "../components/EachPageHeader";
import NothingDisplay from "../components/NothingDisplay";

function Home() {
    const [books, setBooks] = useState([]);
    const [detail, setDetail] = useState({
        totalBook: 0,
        totalIncome: 0,
        totalCustomer: 0,
        totalStaff: 0,
    });
    const [page, setPage] = useState(1);

    function calculateItemsPerPage() {
        const screenHeight = window.innerHeight;
        if (screenHeight >= 900) return 10;
        if (screenHeight >= 800) return 8;
        if (screenHeight >= 768) return 6;
        if (screenHeight >= 600) return 4;
        return 3;
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
        fetch("http://localhost:5000/books/top?limit=10")
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 'error') {
                    console.log(data.message);
                    return;
                }
                setBooks(data.data);
            })
            .catch((error) => {
                console.log(error);
            })
            ;
    }, []);

    useEffect(() => {
        fetch("http://localhost:5000/books/amount")
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 'error') {
                    console.log(data.message);
                    return;
                }
                setDetail((prevDetail) => ({
                    ...prevDetail,
                    totalBook: data.data,
                }));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        fetch("http://localhost:5000/customers/generaldetail")
            .then((res) => res.json())
            .then((data) => {
                setDetail((prevDetail) => ({
                    ...prevDetail,
                    totalIncome: data.totalFee,
                    totalCustomer: data.totalCustomer,
                }));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        fetch("http://localhost:5000/users/amount?role=staff")
            .then((res) => res.json())
            .then((data) => {
                setDetail((prevDetail) => ({
                    ...prevDetail,
                    totalStaff: data.totalUser,
                }));
            })
    }, []);

    return (
        <>
            <EachPageHeader title="Dashboard" description="HomePage" />

            <div className="home">
                <div className="home__general">
                    <div className="home__general__card">
                        <div className="home__general__icon">
                            <FontAwesomeIcon icon={faBook} className='icon__card' />
                        </div>
                        <div className="home__general__main">
                            <div className="home__general__text">
                                <div className="home__general__title">
                                    Total Book
                                </div>
                                <div className="home__general__value">
                                    {detail.totalBook}
                                </div>

                                <div className="home__general__update">
                                    Date: hehe
                                </div>
                            </div>
                            <div className="home__general__percent">
                                100%
                            </div>
                        </div>

                    </div>

                    <div className="home__general__card">
                        <div className="home__general__icon">
                            <FontAwesomeIcon icon={faBook} className='icon__card' />
                        </div>
                        <div className="home__general__main">
                            <div className="home__general__text">
                                <div className="home__general__title">
                                    Total Income
                                </div>
                                <div className="home__general__value">
                                    {new Intl.NumberFormat('de-DE').format(detail.totalIncome)} USD
                                </div>

                                <div className="home__general__update">
                                    Date: hehe
                                </div>
                            </div>
                            <div className="home__general__percent">
                                100%
                            </div>
                        </div>

                    </div>

                    <div className="home__general__card">
                        <div className="home__general__icon">
                            <FontAwesomeIcon icon={faBook} className='icon__card' />
                        </div>
                        <div className="home__general__main">
                            <div className="home__general__text">
                                <div className="home__general__title">
                                    Total Customer
                                </div>
                                <div className="home__general__value">
                                    {detail.totalCustomer}
                                </div>

                                <div className="home__general__update">
                                    Date: hehe
                                </div>
                            </div>
                            <div className="home__general__percent">
                                100%
                            </div>
                        </div>

                    </div>

                    <div className="home__general__card">
                        <div className="home__general__icon">
                            <FontAwesomeIcon icon={faBook} className='icon__card' />
                        </div>
                        <div className="home__general__main">
                            <div className="home__general__text">
                                <div className="home__general__title">
                                    Total Staff
                                </div>
                                <div className="home__general__value">
                                    {detail.totalStaff}
                                </div>

                                <div className="home__general__update">
                                    Date: hehe
                                </div>
                            </div>
                            <div className="home__general__percent">
                                100%
                            </div>
                        </div>

                    </div>


                </div>

                <div className="home__recent">
                    {/* <div className="home__recent__header">
                        Recent Order
                    </div> */}


                    <div className="home__recent__body">
                        {books.length === 0 && <NothingDisplay />}
                        <div className="home__recent__table">
                            <div className="home__recent__field home__recent__headerfield">
                                <div className="home__recent__attribute">
                                    Name
                                </div>
                                <div className="home__recent__attribute">
                                    Kind
                                </div>
                                <div className="home__recent__attribute">
                                    Author
                                </div>
                                <div className="home__recent__attribute">
                                    Amount
                                </div>
                            </div>

                            <div className="home__data">

                                {books.slice((page - 1) * amountItem, (page - 1) * amountItem + amountItem).map((book) => {
                                    return (
                                        <div className="home__recent__field home__recent__valuefield" key={book._id}>
                                            <div className="home__recent__attribute">
                                                <span>
                                                    {book.bookName}
                                                </span>
                                            </div>
                                            <div className="home__recent__attribute">
                                                <span>
                                                    {book.bookKind.slice(0, 2).join(', ')}{book.bookKind.length > 2 ? ',...' : ''}
                                                </span>
                                            </div>
                                            <div className="home__recent__attribute">
                                                <span>
                                                    {book.bookAuthor.slice(0, 2).join(', ')}{book.bookAuthor.length > 2 ? ',...' : ''}
                                                </span>
                                            </div>
                                            <div className="home__recent__attribute">
                                                <span>
                                                    {book.bookCurrentAmount}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* {books.length !== 0 && <div className="home__recent__field home__recent__valuefield">
                                <div className="home__recent__attribute">
                                    ...
                                </div>
                                <div className="home__recent__attribute">
                                    ...
                                </div>
                                <div className="home__recent__attribute">
                                    ...
                                </div>
                                <div className="home__recent__attribute">
                                    ...
                                </div>
                            </div>} */}
                        </div>

                        <div className="home__button">
                            <button className="home__button__control" onClick={decreasePage}>
                                <FontAwesomeIcon icon={faArrowLeft} className="icon__paging" />
                            </button>
                            <button className="home__button__control" onClick={increasePage}>
                                <FontAwesomeIcon icon={faArrowRight} className="icon__paging" />
                            </button>
                        </div>

                    </div>
                </div>


            </div>

        </>
    );
}

export default Home;