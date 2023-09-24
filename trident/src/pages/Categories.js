import { useForm } from "react-hook-form";
import { React, useEffect, useState } from "react";
import { axiosPost,axiosGet } from "../helpers/Master_helper";

function Categories() {
  const [isCategoryCreated,setIsCategoryCreated] = useState(false);
  const [listCategories,setListCategories] = useState([]);

  const {register,handleSubmit,reset,formState: { errors }} = useForm();
  useEffect(()=>{
    fetchCategories();
    setIsCategoryCreated(false);
  },[isCategoryCreated])

  const fetchCategories = ()=>{
    const url = "http://127.0.0.1:8000/api/category/get_all/";
    axiosGet(url,function(response){
      setListCategories(response.data);
   })
  }

  function addCategory(data)  {
    const url = "http://127.0.0.1:8000/api/category/";
    axiosPost(url,{category_name:data.category_name},function(response){
        reset();
        setIsCategoryCreated(true);
    })
  };

  return (
    <div className="pt-3 pb-2 mb-3">
      <h4 className="text-start">Categories</h4>
      <hr />
      <div className="row">
        <div className="col col-md-8 border-end">
          <h4>List Of Categories</h4>
          <table className="table table-bordered">
            <thead><tr><th>Id</th><th>Category Name</th><th>Action</th></tr></thead>
            <tbody>
            { listCategories.length>0 ? listCategories.map((category)=><tr key={category.id}><td>{category.id}</td><td >{category.category_name}</td><td>edit</td></tr>) : <tr><td colSpan='2'>No Data Found..</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="col col-md-4">
          <h4>Categories Form</h4>
          <form onSubmit={handleSubmit(addCategory)}>
            <div className="form-outline mb-4">
              <input
                type="text"
                id="category_name"
                className="form-control category_name"
                {...register("category_name", { required: "Category Name is required" })}
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
      </div>
    </div>
  );
}
export default Categories;
