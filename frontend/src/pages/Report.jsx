import '../styles/Report.css';
import { useState, useEffect } from 'react';
import ReportForm from '../components/ReportForm';
import { getMonthYear } from '../utils/DateCurrent';

function Report() {
    const [isBookReport, setIsBookReport] = useState(true);
    const [listBook, setListBook] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/books')
            .then(response => response.json())
            .then(data => {
                setListBook(data);
            })
            .catch((error) => {
                console.log(error);
            }
            );
    }, []);

    const curMonthYear = getMonthYear();

    return (
        <>
            <div className="report-container">
                <div className="report">
                    <div className="report__header">
                        <div className="report__date">
                            {curMonthYear}
                        </div>
                        <div className="report__switch">
                            <input
                                type="checkbox"
                                onChange={() =>
                                    setIsBookReport(!isBookReport)
                                }
                                id="changeReport" />
                            <label htmlFor="changeReport">
                                <div className="labelPoint"></div>
                            </label>
                        </div>
                    </div>

                    <div className="report__body">
                        {isBookReport && <ReportForm object={listBook} />}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Report;