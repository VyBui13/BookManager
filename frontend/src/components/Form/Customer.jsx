import React from 'react';
import { useState, useEffect } from 'react';
import { useNotification } from '../NotificationContext.jsx';
import '../../styles/Form.css';
import '../../styles/Customer.css';
import { getCurrentDateTime } from '../../utils/DateCurrent.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function Customer(props) {
    const { notify } = useNotification();
    const [search, setSearch] = useState('');
    const [payment, setPayment] = useState('');
    const [customer, setCustomer] = useState({});

    useEffect(() => {
        if (props.customerName !== undefined) {
            fetch(`http://localhost:5000/customers?customerName=${props.customerName}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data === null) {
                        notify({ type: 'error', msg: 'Customer not found!' });
                        return;
                    }
                    setCustomer(data);
                })
                .catch((err) => {
                    notify({ type: 'error', msg: err.message });
                }
                );
        }
    }, []);

    function handleSearch() {
        fetch(`http://localhost:5000/customers?customerName=${search}`)
            .then(res => res.json())
            .then(data => {
                if (data === null) {
                    notify({ type: 'error', msg: 'Customer not found!' });
                    return;
                }
                setSearch('');
                setCustomer(data);
            })
            .catch((err) => {
                notify({ type: 'error', msg: err.message });
            }
            );
    };

    function handleSummit() {
        fetch('http://localhost:5000/customers/fee', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...customer, payment: payment, updateDate: getCurrentDateTime() }),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.status, data.message);
                notify({ type: data.status, msg: data.message });
                setCustomer({
                    customerName: '',
                    customerEmail: '',
                    customerPhone: '',
                    customerAddress: '',
                    customerCurrentDebt: ''
                });
                setPayment('');
            })
            .catch((err) => {
                notify({ type: 'error', msg: err.message });
            });

    }

    return (
        <>
            <div className="customer">
                <div className="customer__header">
                    <div className="customer__title">
                        Payment
                    </div>

                    <div className="customer__search">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            type="text" placeholder="Search..." />
                        <button onClick={handleSearch}>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </div>

                <div className="customer__body">
                    <div className="customer__field">
                        <div className="customer__field__name">Name</div>
                        <input
                            value={customer.customerName}
                            type="text" disabled />

                    </div>

                    <div className="customer__field">
                        <div className="customer__field__name">Email</div>
                        <input
                            value={customer.customerEmail}
                            onChange={(e) => setCustomer({ ...customer, customerEmail: e.target.value })}
                            type="text" required />

                    </div>

                    <div className="customer__field">
                        <div className="customer__field__name">Phone</div>
                        <input
                            value={customer.customerPhone}
                            onChange={(e) => setCustomer({ ...customer, customerPhone: e.target.value })}
                            type="text" required />

                    </div>

                    <div className="customer__field">
                        <div className="customer__field__name">Address</div>
                        <input
                            value={customer.customerAddress}
                            onChange={(e) => setCustomer({ ...customer, customerAddress: e.target.value })}
                            type="text" required />

                    </div>

                    <div className="customer__field">
                        <div className="customer__field__name">Fee</div>
                        <input
                            value={customer.customerCurrentDebt}
                            type="text" disabled />

                    </div>

                    <div className="customer__field">
                        <div className="customer__field__name">Payment</div>
                        <input
                            value={payment}
                            onChange={(e) => setPayment(e.target.value.trim())}
                            type="text" required />

                    </div>
                </div>

                <div className="customer__btn">
                    <button className="customer__btn__submit" onClick={handleSummit}>Submit</button>
                </div>
            </div>
        </>
    );
};

export default Customer;