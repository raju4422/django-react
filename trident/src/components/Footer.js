import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import { ListGroup, Row, Col, Image } from "react-bootstrap";
import { axiosGet, axiosPost, loadBlogImages } from "../helpers/Master_helper";
import { ToastContainer } from "react-toastify";


function Footer() {
  const [listRecentBlogs, setListRecentBlogs] = useState([]);
  useEffect(() => {
    loadRecentBlogs();
  }, []);
  const loadRecentBlogs = () => {
    const url = "http://127.0.0.1:8000/api/blog/get_all/";
    axiosPost(url,{'limit':4},function (response) {
      setListRecentBlogs(response.data);
    });
  };

  const listPopularBlogsView = (data) => {
    return (
      <div key={data.id}>
        <Row>
          <Col sm={4}>
            <Image
              className="list-popular-blog-image"
              src={loadBlogImages(data.image)}
              fluid
            />
          </Col>
          <Col sm={8}>
            <h5>
              <NavLink className="list-popular-blog-title-link" to={data.slug+".html"}>
                {data.title}
              </NavLink>
            </h5>
            <div><span><i className="bi bi-person"></i> {data.user.last_name}.{data.user.first_name} &nbsp; </span><i className="bi bi-calendar"></i> &nbsp;{data.created_at}</div>
          </Col>
        </Row>
        <hr />
      </div>
    );
  };
  return (
    <Container fluid className="footer-post-container">
      <Row>
        <Col xs={12} md={4}>
          <h5>Popular Posts</h5>
          <hr />
          {listRecentBlogs.map((blog) => listPopularBlogsView(blog))}
        </Col>
        <Col xs={12} md={4}>
          <h5>Random Posts</h5>
          <hr />
          {listRecentBlogs.map((blog) => listPopularBlogsView(blog))}
        </Col>
        <Col xs={12} md={4}>
          <h5>Recent Posts</h5>
          <hr />
          {listRecentBlogs.map((blog) => listPopularBlogsView(blog))}
        </Col>
      </Row>
      <div>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </Container>
  );
}

export default Footer;
