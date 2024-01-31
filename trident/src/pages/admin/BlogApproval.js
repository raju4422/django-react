import React, { useEffect, useState } from "react";
import {
  ListGroup,
  Row,
  Col,
  Image,
  Container,
  Card,
  Button,
} from "react-bootstrap";
import BlogChat from "../../components/admin/BlogChat";
import {
  axiosPost,
  successMsg,
  limitBlogDescription,
  loadBlogImages,
} from "../../helpers/Master_helper";
import { useParams,useOutletContext,useNavigate, NavLink} from "react-router-dom";


function BlogApproval() {
  const [listBlogs, setListBlogs] = useState([]);
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    const url = "http://127.0.0.1:8000/api/blog/get_all/";
    axiosPost(url, {}, function (response) {
      setListBlogs(response.data);
    });
  };

  return (
    <div>
      <Container fluid className="pt-3">
      <Row>
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
                      {limitBlogDescription(blog.description, 100)}
                    </Card.Text>
                    <NavLink  to ={`/admin/approval/review/`+blog.id} type="submit">
                        <i className="bi bi-journal-check action-icons"></i>
                    </NavLink>
                      
                  </Card.Body>
                </Card>
              </div>
            ))
          : ""}
        </Row>
      </Container>
    </div>
  );
}

export default BlogApproval;
