import { useForm } from "react-hook-form";
import { React, useEffect, useState } from "react";
import { axiosPost } from "../../helpers/Master_helper";
function AddCategory(props) {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();

    
    function updateParent(){
      props.updateState(true);
    }

    function addCategory(data) {
        const url = "http://127.0.0.1:8000/api/category/";
        axiosPost(url, { category_name: data.category_name }, function (response) {
          reset();
          updateParent();
          //setIsCategoryCreated(true);
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
export default AddCategory