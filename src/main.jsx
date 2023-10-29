/*
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LogIn from "/home/bulba/Documents/DefFolder/frontend_test_project/src/signInForm.jsx";
import RegistrationForm from './registrationFile.jsx';
import App from './App.jsx'; // Импортируйте компонент App
import "./App.css";
import UserForm from '/home/bulba/Documents/DefFolder/frontend_test_project/src/UserForm.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/signin" element={<LogIn />} />
                <Route path="/signup" element={<RegistrationForm />} />
                <Route path="/user" element={<UserForm/>} />
                <Route path="/" element={<LogIn />} />


            </Routes>
        </Router>

    </React.StrictMode>
);