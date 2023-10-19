import { useForm } from "react-hook-form";
import { React, useEffect, useState } from "react";
import { axiosPost, axiosGet } from "../helpers/Master_helper";
import AddCategory from "../components/forms/AddCategory";
import EditCategory from "../components/forms/EditCategory";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../assets/css/categories.css";

function Categories(...props) {
  const [isCategoryCreated, setIsCategoryCreated] = useState(false);
  const [isCategoryDeleted, setIsCategoryDeleted] = useState(false);
  const [listCategories, setListCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    setIsCategoryCreated(false);
    setIsCategoryDeleted(false);
    // parentStateUpdate()
  }, [isCategoryCreated, isCategoryDeleted]);
  const fetchCategories = () => {
    const url = "http://127.0.0.1:8000/api/category/get_all/";
    axiosGet(url, function (response) {
      setListCategories(response.data);
    });
  };

  const parentStateUpdate = () => {
    // console.log('testing')
    setIsCategoryCreated(true);
  };

  const name='Your name'


  function deleteCategory(id) {
    Swal.fire({
      title: "Do You Really Want To Delete?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        const url = "http://127.0.0.1:8000/api/category/delete/";
        axiosPost(url, { id: id }, function (response) {
          setIsCategoryDeleted(true);
        });
      }
    });
  }

  return (
    <div className="pt-3 pb-2 mb-3">
      <h4 className="text-start">Categories</h4>
      <hr />
      <div className="row">
        <div className="col col-md-8 border-end">
          <h4>List Of Categories</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Id</th>
                <th>Category Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {listCategories.length > 0 ? (
                listCategories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.category_name}</td>
                    <td>
                      <i
                        className="actionIcon bi bi-pencil-square"
                        onClick={() => {
                          navigate("/admin/categories/edit/" + category.id);
                        }}
                      ></i>
                      &nbsp;
                      <i
                        className="actionIcon bi bi-trash3-fill"
                        onClick={() => deleteCategory(category.id)}
                      ></i>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No Data Found..</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="col col-md-4">
          <Outlet context={[parentStateUpdate]} />
        </div>
      </div>
    </div>
  );
}
export default Categories;
