import { useState, useContext } from 'react'
import '../styles/Regulation.css'
import { ConfigContext } from '../components/Config.jsx'
import InputNumberRange from '../components/InputNumberRange.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons'

function Regulation() {
    const { regulation, setRegulation } = useContext(ConfigContext);
    const [value, setValue] = useState(null);

    function click() {
        setValue(regulation.debtMax);
    }

    function handleClick(label, value, min, max, step) {
        setValue({
            value: value,
            label: label,
            min: min,
            max: max,
            step: step
        })
    }

    return (
        <div className="setting-container">
            {value && <InputNumberRange
                label={value.label}
                min={value.min}
                max={value.max}
                value={value.value}
                setValue={setValue}
                setRegulation={setRegulation}
                step={value.step}
            />}
            <div className="setting">
                <div className="page__header">
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
                                <div className="value">
                                    {regulation.bookMinAmountInput}
                                </div>
                                <button onClick={
                                    () => handleClick("BookMinAmountInput", regulation.bookMinAmountInput, 1, 500, 1)
                                }>...</button>
                            </div>
                        </div>
                        <div className="setting__item-content">
                            <div className="setting__item-content-title">
                                The maximum number of present amount books
                            </div>
                            <div className="setting__item-content-value">
                                <div className="value">
                                    {regulation.bookMaxAmountAllow}
                                </div>
                                <button onClick={
                                    () => handleClick("BookMaxAmountAllow", regulation.bookMaxAmountAllow, 1, 500, 1)
                                }>...</button>
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
                                <div className="value">
                                    {regulation.debtMax}
                                </div>
                                <button onClick={
                                    () => handleClick("DebtMax", regulation.debtMax, 10000, 500000, 10000)
                                }>...</button>
                            </div>
                        </div>
                        <div className="setting__item-content">
                            <div className="setting__item-content-title">
                                The minimum number of present amount books
                            </div>
                            <div className="setting__item-content-value">
                                <div className="value">
                                    {regulation.bookMinAmountAfterSell}
                                </div>
                                <button onClick={
                                    () => handleClick("BookMinAmountAfterSell", regulation.bookMinAmountAfterSell, 1, 500, 1)
                                }>...</button>
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
                                <div className="value">
                                    {regulation.checkFee ? "Yes" : "No"}
                                </div>
                                <button>...</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="setting__role">
                    <button className="setting__card">
                        <div className="setting__card-icon">
                            <FontAwesomeIcon icon={faScrewdriverWrench} />
                        </div>

                        <div className="setting__card-title">
                            <p>Admin</p>
                        </div>
                    </button>

                    <button className="setting__card">
                        <div className="setting__card-icon">
                            <FontAwesomeIcon icon={faScrewdriverWrench} />
                        </div>

                        <div className="setting__card-title">
                            <p>Manager</p>
                        </div>
                    </button>

                    <button className="setting__card">
                        <div className="setting__card-icon">
                            <FontAwesomeIcon icon={faScrewdriverWrench} />
                        </div>

                        <div className="setting__card-title">
                            <p>Staff</p>
                        </div>
                    </button>


                    <button className="setting__card">
                        <div className="setting__card-icon">
                            <FontAwesomeIcon icon={faScrewdriverWrench} />
                        </div>

                        <div className="setting__card-title">
                            <p>Customer</p>
                        </div>
                    </button>
                </div>



            </div>
        </div>

    )
}

export default Regulation

