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
                <div className="regulation__details regulation__item">
                    <div className="regulation__title">
                        Regulation
                    </div>

                    <div className="regulation__config regulation__config--bookform">
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

                    <div className="regulation__config regulation__config--billform">
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

                    <div className="regulation__config regulation__config--customerform">
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

                <div className="regulation__setting regulation__item">
                    <div className="regulation__title">
                        Setting
                    </div>
                    <div className="regulation__config regulation__config--bookform">
                        <div className="regulation__header-config">
                            BookForm
                        </div>

                        <div className="regulation__range">
                            <div className="regulation__fieldrange">
                                <div className="regulation__fieldrange-value regulation__fieldrange-left">
                                    0
                                </div>
                                <div className="regulation__range-value">
                                    <span
                                        style={{ left: `${regulation.bookMinAmountInput / 5}%` }}
                                    >{regulation.bookMinAmountInput}</span>
                                    <input
                                        value={regulation.bookMinAmountInput}
                                        onChange={(e) => setRegulation({ ...regulation, bookMinAmountInput: e.target.value })}
                                        type="range"
                                        min="0"
                                        max="500"
                                        step="1" />
                                </div>
                                <div className="regulation__fieldrange-value regulation__fieldrange-right">
                                    500
                                </div>
                            </div>
                        </div>

                        <div className="regulation__range">
                            <div className="regulation__fieldrange">
                                <div className="regulation__fieldrange-value regulation__fieldrange-left">
                                    0
                                </div>
                                <div className="regulation__range-value">
                                    <span
                                        style={{ left: `${regulation.bookMaxAmountAllow / 5}%` }}
                                    >{regulation.bookMaxAmountAllow}</span>
                                    <input
                                        value={regulation.bookMaxAmountAllow}
                                        onChange={(e) => setRegulation({ ...regulation, bookMaxAmountAllow: e.target.value })}
                                        type="range"
                                        min="0"
                                        max="500"
                                        step="1" />
                                </div>
                                <div className="regulation__fieldrange-value regulation__fieldrange-right">
                                    500
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="regulation__config regulation__config--billform">
                        <div className="regulation__header-config">
                            BillForm
                        </div>

                        <div className="regulation__range">
                            <div className="regulation__fieldrange">
                                <div className="regulation__fieldrange-value regulation__fieldrange-left">
                                    0K
                                </div>
                                <div className="regulation__range-value">
                                    <span
                                        style={{ left: `${regulation.debtMax / 5000}%` }}
                                    >{Number(regulation.debtMax) / 1000}K</span>
                                    <input
                                        value={regulation.debtMax}
                                        onChange={(e) => {
                                            setRegulation({ ...regulation, debtMax: e.target.value })
                                        }

                                        }
                                        type="range"
                                        min="0"
                                        max="500000"
                                        step="10000" />
                                </div>
                                <div className="regulation__fieldrange-value regulation__fieldrange-right">
                                    500K
                                </div>
                            </div>
                        </div>

                        <div className="regulation__range">
                            <div className="regulation__fieldrange">
                                <div className="regulation__fieldrange-value regulation__fieldrange-left">
                                    0
                                </div>
                                <div className="regulation__range-value">
                                    <span
                                        style={{ left: `${regulation.bookMinAmountAfterSell / 5}%` }}
                                    >{regulation.bookMinAmountAfterSell}</span>
                                    <input
                                        value={regulation.bookMinAmountAfterSell}
                                        onChange={(e) => setRegulation({ ...regulation, bookMinAmountAfterSell: e.target.value })}
                                        type="range"
                                        min="0"
                                        max="500"
                                        step="1" />
                                </div>
                                <div className="regulation__fieldrange-value regulation__fieldrange-right">
                                    500
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="regulation__config regulation__config--customerform">
                        <div className="regulation__header-config">
                            CustomerForm
                        </div>

                        <div className="regulation__buttonchange">
                            <div className="regulation__buttonchange-choice">
                                <i class="fa-regular fa-face-smile"></i>
                            </div>
                            <input
                                type="checkbox"
                                onChange={() =>
                                    setRegulation({ ...regulation, checkFee: !regulation.checkFee })}
                                id="checkFeature" />
                            <label htmlFor="checkFeature">
                                <div className="labelPoint"></div>
                            </label>
                            <div className="regulation__buttonchange-choice">
                                <i class="fa-regular fa-face-sad-tear"></i>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Regulation

