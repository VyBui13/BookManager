import { useState } from "react";
import "../styles/StaffForm.css";
import { useNotification } from "./NotificationContext";

function StaffForm({ setIsForm, setUsers }) {
    const { notify } = useNotification();
    const [staff, setStaff] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
        role: "",
        dateOfBirth: "",
    });

    function handleCancel() {
        setIsForm(false);
    }

    function handleAdd() {
        fetch('http://localhost:5000/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(staff),
        }
        ).then(responsive => responsive.json())
            .then(data => {
                if (data.status === 'success') {
                    notify({ type: data.status, msg: data.message });
                    fetch('http://localhost:5000/users/list')
                        .then(response => response.json())
                        .then(data => {
                            setUsers(data)
                            setIsForm(false);
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
                else {
                    notify({ type: data.status, msg: data.message });
                }
            })
            .catch(err => {
                console.log(err);
            }
            )
    }

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setStaff((prevStaff) => ({
    //         ...prevStaff,
    //         [name]: value,
    //     }));
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(staff);
    // };

    return (
        <>
            <div className="form-container">
                <div class="form">
                    <form action="#">
                        <div class="form__userdetail">
                            <div class="form__inputbox">
                                <span class="form__detail">Name</span>
                                <input
                                    value={staff.name}
                                    onChange={(e) => setStaff({ ...staff, name: e.target.value })}
                                    type="text" required />
                                <div class="form__labelline">Enter staff name</div>
                            </div>

                            <div class="form__inputbox">
                                <span class="form__detail">Phone</span>
                                <input
                                    value={staff.phone}
                                    onChange={(e) => setStaff({ ...staff, phone: e.target.value })}
                                    type="text" required />
                                <div class="form__labelline">Enter staff phone</div>
                            </div>

                            <div class="form__inputbox">
                                <span class="form__detail">Email</span>
                                <input
                                    value={staff.email}
                                    onChange={(e) => setStaff({ ...staff, email: e.target.value })}
                                    type="text" required />
                                <div class="form__labelline">Enter staff email</div>
                            </div>

                            <div class="form__inputbox">
                                <span class="form__detail">Address</span>
                                <input
                                    value={staff.address}
                                    onChange={(e) => setStaff({ ...staff, address: e.target.value })}
                                    type="text" required />
                                <div class="form__labelline">Enter staff address</div>
                            </div>

                            <div class="form__inputbox">
                                <span class="form__detail">Role</span>
                                <select
                                    value={staff.role}
                                    onChange={(e) => setStaff({ ...staff, role: e.target.value })}
                                    required
                                >
                                    <option value="" disabled>SELECT ROLE</option>
                                    <option value="staff">STAFF</option>
                                    <option value="admin">ADMIN</option>
                                    <option value="manager">MANAGER</option>
                                </select>
                            </div>

                            <div class="form__inputbox">
                                <span class="form__detail">Date of birth</span>
                                <input

                                    type="date"
                                    required />
                            </div>
                        </div>
                    </form>

                    <div class="form__button">
                        <button onClick={handleCancel}>Cancel</button>
                        <button onClick={handleAdd}>Add</button>
                    </div>

                </div>
            </div>
        </>
    );
}

export default StaffForm;