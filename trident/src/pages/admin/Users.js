import { useForm } from "react-hook-form";
import { React, useEffect, useState } from "react";
import { axiosPost, axiosGet , axiosDelete } from "../../helpers/Master_helper";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../assets/css/categories.css";

function Users() {

  const [isUserCreated, setIsUserCreated] = useState(false);
  const [isUserDeleted, setIsUserDeleted] = useState(false);
  const [listUsers, setListUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    setIsUserCreated(false);
    setIsUserDeleted(false);
    // parentStateUpdate()
  }, [isUserCreated, isUserDeleted]);
  const fetchUsers = () => {
    const url = "http://127.0.0.1:8000/api/users/";
    axiosGet(url, function (response) {
      setListUsers(response.data);
    });
  };

  const parentStateUpdate = () => {
    // console.log('testing')
    setIsUserCreated(true);
  };

  function deleteCategory(id) {
    Swal.fire({
      title: "Do You Really Want To Delete?",
      text: "All the Blogs will be deleted...!",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        const url = "http://127.0.0.1:8000/api/users/"+id+"/";
        axiosDelete(url, { id: id }, function (response) {
          setIsUserDeleted(true);
        });
      }
    });
  }

  return (
    <div className="pt-3 pb-2 mb-3">
      <h4 className="text-start">Users</h4>
      <hr />
      <div className="row">
        <div className="col col-md-8 border-end">
          <h4>List Of Users</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {listUsers.length > 0 ? (
                listUsers.map((user,key) => (
                  <tr key={user.id}>
                    <td>{key+1}</td>
                    <td>{user.last_name}.{user.first_name}</td>
                    <td>{user.email}</td>
                    <td>
                     {user.is_active==1 ? <i
                        className="actionIcon bi bi-x-circle-fill"
                        onClick={() => {
                          alert('test');
                        }}
                      ></i>: <i
                      className="actionIcon bi bi-check-square-fill"
                      onClick={() => {
                        alert('test');
                      }}
                    ></i>}
                      &nbsp;
                      <i
                        className="actionIcon bi bi-trash3-fill"
                        onClick={() => deleteCategory(user.id)}
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
  )
}

export default Users