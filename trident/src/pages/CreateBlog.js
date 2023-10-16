import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { React, useEffect, useState } from "react";
import { axiosPost, axiosGet } from "../helpers/Master_helper";
import { useForm } from "react-hook-form";

function CreateBlog() {
  const [listCategories, setListCategories] = useState([]);
  const {
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
    axiosPost(url, { title: data.blog_title,description:data.blog_desc,category:data.category }, function (response) {
      reset();
    });
  }

  return (
    <div className="pt-3 pb-2 mb-3">
      <h2>Create A Blog</h2>
      <hr />
      <form onSubmit={handleSubmit(CreateBlog)}>
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
                <select
                  className="form-select"
                  name="category"
                  aria-label="Default select example"
                  {...register("category", {
                    required: "Category is required",
                  })}
                >
                  <option>Select Category</option>
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
                {errors.category && (
                  <p className="errorMsg">{errors.category.message}</p>
                )}
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

              {/* <hr className="mx-n3" /> */}

              {/* <div className="px-5 py-4">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Send application
                  </button>
                </div> */}
            </div>
            <div className="col-md-8"></div>
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
