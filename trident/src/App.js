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
    const dataObj = {
      'id':setUser.id,
      'token': setUser.auth_token,
    };
    axiosPost(url,dataObj,function(data){
      if(data.flag==1 && data.is_logged_in==true){
        LoginAction(true);
      }
    })
  }
  return (
    <div className="App">
      {/* <div>{local_state.common.count}</div> */}
      {/* <button onClick={()=>IncAction(2)}>Increment</button> <button onClick={()=>DecAction(3)}>Decrement</button> */}
      <Router>
        {/* <Routes>
        <Route path="/admin/" element={<Dashboard/>}>
          <Route path="/admin/products/" element={<Products/>}/>
          <Route path="/admin/categories/" element={<Categories/>}/>
        </Route> */}
        {/* <Route exact path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/about" component={About} /> */}
        {/* </Routes> */}
         {common.isLogged ? <Layout/> : <Login/>}
      </Router>
    </div>
  );
}
const mapStateToProps = state => ({
  local_state : state,
})

export default connect(mapStateToProps,{IncAction,DecAction,LoginAction,SetUserAction})(App);
