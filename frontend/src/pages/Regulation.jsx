import { useState, useContext } from 'react'
import '../styles/Regulation.css'
import { ConfigContext } from '../components/Config.jsx'
import InputNumberRange from '../components/InputNumberRange.jsx'
import EachPageHeader from '../components/EachPageHeader.jsx'
import StaffManagement from './StaffManagement.jsx'

function Regulation() {
    const { regulation, setRegulation } = useContext(ConfigContext);
    const [value, setValue] = useState(null);
    const [isHide, setIsHide] = useState(true);

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
        <>
            {value && <InputNumberRange
                label={value.label}
                min={value.min}
                max={value.max}
                value={value.value}
                setValue={setValue}
                setRegulation={setRegulation}
                step={value.step}
            />}

            {/* <div className="page__header">
                <p>Dashboard</p>
                <h1>Setting</h1>
            </div> */}

            <EachPageHeader title="Setting" description="Dashboard" />
            {!isHide && <StaffManagement />}
            <div className="setting">

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
                                }>+</button>
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
                                }>+</button>
                            </div>
                        </div>
                    </div>

                    <div className="setting__item">
                        <div className="setting__item-header">
                            <p>Bill Setting</p>
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
                                }>+</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={() => setIsHide(false)}>Hehe</button>
            </div>

        </>
    )
}

export default Regulation

