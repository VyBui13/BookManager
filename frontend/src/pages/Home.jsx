import "../styles/Home.css";
import { useState, useEffect } from "react";


function Home() {
    const [books, setBooks] = useState([]);
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
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>

                    <div className="home__profile">
                        <i className="fa-solid fa-user-tie"></i>
                    </div>
                </div>

            </div>


            <div className="home__general">
                <div className="home__general__card">
                    <div className="home__general__icon">
                        <i className="fa-solid fa-book"></i>
                    </div>
                    <div className="home__general__main">
                        <div className="home__general__text">
                            <div className="home__general__title">
                                Total Book
                            </div>
                            <div className="home__general__value">
                                100
                            </div>

                            <div className="home__general__update">
                                Date: 20/11/2024
                            </div>
                        </div>
                        <div className="home__general__percent">
                            100%
                        </div>
                    </div>

                </div>

                <div className="home__general__card">
                    <div className="home__general__icon">
                        <i className="fa-solid fa-book"></i>
                    </div>
                    <div className="home__general__main">
                        <div className="home__general__text">
                            <div className="home__general__title">
                                Total Book
                            </div>
                            <div className="home__general__value">
                                100
                            </div>

                            <div className="home__general__update">
                                Date: 20/11/2024
                            </div>
                        </div>
                        <div className="home__general__percent">
                            100%
                        </div>
                    </div>

                </div>

                <div className="home__general__card">
                    <div className="home__general__icon">
                        <i className="fa-solid fa-book"></i>
                    </div>
                    <div className="home__general__main">
                        <div className="home__general__text">
                            <div className="home__general__title">
                                Total Book
                            </div>
                            <div className="home__general__value">
                                100
                            </div>

                            <div className="home__general__update">
                                Date: 20/11/2024
                            </div>
                        </div>
                        <div className="home__general__percent">
                            100%
                        </div>
                    </div>

                </div>

                <div className="home__general__card">
                    <div className="home__general__icon">
                        <i className="fa-solid fa-book"></i>
                    </div>
                    <div className="home__general__main">
                        <div className="home__general__text">
                            <div className="home__general__title">
                                Total Book
                            </div>
                            <div className="home__general__value">
                                100
                            </div>

                            <div className="home__general__update">
                                Date: 20/11/2024
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
                                <div className="home__recent__field" key={book._id}>
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