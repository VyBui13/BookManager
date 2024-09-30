import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/Global.css'
import { Routes, Route, Link } from 'react-router-dom'
import Book from './pages/Book.jsx'

function App() {
  return (
    <Routes>
      <Route path="/book" element={<Book />}></Route>
    </Routes>
  )
}

export default App
