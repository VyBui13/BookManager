import App from './App.jsx';
import Header from './Header.jsx';
import './styles/Dashboard.css'

function Dashboard() {
    return (
        <>
            <div id="dashboard">
                <div id="header">
                    <Header />
                </div>
                <div id="content">
                    <App />
                </div>
            </div>
        </>
    )
}

export default Dashboard;