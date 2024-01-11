import Sidebar from "./Sidebar";
import "../assets/css/dashboard.css";
import "../assets/css/categories.css";
import { Outlet, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { LoginAction } from "../actions";
import { SetUserAction } from "../actions";
import { ToastContainer } from "react-toastify";
import { axiosPost, base_url } from "../helpers/Master_helper";

function AdminLayout({ local_state, LoginAction, SetUserAction }) {
  const auth_token = local_state?.setUser?.auth_token;
  const logout = () => {
    axiosPost(
      base_url + "login/logout/",
      {},
      function (res) {
        LoginAction(false);
        SetUserAction({ id: 0, name: "", email: "", auth_token: "" });
      },
      auth_token
    );
  };
  return (
    <div>
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 ">
        <NavLink
          className="navbar-brand col-md-3 col-lg-2 me-0 px-3"
          to="/admin/"
        >
          Company name
        </NavLink>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <input
          className="form-control form-control-dark w-100"
          type="text"
          placeholder="Search"
          aria-label="Search"
        />
        <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            <div className="nav-link px-3" onClick={logout}>
              Sign out
            </div>
          </div>
        </div>
      </header>
      <div className="container-fluid">
        <div className="row">
          {/* ..sidebar */}
          <Sidebar />
          {/* ..end sidebar */}
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {/* content */}
            <Outlet />
            {/* content */}
          </main>
        </div>
      </div>
      <div>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  local_state: state,
});
export default connect(mapStateToProps, { LoginAction, SetUserAction })(
  AdminLayout
);
