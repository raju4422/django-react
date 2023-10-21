import { useForm } from "react-hook-form";
import { React, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { axiosPost,successMsg} from "../../helpers/Master_helper";
function AddCategory(props) {
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

  function addCategory(data) {
    const url = "http://127.0.0.1:8000/api/category/";
    axiosPost(url, { category_name: data.category_name }, function (response) {
      reset();
      updateParent();
      successMsg(response.msg);
    });
  }

  return (
    <div>
      <h4>Categories Form</h4>
      <form onSubmit={handleSubmit(addCategory)}>
        <div className="form-outline mb-4">
          <input
            type="text"
            id="category_name"
            className="form-control category_name"
            {...register("category_name", {
              required: "Category Name is required",
            })}
            name="category_name"
            placeholder="Enter Category Name"
          />
          {errors.category_name && (
            <p className="errorMsg">{errors.category_name.message}</p>
          )}
        </div>
        <div className="d-grid gap-2">
          <button className="btn btn-primary btn-rounded" type="submit">
            Create Category
          </button>
        </div>
      </form>
    </div>
  );
}
export default AddCategory;
