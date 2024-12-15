import '../styles/ReportForm.css';
import { useState, useEffect } from 'react';
import { useNotification } from './NotificationContext';
import { getDateTime } from '../utils/DateCurrent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function ReportBookForm() {
    const { notify } = useNotification();
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
        fetch('http://localhost:5000/books')
            .then(response => response.json())
            .then(data => {
                if (data.status === 'error') {
                    console.log(data.message);
                    return;
                }
                setListBook(data.data);
            })
            .catch((error) => {
                notify({ type: 'error', msg: error.message });
            }
            );
    }, []);

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

                <div className="reportform__feature reportform__fieldheader">
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
                </div>

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
                <button className="btn__report" onClick={decreasePage}>
                    <FontAwesomeIcon icon={faArrowLeft} className='icon__paging' />
                </button>
                <button className="btn__report" onClick={increasePage}>
                    <FontAwesomeIcon icon={faArrowRight} className='icon__paging' />
                </button>
            </div>
        </div>
    );
}

export default ReportBookForm;