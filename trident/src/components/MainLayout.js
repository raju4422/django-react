import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
// import { useEffect} from "react";
import { connect } from "react-redux";
import { IncAction } from "../actions";
import { DecAction } from "../actions";
import { LoginAction } from "../actions";
import { SetUserAction } from "../actions";
// import { axiosPost } from "../helpers/Master_helper";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Categories from "../pages/Categories";
import Blogs from "../pages/Blogs";
import CreateBlog from "../pages/CreateBlog";
import AddCategory from "./forms/AddCategory";
import EditCategory from "./forms/EditCategory";
import AddUser from "./forms/user/AddUser";
import IndexPage from "../pages/IndexPage";
import Admin from "./Admin";
import PageNotFoundAdmin from "../pages/PageNotFoundAdmin";
import PageNotFound from "../pages/PageNotFound";
import TridentImages from "../pages/TridentImages";
import RolePermissions from "../pages/RolePermissions";
import Roles from "./Roles";
import Users from "../pages/Users";
import Permissions from "./Permissions";
import BlogPostOrNotFound from "./BlogPostOrNotFound"
function MainLayout({
  local_state,
  IncAction,
  DecAction,
  LoginAction,
  SetUserAction,
}) {
  // const { setUser } = local_state;
  // const url = "http://127.0.0.1:8000/api/login/token_auth/";
  // useEffect(() => {
  //   fetchUser();
  // }, []);

  // function fetchUser() {
  //   const dataObj = {
  //     id: setUser.id,
  //     token: setUser.auth_token,
  //   };
  //   axiosPost(url, dataObj, function (data) {
  //     if (data.flag === 1 && data.is_logged_in === true) {
  //       LoginAction(true);
  //     }
  //   });
  // }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/:name" element={<BlogPostOrNotFound/>} />
        <Route path="/login/" element={<Login />} />
        <Route path="/admin/" element={<Admin />}>
          <Route path="/admin/" element={<Dashboard />} />
          <Route path="/admin/products/" element={<Products />} />
          <Route path="/admin/categories/" element={<Categories />}>
            <Route path="/admin/categories/" element={<AddCategory />} />
            <Route
              path="/admin/categories/edit/:cat_id"
              element={<EditCategory />}
            />
          </Route>
          <Route path="/admin/blogs/" element={<Blogs />} />
          <Route path="/admin/users/" element={<Users />}>
            <Route path="/admin/users/" element={<AddUser />} />
            <Route
              path="/admin/users/edit/:user_id"
              element={<EditCategory />}
            />
          </Route>
          <Route path="/admin/role-permissions/" element={<RolePermissions />}>
            <Route
              path="/admin/role-permissions/roles/"
              element={<Roles />}
            />
            <Route
              path="/admin/role-permissions/permissions/"
              element={<Permissions />}
            />
          </Route>
          <Route path="/admin/blogs/create/" element={<CreateBlog />} />
          <Route path="/admin/images/" element={<TridentImages />} />
          <Route path="*" element={<PageNotFoundAdmin />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  local_state: state,
});

export default connect(mapStateToProps, {
  IncAction,
  DecAction,
  LoginAction,
  SetUserAction,
})(MainLayout);
