
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import AdminLayout from './AdminLayout';
import Login from '../pages/Login';
import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { IncAction } from '../actions';
import { DecAction } from '../actions';
import { LoginAction } from '../actions';
import { SetUserAction } from '../actions';
import { axiosPost } from '../helpers/Master_helper';
function MainLayout({local_state,IncAction,DecAction,LoginAction,SetUserAction}) {
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
  return(
    <Router>   
         {common.isLogged ? <AdminLayout/> : <Login/>}
      </Router>
  )
}

const mapStateToProps = state => ({
  local_state : state,
})

export default  connect(mapStateToProps,{IncAction,DecAction,LoginAction,SetUserAction})(MainLayout);