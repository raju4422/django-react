import logo from './logo.svg';
import './App.css';
import React, { Component, Suspense } from 'react'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Layout from './components/Layout';
import Login from './pages/Login';


function App() {
  const isLoggedIn  = true ; 
  return (
    <div className="App">
      <Router>
         {isLoggedIn ? <Layout/> : <Login/>}
      </Router>
    </div>
  );
}

export default App;
