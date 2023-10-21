import Sidebar from "./Sidebar";
// import Content from "./Content";
import "../assets/css/dashboard.css";
import {
  Outlet,NavLink
} from "react-router-dom";
// import Dashboard from "../pages/Dashboard";
// import Products from "../pages/Products";
// import Categories from "../pages/Categories";
// import Blogs from "../pages/Blogs";
// import CreateBlog from "../pages/CreateBlog";
// import AddCategory from "./forms/AddCategory";
// import EditCategory from "./forms/EditCategory";
import { connect } from "react-redux";
import { LoginAction } from "../actions";
import { SetUserAction } from "../actions";
import { ToastContainer} from "react-toastify";

function AdminLayout({LoginAction, SetUserAction }) {
  const logout = () => {
    LoginAction(false);
    SetUserAction({ id: 0, name: "", email: "", is_active: 0, auth_token: "" });
  };
  return (
    <div>
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 ">
        <NavLink className="navbar-brand col-md-3 col-lg-2 me-0 px-3" to="/admin/">
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
            <div className="nav-link px-3" onClick={logout} >
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
             <Outlet  />
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
