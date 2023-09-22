import logo from './logo.svg';
import './App.css';
import React, { Component, Suspense } from 'react'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Layout from './components/Layout';
import Login from './pages/Login';
import { useEffect, useState } from "react";
import axios from "axios";
import { connect } from 'react-redux';
import { IncAction } from './actions';
import { DecAction } from './actions';
import { LoginAction } from './actions';
import { SetUserAction } from './actions';

function App({local_state,IncAction,DecAction,LoginAction,SetUserAction}) {
  const {setUser} = local_state;
  const {common} = local_state;
  const [isLoggedIn, setIsLoggedIn] = useState(common.isLoggedIn);
  const url = "http://localhost/django-react/backend/" + "user-auth";
  useEffect(() => {
    fetchUser();
  }, [isLoggedIn]);

  function fetchUser() {
    const data = {
      'email': "raju@gmail.com",
      'password': "123456",
    };
    axios
      .post(url, data,{  headers: {
         'Content-Type': "application/x-www-form-urlencoded"
      }})
      .then(function (response) {
        let data = response.data;
        if(data.flag==1 && data.is_logged_in==true){
          setIsLoggedIn(data.is_logged_in);
          LoginAction(true);
          SetUserAction(data.data);
        }
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  }
  return (
    <div className="App">
      {/* <div>{local_state.common.count}</div> */}
      {/* <button onClick={()=>IncAction(2)}>Increment</button> <button onClick={()=>DecAction(3)}>Decrement</button> */}
      <Router>
         {isLoggedIn ? <Layout/> : <Login/>}
      </Router>
    </div>
  );
}
const mapStateToProps = state => ({
  local_state : state,
})

export default connect(mapStateToProps,{IncAction,DecAction,LoginAction,SetUserAction})(App);
