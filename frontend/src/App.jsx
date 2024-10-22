
import './styles/Global.css'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
// import Book from './pages/Book.jsx'
// import Bill from './pages/Bill.jsx'
// import Customer from './pages/Customer.jsx'
import Regulation from './pages/Regulation.jsx'
import BookList from './pages/BookList.jsx'
import Form from './pages/Form.jsx'
import { ConfigProvider } from './components/Config.jsx'

function App() {
  return (
    <ConfigProvider>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/booklist" element={<BookList />}></Route>
        <Route path="/form/*" element={<Form />}></Route>
        <Route path="/regulation" element={<Regulation />}></Route>
      </Routes >
    </ConfigProvider>
  )
}

export default App
