import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './styles/Global.css'
import { Routes, Route, Link } from 'react-router-dom'
import Book from './pages/Book.jsx'
import Home from './pages/Home.jsx'
import Bill from './pages/Bill.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/book" element={<Book />}></Route>
      <Route path="/bill" element={<Bill />}></Route>
    </Routes>
  )
}

export default App
