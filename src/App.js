import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Pages
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ApplyLoan from './pages/ApplyLoan';
import LoanMarketplace from './pages/LoanMarketplace';
import RepayLoan from './pages/RepayLoan';
import Profile from './pages/Profile';

// Components
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/apply-loan" element={<ApplyLoan />} />
            <Route path="/marketplace" element={<LoanMarketplace />} />
            <Route path="/repay-loan" element={<RepayLoan />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
