import { useForm } from "react-hook-form";
import { React, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form } from "react-bootstrap";
import {
  axiosPost,
  successMsg,
  axiosGet,
} from "../../../helpers/Master_helper";
function AddUser(props) {
  const [parentStateUpdate] = useOutletContext();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  function updateParent() {
    parentStateUpdate();
  }
  useEffect(() => {
    getRoles();
  },[]);

  const [listRoles, setListRoles] = useState([]);

  function addUser(data) {
    const url = "http://127.0.0.1:8000/api/users/";
    axiosPost(
      url,
      { first_name: data.user_name, user_email: data.user_email,role_id:data.user_role },
      function (response) {
        reset();
        updateParent();
        successMsg(response.msg);
      }
    );
  }
  function getRoles() {
    const url = "http://127.0.0.1:8000/api/roles/";
    axiosGet(url, function (response) {
      setListRoles(response.data);
    });
  }

  return (
    <div>
      <h4>Add User Form</h4>
      <form onSubmit={handleSubmit(addUser)}>
        <div className="form-outline mb-2">
          <input
            type="text"
            id="user_name"
            className="form-control user_name"
            {...register("user_name", {
              required: "User Name is required",
            })}
            name="user_name"
            placeholder="Enter Name"
          />
          {errors.user_name && (
            <p className="errorMsg">{errors.user_name.message}</p>
          )}
        </div>
        <div className="form-outline mb-2">
          <input
            type="text"
            id="user_email"
            className="form-control user_email"
            {...register("user_email", {
              required: "User Email is required",
            })}
            name="user_email"
            placeholder="Enter User Email"
          />
          {errors.user_email && (
            <p className="errorMsg">{errors.user_email.message}</p>
          )}
        </div>
        <Form.Group className="mb-3">
          <Form.Select
            name="user_role"
            id="user_role"
            {...register("user_role", {
              required: "User Role is required",
            })}
          >
            <option value="">Select Role</option>
            {listRoles.map((role) => (
              <option value={role.id} key={role.id}>
                {role.name}
              </option>
            ))}
          </Form.Select>
          {errors.user_role && (
            <p className="errorMsg">{errors.user_role.message}</p>
          )}
        </Form.Group>
        <div className="d-grid gap-2">
          <button className="btn btn-primary btn-rounded" type="submit">
            Create User
          </button>
        </div>
      </form>
    </div>
  );
}
export default AddUser;
