import {React, useEffect, useState } from "react";
import axios from "axios";
import '../assets/css/login.css'
import { connect } from "react-redux";
import { LoginAction } from '../actions';
import { SetUserAction } from '../actions';

function Login({local_state,LoginAction,SetUserAction}) {
  const [user, setUser] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const url = "http://localhost/django-react/backend/" + "user-auth";
  const onSubmitHandler = (event) => {
      event.preventDefault();
      var responseBody = {};
      responseBody.email = email
      responseBody.password = password
      axios
      .post(url, responseBody,{  headers: {
         'Content-Type': "application/x-www-form-urlencoded"
      }})
      .then(function (response) {
        let data = response.data;
        if(data.flag==1 && data.is_logged_in==true){
          LoginAction(true);
          SetUserAction(data.data);
        }
      })
      .catch(function (error) {
        console.error("Error:", error);
      });

  }

  return (
    <section className="h-100 gradient-form" style={{backgroundCcolor: "#eee"}}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        style={{width: "185px"}}
                        alt="logo"
                      />
                      <h4 className="mt-1 mb-3 pb-1">We are The Lotus Team</h4>
                    </div>

                    <form onSubmit={onSubmitHandler}>
                      <div className="form-outline mb-3">
                        <input
                          type="email"
                          id="form2Example11" onChange={(e)=>setEmail(e.target.value)}
                          className="form-control"
                          placeholder="Phone number or email address"
                        />
                      </div>

                      <div className="form-outline mb-3">
                        <input
                          type="password"
                          id="form2Example22"
                          className="form-control" onChange={(e)=>setPassword(e.target.value)}
                          placeholder="Enter Password Here"
                        />
                      </div>

                      <div className="text-center pt-1 mb-5 pb-1">
                        <div className="d-grid gap-2">
                          <button className="btn btn-primary btn-rounded" type="submit">Log in</button>
                        </div>
                        <a className="text-muted" href="#!">
                          Forgot password?
                        </a>
                      </div>

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Don't have an account?</p>
                        <button type="button" className="btn btn-outline-danger">
                          Create new
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">We are more than just a company</h4>
                    <p className="small mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
  
}
const mapStateToProps = state => ({
  local_state : state,
})
export default connect(mapStateToProps,{LoginAction,SetUserAction})(Login);
