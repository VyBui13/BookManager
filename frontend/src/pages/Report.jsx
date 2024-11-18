import '../styles/Report.css';
import { useState } from 'react';
import ReportBookForm from '../components/ReportBookForm';
import ReportCustomerForm from '../components/ReportCustomerForm';
import { getMonthYear } from '../utils/DateCurrent';
import EachPageHeader from '../components/EachPageHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'

function Report() {
    const [isBookReport, setIsBookReport] = useState(true);
    const curMonthYear = getMonthYear();
    return (
        <>

            {/* <div className="page__header">
                <p>Manager</p>
                <h1>Report</h1>
            </div> */}

            <EachPageHeader title="Report" description="Manager" />

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
                            <div className="labelPoint">
                                <FontAwesomeIcon icon={faGear} className='icon__btn__change' />
                            </div>
                        </label>
                    </div>
                </div>

                <div className="report__body">
                    {isBookReport ? <ReportBookForm /> : <ReportCustomerForm />}
                </div>
            </div>
        </>
    );
}

export default Report;