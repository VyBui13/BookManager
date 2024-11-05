import '../styles/Report.css';
import { useState } from 'react';
import ReportBookForm from '../components/ReportBookForm';
import ReportCustomerForm from '../components/ReportCustomerForm';
import { getMonthYear } from '../utils/DateCurrent';

function Report() {
    const [isBookReport, setIsBookReport] = useState(true);
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
                        {isBookReport ? <ReportBookForm /> : <ReportCustomerForm />}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Report;