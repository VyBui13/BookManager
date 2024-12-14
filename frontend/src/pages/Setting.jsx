import { useState, useContext, useEffect } from 'react'
import '../styles/Setting.css'
import InputNumberRange from '../components/InputNumberRange.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import EachPageHeader from '../components/EachPageHeader.jsx'
import { useNotification } from '../components/NotificationContext.jsx'

function Regulation() {
    const { notify } = useNotification();
    const [rules, setRules] = useState({
        bookMinImportAmount: 0,
        bookMinStoredAmount: 0,
        debtMax: 0,
        bookMinAmountAfterSell: 0,
        checkFee: true
    });
    const [value, setValue] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/regulation')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.status === 'success') {
                    setRules(data.data);
                }
                else {
                    console.log(data.message);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []); // []: run only once


    function handleSubmit() {
        fetch('http://localhost:5000/regulation/edition', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ rules: rules })
        })
            .then(response => response.json())
            .then(data => {
                notify({ type: data.status, msg: data.message });
            })
            .catch((error) => {
                console.log(error);
            });
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
                rules={rules}
                setRules={setRules}
                step={value.step}
            />}

            {/* <div className="page__header">
                <p>Dashboard</p>
                <h1>Setting</h1>
            </div> */}

            <EachPageHeader title="Setting" description="Dashboard" />

            <div className="setting">
                <div className="setting__body">
                    <button onClick={handleSubmit} className="setting__btn__save">
                        <FontAwesomeIcon icon={faCheck} />
                    </button>
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
                                    {rules.bookMinImportAmount}
                                </div>
                                <button onClick={
                                    () => handleClick("BookMinImportAmount", rules.bookMinImportAmount, 1, 500, 1)
                                }>+</button>
                            </div>
                        </div>
                        <div className="setting__item-content">
                            <div className="setting__item-content-title">
                                The maximum number of present amount books
                            </div>
                            <div className="setting__item-content-value">
                                <div className="value">
                                    {rules.bookMinStoredAmount}
                                </div>
                                <button onClick={
                                    () => handleClick("BookMinStoredAmount", rules.bookMinStoredAmount, 1, 500, 1)
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
                                The debt maximum amount of customer
                            </div>
                            <div className="setting__item-content-value">
                                <div className="value">
                                    {rules.debtMax}
                                </div>
                                <button onClick={
                                    () => handleClick("DebtMax", rules.debtMax, 10000, 500000, 10000)
                                }>+</button>
                            </div>
                        </div>

                        <div className="setting__item-content">
                            <div className="setting__item-content-title">
                                The minimum number of present amount books
                            </div>
                            <div className="setting__item-content-value">
                                <div className="value">
                                    {rules.bookMinAmountAfterSell}
                                </div>
                                <button onClick={
                                    () => handleClick("BookMinAmountAfterSell", rules.bookMinAmountAfterSell, 1, 500, 1)
                                }>+</button>
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
                                    {rules.checkFee ? "Yes" : "No"}
                                </div>
                                <button onClick={
                                    () => {
                                        setRules({
                                            ...rules,
                                            checkFee: !rules.checkFee
                                        })
                                    }
                                }>+</button>
                            </div>
                        </div>
                    </div>
                </div>


                {/* <div className="setting__role">
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
        </div> */}
            </div>
        </>
    )
}

export default Regulation

