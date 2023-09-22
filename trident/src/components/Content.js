import { useState, useEffect } from "react";
import { useNavigate, useLocation, useMatch } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import { Admin, Resource } from 'react-admin';

function Content() {
  let component = "test";

  

  return (
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      {component}
    </div>
//      <Admin basename="/admin"  >
//       {component}
//  </Admin>
  );
}
export default Content;
