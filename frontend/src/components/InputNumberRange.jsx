import { useState } from 'react';
import '../styles/InputNumberRange.css';
import { useNotification } from './NotificationContext';

function InputNumberRange({ label, min, max, value, setValue, rules, setRules, step }) {
    const { notify } = useNotification();
    const [valueInput, setValueInput] = useState(value);
    function handleSave() {
        if (valueInput < min || valueInput > max) {
            notify({ type: 'error', msg: 'Invalid value' });
            return;
        }
        setRules(
            {
                ...rules,
                [label.charAt(0).toLowerCase() + label.slice(1)]: Number(valueInput)
            }
        );
        setValue(null);
        notify({ type: 'success', msg: 'Save successfully' });
    }

    function handleCancel() {
        setValue(null);
    }

    return (
        <div className="virtual-background">
            <div className="range-container">
                <div className="input__title">
                    {label}
                </div>
                <div className="range">
                    <input type="number"
                        value={valueInput}
                        onChange={(e) => {
                            setValueInput(e.target.value);
                        }}
                    />
                    <div className="range__field">
                        <div className="range__field__value">
                            {
                                min > 1000 ? `${min / 1000}K` : max
                            }
                        </div>
                        <div className="range__value">
                            <span
                                style={{ left: `${valueInput / (max / 100)}%` }}
                            >{
                                    valueInput > 1000 ? `${Number(valueInput / 1000)}K` : valueInput
                                }</span>
                            <input
                                value={valueInput}
                                onChange={(e) => setValueInput(e.target.value)}
                                type="range"
                                min={Number(min)}
                                max={Number(max)}
                                step={step} />
                        </div>
                        <div className="range__field__value">
                            {
                                max > 1000 ? `${max / 1000}K` : max
                            }
                        </div>
                    </div>
                </div>

                <div className="input__button">
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
}

export default InputNumberRange;