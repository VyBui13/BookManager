import "../styles/Home.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { getCurrentDate } from "../utils/DateCurrent";
import EachPageHeader from "../components/EachPageHeader";
import NothingDisplay from "../components/NothingDiplay";

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
        fetch("http://localhost:5000/books/top?limit=3")
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

                            {books.length !== 0 && <div className="home__recent__field home__recent__valuefield">
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
                            </div>}
                        </div>

                    </div>
                </div>


            </div>

        </>
    );
}

export default Home;