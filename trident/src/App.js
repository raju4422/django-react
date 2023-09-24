import logo from './logo.svg';
import './App.css';
import React, { Component, Suspense } from 'react'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Layout from './components/Layout';
import Login from './pages/Login';
import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { IncAction } from './actions';
import { DecAction } from './actions';
import { LoginAction } from './actions';
import { SetUserAction } from './actions';
import { axiosPost } from './helpers/Master_helper';

function App({local_state,IncAction,DecAction,LoginAction,SetUserAction}) {
  const {setUser} = local_state;
  const {common} = local_state;
  const [isLoggedIn, setIsLoggedIn] = useState(common.isLogged);
  const url = "http://127.0.0.1:8000/api/login/token_auth/";
  useEffect(() => {
    fetchUser();
  }, []);

  function fetchUser() {
    const data = {
      'id':setUser.id,
      'token': setUser.auth_token,
    };
    axiosPost(url,data,function(response){
      let data = response.data;
      if(data.flag==1 && data.is_logged_in==true){
        //setIsLoggedIn(data.is_logged_in);
        LoginAction(true);
        //SetUserAction(data.data);
      }
    })
  }
  return (
    <div className="App">
      {/* <div>{local_state.common.count}</div> */}
      {/* <button onClick={()=>IncAction(2)}>Increment</button> <button onClick={()=>DecAction(3)}>Decrement</button> */}
      <Router>
         {common.isLogged ? <Layout/> : <Login/>}
      </Router>
    </div>
  );
}
const mapStateToProps = state => ({
  local_state : state,
})

export default connect(mapStateToProps,{IncAction,DecAction,LoginAction,SetUserAction})(App);
