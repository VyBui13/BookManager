import { Routes, Route, Link } from 'react-router-dom'
import Bill from './Bill'
import Book from './Book'
import Customer from './Customer';
import Formhome from './Formhome';
import Setprice from './Setprice';
import { useAuthorizations } from '../AuthorizationContext';

function FormController() {
    const { authorization } = useAuthorizations();
    return (
        <Routes>
            <Route path="/*" element={<Formhome />}></Route >
            {authorization.createbill && <Route path="/bill" element={<Bill />}></Route>}
            {authorization.importbook && <Route path="/book" element={<Book />}></Route>}
            {authorization.createpayment && <Route path="/customer" element={<Customer />}></Route>}
            {authorization.setprice && <Route path="/setprice" element={<Setprice />}></Route>}
        </Routes>
    );
}

export default FormController;