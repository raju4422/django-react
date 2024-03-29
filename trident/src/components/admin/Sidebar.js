
import {NavLink} from "react-router-dom"
function Sidebar() {
  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink className="nav-link"  to="/admin/">
              <span data-feather="home"></span>
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/blogs/">
              <span data-feather="file"></span>
              Blogs
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/categories/">
              <span data-feather="shopping-cart"></span>
              Categories
            </NavLink>
          </li>
         <li className="nav-item">
         <NavLink className="nav-link" to="/admin/images/">
              <span data-feather="shopping-cart"></span>
              T-Images
            </NavLink>
          </li>
          <li className="nav-item">
         <NavLink className="nav-link" to="/admin/users/">
              <span data-feather="shopping-cart"></span>
              Users
          </NavLink>
          </li>
          <li className="nav-item">
           <NavLink className="nav-link" to="/admin/approvals/">
            Approvals
          </NavLink>
          </li>
          <li className="nav-item">
         <NavLink className="nav-link" to="/admin/role-permissions/">
              <span data-feather="shopping-cart"></span>
             Role-Permissions
          </NavLink>
          </li>
           <li className="nav-item">
           <NavLink className="nav-link" to="/admin/payments/">
              <span data-feather="shopping-cart"></span>
            Payments
          </NavLink>
          </li>
          {/* <li className="nav-item">
            <a className="nav-link" href="#">
              <span data-feather="layers"></span>
              Integrations
            </a>
          </li> */}
        </ul>

        {/* <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Saved reports</span>
          <a className="link-secondary" href="#" aria-label="Add a new report">
            <span data-feather="plus-circle"></span>
          </a>
        </h6> */}
        {/* <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span data-feather="file-text"></span>
              Current month
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span data-feather="file-text"></span>
              Last quarter
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span data-feather="file-text"></span>
              Social engagement
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span data-feather="file-text"></span>
              Year-end sale
            </a>
          </li>
        </ul> */}
      </div>
    </nav>
  );
}
export default Sidebar;
