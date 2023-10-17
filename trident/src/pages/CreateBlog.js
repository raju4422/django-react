import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { React, useEffect, useState } from "react";
import { axiosPost, axiosGet } from "../helpers/Master_helper";
import { useForm,Controller } from "react-hook-form";

function CreateBlog() {
  const [listCategories, setListCategories] = useState([]);
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getCategories();
  }, []);

  function getCategories() {
    const url = "http://127.0.0.1:8000/api/category/get_all/";
    axiosGet(url, function (response) {
      setListCategories(response.data);
    });
  }

  function CreateBlog(data) {
    const url = "http://127.0.0.1:8000/api/blog/";
    const formData = new FormData();
    formData.append('image', data.blog_image[0]);
    formData.append('title', data.blog_title);
    formData.append('description', data.blog_desc);
    formData.append('category', data.category);
    formData.append('content', data.blog_content);
    axiosPost(
      url,
      formData,
      function (response) {
        reset();
      }
    );
  }

  return (
    <div className="pt-3 pb-2 mb-3">
      <h2>Create A Blog</h2>
      <hr />
      <form onSubmit={handleSubmit(CreateBlog)} encType="multipart/form-data">
        <div className="container h-100">
          <div className="row  h-100">
            <div className="col-md-4">
              <div className="pb-2">
                <input
                  type="text"
                  className="form-control "
                  placeholder="Blog Title"
                  name="blog_title"
                  {...register("blog_title", {
                    required: "Blog Title is required",
                  })}
                />
                {errors.blog_title && (
                  <p className="errorMsg">{errors.blog_title.message}</p>
                )}
              </div>
              {/* <div className="pb-2">
                <input
                  type="email"
                  className="form-control"
                  placeholder="example@example.com"
                />
              </div> */}
              <div className="pb-2">
                <Controller
                  name="category"
                  control={control}
                  defaultValue="" // Set a default value if needed
                  rules={{ required: "Category is required" }} // Specify the required rule
                  render={({ field }) => (
                    <select {...field}  className="form-select">
                      <option value="">Select Category</option>
                      {listCategories.length > 0 ? (
                    listCategories.map((category) => (
                      <option value={category.id} key={category.id}>
                        {category.category_name}
                      </option>
                    ))
                  ) : (
                    <option value="">No Data Found..</option>
                  )}
                    </select>
                  )}
                />
                 {errors.category && <p className="errorMsg">{errors.category.message}</p>}
              </div>
              {/* <hr className="mx-n3" /> */}
              <div className="pb-2">
                <textarea
                  className="form-control"
                  rows="3"
                  name="blog_desc"
                  placeholder="Blog Description"
                  {...register("blog_desc", {
                    required: "Blog Description is required",
                  })}
                ></textarea>
                {errors.blog_desc && (
                  <p className="errorMsg">{errors.blog_desc.message}</p>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Blog Image
                </label>
                <input
                  className="form-control blog_image"
                  type="file"
                  name="blog_image"
                  {...register("blog_image", {
                    required: "Blog Image is required",
                  })}
                />
                 {errors.blog_image && (
                  <p className="errorMsg">{errors.blog_image.message}</p>
                )}
              </div>
            </div>
            <div className="col-md-8">
            <div className="pb-2">
                <textarea
                  className="form-control"
                  rows="10"
                  name="blog_content"
                  placeholder="Blog Content"
                  {...register("blog_content", {
                    required: "Blog Content is required",
                  })}
                ></textarea>
                {errors.blog_content && (
                  <p className="errorMsg">{errors.blog_content.message}</p>
                )}
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="d-grid gap-2 col-6 mx-auto">
            <button className="btn btn-primary" type="submit">
              Create Blog
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateBlog;
