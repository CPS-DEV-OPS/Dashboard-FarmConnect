import React, { lazy, useEffect } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { themeChange } from 'theme-change'
import checkAuth from './app/auth';
import initializeApp from './app/init';
import Additional from './features/user/additional';
//import ResetPassword from './features/user/ResetPassword';
import ResetPassword from './features/user/ResetPassword';



// Importing pages
const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const Register = lazy(() => import('./pages/Register'))
const Documentation = lazy(() => import('./pages/Documentation'))






// Initializing different libraries
initializeApp()


// Check for login and initialize axios
const token = checkAuth()


function App() {

  useEffect(() => {
    // 👆 farmConnect themes initialization
    themeChange(false)
  }, [])


  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* <Route exact path="/reset-password">
          <ResetPassword resetToken={resetToken} /> */}
          {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
          
          {/* <Route path="/reset-password/:resetToken" element={<ResetPassword />} /> */}
          <Route path="/reset-password" element={<ResetPassword />} />


          


          {/* <Route path="/reset-password" element= {<ResetPassword />}/> */}
          <Route path="/register" element={<Register />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/additional" element={<Additional />} />
          {/* Place new routes over this */}
          <Route path="/app/*" element={<Layout />} />

          <Route path="*" element={<Navigate to={token ? "/app/welcome" : "/login"} replace />}/>

        </Routes>
      </Router>
    </>
  )
}

export default App
