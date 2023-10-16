import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { React, useEffect, useState } from "react";
import { axiosPost, axiosGet } from "../helpers/Master_helper";

function Blogs() {
  const navigate = useNavigate();
  const [listBlogs, setListBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    const url = "http://127.0.0.1:8000/api/blog/get_all/";
    axiosGet(url, function (response) {
      console.log(response.data)
      setListBlogs(response.data);
    });
  };

  return (
    <div className="pt-3 pb-2 mb-3">
      <h2>Blogs</h2>
      <hr />
      <div className="row">
        <div className="col col-md-2">
          <Card >
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
              <div className="col col-md-2" key = {blog.id}>
                <Card >
                  <Card.Img variant="top" src="holder.js/100px180" />
                  <Card.Body>
                    <Card.Title>{blog.title}-{blog.category.category_name}</Card.Title>
                    <Card.Text>{blog.description}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => {
                        navigate("/admin/blogs");
                      }}
                    >
                      View
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}

export default Blogs;
