import { useState, useContext, useEffect } from 'react'
import '../styles/Setting.css'
import InputNumberRange from '../components/InputNumberRange.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import EachPageHeader from '../components/EachPageHeader.jsx'
import { useNotification } from '../components/NotificationContext.jsx'
import { useConfig } from '../components/ConfigContext.jsx'

function Regulation() {
    const { notify } = useNotification();
    const { rules, setRules } = useConfig();
    const [value, setValue] = useState(null);

    function handleSubmit() {
        fetch('http://localhost:5000/rules', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...rules })
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
                                    {rules.minInputBook}
                                </div>
                                <button onClick={
                                    () => handleClick("minInputBook", rules.minInputBook, 1, 500, 1)
                                }>+</button>
                            </div>
                        </div>
                        <div className="setting__item-content">
                            <div className="setting__item-content-title">
                                The maximum number of present stored books
                            </div>
                            <div className="setting__item-content-value">
                                <div className="value">
                                    {rules.maxStoredBook}
                                </div>
                                <button onClick={
                                    () => handleClick("maxStoredBook", rules.maxStoredBook, 1, 500, 1)
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
                                The minimum number of stored books after selling
                            </div>
                            <div className="setting__item-content-value">
                                <div className="value">
                                    {rules.minStoredAfterSelling}
                                </div>
                                <button onClick={
                                    () => handleClick("minStoredAfterSelling", rules.minStoredAfterSelling, 1, 500, 1)
                                }>+</button>
                            </div>
                        </div>

                        <div className="setting__item-content">
                            <div className="setting__item-content-title">
                                The maximum number of bought books
                            </div>
                            <div className="setting__item-content-value">
                                <div className="value">
                                    {rules.maxBoughtBook}
                                </div>
                                <button onClick={
                                    () => handleClick("maxBoughtBook", rules.maxBoughtBook, 1, 500, 1)
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
                                    {rules.allowDebt ? "Yes" : "No"}
                                </div>
                                <button onClick={
                                    () => {
                                        setRules({
                                            ...rules,
                                            allowDebt: !rules.allowDebt
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

