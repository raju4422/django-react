import { connect } from "react-redux";
import AdminLayout from "./AdminLayout";
// import Dashboard from "../pages/Dashboard";
// import Products from "../pages/Products";
// import Categories from "../pages/Categories";
// import Blogs from "../pages/Blogs";
// import CreateBlog from "../pages/CreateBlog";
// import AddCategory from "./forms/AddCategory";
// import EditCategory from "./forms/EditCategory";
import { Navigate } from "react-router-dom";

function Admin({ local_state }) {
  const { common } = local_state;

  return (
    <div>
      {common.isLogged ? <AdminLayout  /> : <Navigate to="/login" />}
    </div>
  );
}
const mapStateToProps = (state) => ({
  local_state: state,
});
export default connect(mapStateToProps)(Admin);
