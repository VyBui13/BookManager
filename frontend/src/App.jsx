
import './styles/Global.css'
import { Routes, Route, Link } from 'react-router-dom'
import Book from './pages/Book.jsx'
import Home from './pages/Home.jsx'
import Bill from './pages/Bill.jsx'
import Customer from './pages/Customer.jsx'
import Regulation from './pages/Regulation.jsx'
import BookList from './pages/BookList.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/book" element={<Book />}></Route>
      <Route path="/booklist" element={<BookList />}></Route>
      <Route path="/bill" element={<Bill />}></Route>
      <Route path="/customer" element={<Customer />}></Route>
      <Route path="/regulation" element={<Regulation />}></Route>
    </Routes>
  )
}

export default App
