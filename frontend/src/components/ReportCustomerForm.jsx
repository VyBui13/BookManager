import '../styles/ReportForm.css';
import { useState, useEffect } from 'react';
import { useNotification } from './NotificationContext';
import { getDateTime } from '../utils/DateCurrent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function ReportBookForm() {
    const { notify } = useNotification();
    const [listCustomer, setListCustomer] = useState([]);
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
        fetch('http://localhost:5000/customers')
            .then(response => response.json())
            .then(data => {
                if (data.status === 'error') {
                    console.log(data.message);
                    return;
                }
                setListCustomer(data.data);
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
                        Customer Name
                    </div>

                    <div className="reportform__attribute">
                        Phone
                    </div>

                    <div className="reportform__attribute">
                        Debt
                    </div>

                    <div className="reportform__attribute">
                        Update Date
                    </div>
                </div>

                {listCustomer.slice((page - 1) * amountItem, (page - 1) * amountItem + amountItem).map((item) => (
                    <div className="reportform__feature reportform__fieldbody" key={item._id}>
                        <div className="reportform__attribute">
                            {item.customerName}
                        </div>
                        <div className="reportform__attribute">
                            {item.customerPhone}
                        </div>
                        <div className="reportform__attribute">
                            {item.customerCurrentDebt}
                        </div>

                        <div className="reportform__attribute">
                            {getDateTime(new Date(item.customerUpdatedDateTime))}
                        </div>

                    </div>
                ))}
                <div className="reportform__button">
                    <button className="btn__report" onClick={decreasePage}>
                        <FontAwesomeIcon icon={faArrowLeft} className='icon__paging' />
                    </button>
                    <button className="btn__report" onClick={increasePage}>
                        <FontAwesomeIcon icon={faArrowRight} className='icon__paging' />
                    </button>
                </div>

            </div>
        </div>
    );
}

export default ReportBookForm;