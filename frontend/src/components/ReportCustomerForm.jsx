import '../styles/ReportForm.css';
import { useState, useEffect } from 'react';
import { useNotification } from './NotificationContext';

function ReportBookForm() {
    const { notify } = useNotification();
    const [listCustomer, setListCustomer] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/customers')
            .then(response => response.json())
            .then(data => {
                setListCustomer(data);
            })
            .catch((error) => {
                notify({ type: 'error', msg: error.message });
            }
            );
    }, []);


    return (
        <div className="reportform">
            <div className="reportform__feature reportform__fieldheader">
                <div className="reportform__attribute">
                    CustomerName
                </div>

                <div className="reportform__attribute">
                    Phone
                </div>

                <div className="reportform__attribute">
                    FirstDebt
                </div>

                <div className="reportform__attribute">
                    CurrentDebt
                </div>

                <div className="reportform__attribute">
                    UpdateDate
                </div>
            </div>

            {listCustomer.map((item) => (
                <div className="reportform__feature reportform__fieldbody" key={item._id}>
                    <div className="reportform__attribute">
                        {item.customerName}
                    </div>
                    <div className="reportform__attribute">
                        {item.customerPhone}
                    </div>
                    <div className="reportform__attribute">
                        {item.customerBeginningDebt}
                    </div>
                    <div className="reportform__attribute">
                        {item.customerCurrentDebt}
                    </div>

                    <div className="reportform__attribute">
                        {item.updateDate}
                    </div>

                </div>
            ))}


        </div>
    );
}

export default ReportBookForm;