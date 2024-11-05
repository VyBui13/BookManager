import '../styles/ReportForm.css';
import { useState, useEffect } from 'react';
import { useNotification } from './NotificationContext';

function ReportBookForm() {
    const { notify } = useNotification();
    const [listBook, setListBook] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/books')
            .then(response => response.json())
            .then(data => {
                setListBook(data);
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
                    BookName
                </div>

                <div className="reportform__attribute">
                    Beginning
                </div>

                <div className="reportform__attribute">
                    Current
                </div>

                <div className="reportform__attribute">
                    CreatedDate
                </div>

                <div className="reportform__attribute">
                    UpdateDate
                </div>
            </div>

            {listBook.map((item) => (
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
                        {item.createdDate}
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