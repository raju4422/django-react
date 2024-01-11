import {React} from "react";
import axios from "axios";
import '../assets/css/login.css'
import { connect } from "react-redux";
import { LoginAction } from '../actions';
import { SetUserAction } from '../actions';
import { useForm } from 'react-hook-form';
import { useNavigate,Navigate } from 'react-router-dom';

function Login({local_state,LoginAction,SetUserAction}) {
  
  const {register,handleSubmit,formState: { errors }} = useForm();
  const navigation = useNavigate();
  const {common} = local_state;
  const url = "http://127.0.0.1:8000/api/login/";
  const onSubmitHandler = (data) => {
      var responseBody = {};
      responseBody.username = data.username
      responseBody.password = data.password
      axios
      .post(url, responseBody,{  headers: {
        'Content-Type': "application/x-www-form-urlencoded"
      }})
      .then(function (response) {
        let data = response.data;
        if(data.flag===1 && data.is_logged_in===true){
          localStorage.setItem('auth_token', data?.data?.auth_token);
          LoginAction(true);
          SetUserAction(data.data);
          navigation('/admin/dashboard/');
        }
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  }

  return (
    <div>
    { !common.isLogged ?  <section className="h-100 gradient-form" style={{backgroundCcolor: "#eee"}}>
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
                    <form  onSubmit={handleSubmit(onSubmitHandler)}>
                      <div className="form-outline mb-3">
                        <input
                          type="text"
                          id="username"
                          className="form-control username"
                          placeholder="Enter Username Here" name="username"
                          {...register("username", {
                            required: "Username is required"
                          })}
                        />
                         {errors.username && (
                            <p className="errorMsg">{errors.username.message}</p>
                          )}
                      </div>

                      <div className="form-outline mb-3">
                        <input
                          type="password"
                          id="password"
                          className="form-control password" 
                          placeholder="Enter Password Here" name="password"  {...register("password", {
                            required: "Password is required.",
                            minLength: {
                              value: 6,
                              message: "Password should be at-least 6 characters."
                            }
                          })}
                        />
                          {errors.password && (
                            <p className="errorMsg">{errors.password.message}</p>
                          )}
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
                        <button type="submit" className="btn btn-outline-danger">
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
    </section> : <Navigate to="/admin/" />
    }
    </div>
  );
  
}
const mapStateToProps = state => ({
  local_state : state,
})
export default connect(mapStateToProps,{LoginAction,SetUserAction})(Login);
