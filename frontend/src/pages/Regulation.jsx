import { useState } from 'react'
import '../styles/Regulation.css'

function Regulation() {
    const [regulation, setRegulation] = useState({
        bookMinAmountInput: 150,
        bookMaxAmountAllow: 300,
        debtMax: 20000,
        bookMinAmountAfterSell: 20,
        checkFee: true,
    });

    return (
        <div className="regulation-container">
            <div className="regulation">
                <div className="regulation__details">
                    <div className="regulation__config">
                        <div className="regulation__header-config">
                            BookForm
                        </div>

                        <div className="regulation__feature-config">
                            <div className="regulation__feature-title">
                                The minimum number of import amount books
                            </div>
                            <div className="regulation__feature-value">
                                {regulation.bookMinAmountInput}
                            </div>
                        </div>

                        <div className="regulation__feature-config">
                            <div className="regulation__feature-title">
                                The maximum number of present amount books
                            </div>
                            <div className="regulation__feature-value">
                                {regulation.bookMaxAmountAllow}
                            </div>
                        </div>
                    </div>
                    <div className="regulation__config">
                        <div className="regulation__header-config">
                            BillForm
                        </div>

                        <div className="regulation__feature-config">
                            <div className="regulation__feature-title">
                                The debt maximum amount of customer
                            </div>
                            <div className="regulation__feature-value">
                                {regulation.debtMax}
                            </div>
                        </div>

                        <div className="regulation__feature-config">
                            <div className="regulation__feature-title">
                                The minimum number of present amount books
                            </div>
                            <div className="regulation__feature-value">
                                {regulation.bookMinAmountAfterSell}
                            </div>
                        </div>
                    </div>
                    <div className="regulation__config">
                        <div className="regulation__header-config">
                            CustomerForm
                        </div>

                        <div className="regulation__feature-config">
                            <div className="regulation__feature-title">
                                Using checking fee for customer
                            </div>
                            <div className="regulation__feature-value">
                                {regulation.checkFee ? "Yes" : "No"}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="regulation__setting">
                    
                </div>
            </div>
        </div>
    )
}

export default Regulation