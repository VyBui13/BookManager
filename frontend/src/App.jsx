
import './styles/Global.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { useContext } from 'react'
import Setting from './pages/Setting.jsx'
import BookList from './pages/BookList.jsx'
import Form from './pages/Form.jsx'
import Report from './pages/Report.jsx'
import { ConfigProvider } from './components/ConfigContext.jsx'
import { useAuthorizations } from './components/AuthorizationContext.jsx'
import User from './pages/User.jsx'
import StaffManagement from './pages/StaffManagement.jsx'

function App() {
  const { authorization } = useAuthorizations();
  return (
    <ConfigProvider>
      <Routes>
        {authorization.home && <Route path="/" element={<Home />}></Route>}
        {authorization.home && <Route path="/user" element={<User />}></Route>}
        {authorization.reviewbook && <Route path="/booklist" element={<BookList />}></Route>}
        {(authorization.importbook || authorization.createbill || authorization.createpayment || authorization.setprice) && <Route path="/form/*" element={<Form />}></Route>}
        {authorization.reviewreport && <Route path="/report" element={<Report />}></Route>}
        {authorization.setting && <Route path="/setting" element={<Setting />}></Route>}
        {authorization.setting && <Route path="/staff" element={<StaffManagement />}></Route>}
      </Routes >
    </ConfigProvider>
  )
}

export default App
