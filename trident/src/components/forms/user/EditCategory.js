import { useForm } from "react-hook-form";
import { React, useEffect } from "react";
import { axiosPost,axiosPut,successMsg, } from "../../helpers/Master_helper";
import { useParams,useOutletContext,useNavigate, NavLink} from "react-router-dom";

function EditCategory() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  let { cat_id } = useParams();
  useEffect(() => {
    getCategoryById();
  }, [cat_id]);

  const [parentStateUpdate] = useOutletContext();

  function updateParent(){
    parentStateUpdate();
  }

  function getCategoryById() {
    const url = "http://127.0.0.1:8000/api/category/getCategoryById/";
    if(cat_id && cat_id !==0){
      axiosPost(url, { id: cat_id }, function (response) {
        setValue("category_name", response.data.category_name);
      });
    }
  }
  function UpdateCategory(data) {
    const url = "http://127.0.0.1:8000/api/category/"+cat_id+"/update_category/";
    axiosPut(url, {id: cat_id,category_name: data.category_name }, function (response) {
      reset();
      updateParent();
      navigate("/admin/categories/")
      successMsg(response.msg)
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
          <NavLink className="btn btn-primary btn-rounded" to = "/admin/categories/" type="submit">
            Add
          </NavLink>
        </div>
      </form>
    </div>
  );
}
export default EditCategory;
