import { useState, useContext } from 'react'
import '../styles/Regulation.css'
import { ConfigContext } from '../components/Config.jsx'
import InputNumberRange from '../components/InputNumberRange.jsx'

function Regulation() {
    const { regulation, setRegulation } = useContext(ConfigContext);
    const [value, setValue] = useState(null);

    function click() {
        setValue(regulation.debtMax);
    }

    return (
        <div className="setting-container">
            {value && <InputNumberRange
                label="debtMax"
                min={10000}
                max={500000}
                value={value}
                setValue={setValue}
                setRegulation={setRegulation}
                step={1000}
            />}
            <div className="setting">
                <div className="setting__header">
                    <p>Dashboard</p>
                    <h1>Setting</h1>
                </div>

                <div className="setting__body">
                    <div className="setting__item">
                        <div className="setting__item-header">
                            <p>Book Setting</p>
                        </div>
                        <div className="setting__item-content">
                            <div className="setting__item-content-title">
                                The minimum number of import amount books
                            </div>
                            <div className="setting__item-content-value">
                                {regulation.bookMinAmountInput}
                            </div>
                        </div>
                        <div className="setting__item-content">
                            <div className="setting__item-content-title">
                                The maximum number of present amount books
                            </div>
                            <div className="setting__item-content-value">
                                {regulation.bookMaxAmountAllow}
                            </div>
                        </div>
                    </div>

                    <div className="setting__item">
                        <div className="setting__item-header">
                            <p>Bill Setting</p>
                        </div>
                        <div className="setting__item-content">
                            <div className="setting__item-content-title">
                                The debt maximum amount of customer
                            </div>
                            <div className="setting__item-content-value">
                                {regulation.debtMax}
                            </div>
                        </div>
                        <div className="setting__item-content">
                            <div className="setting__item-content-title">
                                The minimum number of present amount books
                            </div>
                            <div className="setting__item-content-value">
                                {regulation.bookMinAmountAfterSell}
                            </div>
                        </div>
                    </div>

                    <div className="setting__item">
                        <div className="setting__item-header">
                            <p>Customer Setting</p>
                        </div>
                        <div className="setting__item-content">
                            <div className="setting__item-content-title">
                                Using checking fee for customer
                            </div>
                            <div className="setting__item-content-value">
                                {regulation.checkFee ? "Yes" : "No"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <button onClick={click}>Click me</button>
        </div>

    )
}

export default Regulation

