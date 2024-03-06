import { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './component/Signup';
import Login from './component/Login';
import Home from './component/Home';
import ForgotPassword from './component/ForgotPassword';
import ResetPassword from './component/ResetPassword';

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path='/home' exact element={<Home />} />
          <Route path='/signup' exact element={<Signup />} />
          <Route path='/' exact element={<Login />} />
          <Route path='/forgotPassword' exact element={<ForgotPassword />} />
          <Route path='/reset-password/:token' exact element={<ResetPassword />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
