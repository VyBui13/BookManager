import '../styles/ReportForm.css';


function ReportForm({ object }) {
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
                    CreatedDay
                </div>

                <div className="reportform__attribute">
                    CurrentDay
                </div>
            </div>

            {object.map((item) => (
                <div className="reportform__feature reportform__fieldbody" key={item._id}>
                    <div className="reportform__attribute">
                        {item._bookName}
                    </div>
                    <div className="reportform__attribute">
                        {item._bookStoredAmount}
                    </div>
                    <div className="reportform__attribute">
                        {item._bookPresentAmount}
                    </div>
                    <div className="reportform__attribute">
                        {item._createdDate}
                    </div>

                    <div className="reportform__attribute">
                        {item._updateDate}
                    </div>

                </div>
            ))}


        </div>
    );
}

export default ReportForm;