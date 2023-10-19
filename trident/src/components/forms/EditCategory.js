import { useForm } from "react-hook-form";
import { React, useEffect, useState } from "react";
import { axiosPost } from "../../helpers/Master_helper";
import { useParams,useOutletContext } from "react-router-dom";

function EditCategory(props) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  let { categoryId } = useParams();
  useEffect(() => {
    getCategoryById();
  }, [categoryId]);

  const [parentStateUpdate] = useOutletContext();

  function updateParent(){
    parentStateUpdate();
  }

  function getCategoryById() {
    const url = "http://127.0.0.1:8000/api/category/getCategoryById/";
    axiosPost(url, { id: categoryId }, function (response) {
      setValue("category_name", response.data.category_name);
      // updateParent();
      //setIsCategoryCreated(true);
    });
  }
  function UpdateCategory(data) {
    const url = "http://127.0.0.1:8000/api/update_category/"+categoryId;
    axiosPost(url, {id: categoryId,category_name: data.category_name }, function (response) {
      reset();
      updateParent();
      //setIsCategoryCreated(true);
    });
  }

  return (
    <div>
      <h4>Categories Form</h4>
      <form onSubmit={handleSubmit(UpdateCategory)}>
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
            Update Category
          </button>
        </div>
      </form>
    </div>
  );
}
export default EditCategory;
