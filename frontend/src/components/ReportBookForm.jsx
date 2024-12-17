import '../styles/ReportForm.css';
import { useState, useEffect } from 'react';
import { getDateTime } from '../utils/DateCurrent';
import NothingDisplay from './NothingDisplay';
import PagingButton from './PagingButton';
import { useLoading } from './LoadingContext';

function ReportBookForm() {
    const { setIsLoading } = useLoading();
    const [listBook, setListBook] = useState([]);
    const [page, setPage] = useState(1);

    function calculateItemsPerPage() {
        const screenHeight = window.innerHeight;
        if (screenHeight >= 900) return 18;
        if (screenHeight >= 800) return 16;
        if (screenHeight >= 768) return 14;
        if (screenHeight >= 600) return 12;
        return 8;
    }
    const [amountItem, setAmountItem] = useState(calculateItemsPerPage());
    useEffect(() => {
        const fetchData = async () => {
            const loadingRef = setTimeout(() => {
                setIsLoading(true);
            }, 500);
            try {

                const response = await fetch('http://localhost:5000/books');
                const data = await response.json();
                if (data.status === 'error') {
                    console.log(data.message);
                    return;
                }
                setListBook(data.data);
            } catch (error) {
                console.log(error);
            }
            finally {
                clearTimeout(loadingRef);
                setIsLoading(false);
            }
        }

        fetchData();

        const handleResize = () => {
            setAmountItem(calculateItemsPerPage());
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // useEffect(() => {
    // }, []);

    function increasePage() {
        if (page < Math.ceil(listBook.length / amountItem)) {
            setPage(page + 1);
        }
    }

    function decreasePage() {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    return (
        <div className="reportform">
            <div className="reportform__data">
                {listBook.length === 0 && <NothingDisplay />}

                {listBook.length !== 0 && <div className="reportform__feature reportform__fieldheader">
                    <div className="reportform__attribute">
                        Book Name
                    </div>

                    <div className="reportform__attribute">
                        Beginning
                    </div>

                    <div className="reportform__attribute">
                        Current
                    </div>

                    <div className="reportform__attribute">
                        Update Date
                    </div>
                </div>}

                {listBook.slice((page - 1) * amountItem, (page - 1) * amountItem + amountItem).map((item) => (
                    <div className="reportform__feature reportform__fieldbody" key={item._id}>
                        <div className="reportform__attribute">
                            {item.bookName}
                        </div>
                        <div className="reportform__attribute">
                            {item.bookBeginningAmount}
                        </div>
                        <div className="reportform__attribute">
                            {item.bookCurrentAmount}
                        </div>
                        <div className="reportform__attribute">
                            {getDateTime(new Date(item.bookUpdatedDateTime))}
                        </div>

                    </div>
                ))}
            </div>

            <div className="reportform__button">
                <PagingButton page={page} increasePage={increasePage} decreasePage={decreasePage} currentPage={page} numberPage={Math.ceil(listBook.length / amountItem)} />
            </div>
        </div>
    );
}

export default ReportBookForm;