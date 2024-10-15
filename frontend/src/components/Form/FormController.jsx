import { Routes, Route, Link } from 'react-router-dom'
import Bill from './Bill'
import Book from './Book'
import Customer from './Customer';
import Formhome from './Formhome';

function FormController() {
    return (
        <Routes>
            <Route path="/" element={<Formhome />}></Route >
            <Route path="/bill" element={<Bill />}></Route>
            <Route path="/book" element={<Book />}></Route>
            <Route path="/customer" element={<Customer />}></Route>
        </Routes>
    );
}

export default FormController;