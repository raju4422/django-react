import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { React, useEffect, useState } from "react";
import { axiosPost,successMsg } from "../../helpers/Master_helper";
import store from "../../store";
import { connect } from "react-redux";

import {
  axiosGet,
  limitBlogDescription,
  loadBlogImages,
} from "../../helpers/Master_helper";
import "../../assets/css/blogs.css";
import Swal from "sweetalert2";


function Blogs({local_state}) {
  const navigate = useNavigate();
  const [listBlogs, setListBlogs] = useState([]);
  const [loadBlogs, setLoadBlogs] = useState(false);

  useEffect(() => {
    fetchBlogs();
    setLoadBlogs(false);
  }, [loadBlogs]);

  const fetchBlogs = () => {
    const url = "http://127.0.0.1:8000/api/blog/get_all/";
    axiosPost(url,{},function (response) {
      setListBlogs(response.data);
    });
  };

  const deleteBlog = (id) => {
    Swal.fire({
      title: "Do You Really Want To Delete?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        const url = "http://127.0.0.1:8000/api/blog/delete/";
        axiosPost(url, { id: id }, function (response) {
          setLoadBlogs(true);
          successMsg(response.msg)
        });
      }
    });
  };

  const publishBlog = (id) => {
    Swal.fire({
      title: "Do You Really Want To Publish Blog?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        const url = "http://127.0.0.1:8000/api/blog/publish_blog/";
        axiosPost(url, { id: id }, function (response) {
          setLoadBlogs(true);
          successMsg(response.msg)
        });
      }
    });
  };

  return (
    <div className="pt-3 pb-2 mb-3">
      <h2>Blogs</h2>
      <hr />
      <div className="row">
        <div className="col col-md-2">
          <Card>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => {
                  navigate("/admin/blogs/create");
                }}
              >
                Create a Blog
              </Button>
            </Card.Body>
          </Card>
        </div>
        {listBlogs.length > 0
          ? listBlogs.map((blog) => (
              <div className="col col-md-2 pb-3" key={blog.id}>
                <Card>
                  <Card.Img
                    variant="top"
                    className="blog_images"
                    src={loadBlogImages(blog.image)}
                  />
                  <Card.Body>
                    <Card.Title>{blog.title}</Card.Title>
                    <Card.Text>{blog.category.category_name}</Card.Text>
                    <Card.Text>
                      {limitBlogDescription(blog.description,100)}
                    </Card.Text>
                    {blog.is_published ? (
                      <i className="blog_action_icons bi bi-eye-fill"  onClick={() => {
                        navigate("/admin/blogs");
                      }}></i>
                    ) : "" }
                    { !blog.is_published ?
                       (
                      <i
                        className="blog_action_icons bi bi-trash3-fill"  onClick={() => deleteBlog(blog.id)}
                      ></i>
                    ) : ""}
                      { !blog.is_published ?
                       (
                      <i
                        className="blog_action_icons bi 
                        bi-p-square-fill"  onClick={() => publishBlog(blog.id)}
                      ></i>
                    ) : ""}
                  </Card.Body>
                </Card>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}

export default connect((state)=>({local_state:state}),{})(Blogs);
