import "../styles/Home.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faUserTie, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { getCurrentDate } from "../utils/DateCurrent";

function Home() {
    const date = getCurrentDate();
    const [books, setBooks] = useState([]);
    const [detail, setDetail] = useState({
        totalBook: 0,
        totalIncome: 0,
        totalCustomer: 0,
        totalStaff: 0
    });
    const [customers, setCustomers] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/books/top?limit=5")
            .then((res) => res.json())
            .then((data) => {
                setBooks(data);
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
                setDetail((prevDetail) => ({
                    ...prevDetail,
                    totalBook: data.totalBook,
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
        <div className="home">
            <div className="home__header">
                <div className="home__title">
                    <p>Book Management</p>
                    <h1>Dashboard</h1>
                </div>

                <div className="home__feature">
                    <div className="home__search">
                        <input type="text" placeholder="Search" />
                        <FontAwesomeIcon icon={faMagnifyingGlass} className='icon__search' />
                    </div>

                    <div className="home__profile">
                        <FontAwesomeIcon icon={faUserTie} className='icon__profile' />
                    </div>
                </div>

            </div>


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
                                Date: {date}
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
                                {new Intl.NumberFormat('de-DE').format(detail.totalIncome)} K
                            </div>

                            <div className="home__general__update">
                                Date: {date}
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
                                Date: {date}
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
                                Date: {date}
                            </div>
                        </div>
                        <div className="home__general__percent">
                            100%
                        </div>
                    </div>

                </div>


            </div>

            <div className="home__recent">
                <div className="home__recent__header">
                    Recent Order
                </div>

                <div className="home__recent__body">
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


                        {books.map((book) => {
                            return (
                                <div className="home__recent__field home__recent__valuefield" key={book._id}>
                                    <div className="home__recent__attribute">
                                        {book.bookName}
                                    </div>
                                    <div className="home__recent__attribute">
                                        {book.bookKind}
                                    </div>
                                    <div className="home__recent__attribute">
                                        {book.bookAuthor}
                                    </div>
                                    <div className="home__recent__attribute">
                                        {book.bookCurrentAmount}
                                    </div>
                                </div>
                            );
                        })}
                        {/* <div className="home__recent__field">
                            <div className="home__recent__attribute">
                                To Kill a Mockingbird
                            </div>
                            <div className="home__recent__attribute">
                                Novel
                            </div>
                            <div className="home__recent__attribute">
                                Harper Lee
                            </div>
                            <div className="home__recent__attribute">
                                130
                            </div>
                        </div> */}
                    </div>

                </div>
            </div>


        </div>

    );
}

export default Home;