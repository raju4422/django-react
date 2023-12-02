import "../assets/css/indexpage.css";
// import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import { NavLink,useNavigate } from "react-router-dom";
import { ListGroup, Row, Col, Image } from "react-bootstrap";
import { axiosGet, loadBlogImages } from "../helpers/Master_helper";
import { React, useState, useEffect } from "react";

function IndexPage() {
  const [listRecentBlogs, setListRecentBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadRecentBlogs();
  }, []);
  const loadRecentBlogs = () => {
    const url = "http://127.0.0.1:8000/api/blog/get_all/";
    axiosGet(url, function (response) {
      setListRecentBlogs(response.data);
    });
  };

  const listBlogView = (data) => {
    return (
      <div key={data.id}>
        <Row >
          <Col sm={4}>
            <Image
              className="list-blog-image"
              src={loadBlogImages(data.image)}
              fluid
            />
          </Col>
          <Col sm={8}>
            <h3>
              <NavLink className="list-blog-title-link" to={data.slug+".html"} >
                {data.title}
              </NavLink>
            </h3>
            <div>{data.description}</div>
          </Col>
        </Row>
        <hr />
      </div>
    );
  };

  const listPopularBlogsView = (data) => {
    return (
      <div key={data.id}>
        <Row >
          <Col sm={4}>
            <Image
              className="list-popular-blog-image"
              src={loadBlogImages(data.image)}
              fluid
            />
          </Col>
          <Col sm={8}>
            <h5>
              <NavLink className="list-popular-blog-title-link" to={"/blogs/"}>
                {data.title}
              </NavLink>
            </h5>
          </Col>
        </Row>
        <hr />
      </div>
    );
  };

  return (
    <div className="" id="pages-wrap">
      <Container id="outer-wrapper">
        <Navbar className="d-flex top-navbar">
          <div className="d-none d-sm-block d-md-block d-lg-block">
            <ListGroup
              horizontal
              defaultActiveKey="#home"
              className="list-group-no-border"
            >
              <ListGroup.Item>Home</ListGroup.Item>
              <ListGroup.Item>About</ListGroup.Item>
              <ListGroup.Item>Contact</ListGroup.Item>
            </ListGroup>
          </div>
          <div className="d-block d-sm-none">
            <Form.Select aria-label="Default select example">
              <option value="1">Home</option>
              <option value="2">About</option>
              <option value="3">Contact</option>
            </Form.Select>
          </div>
          <div>
            <ListGroup horizontal className="list-group-no-border">
              <ListGroup.Item>
                <i className="bi bi-facebook"></i>
              </ListGroup.Item>
              <ListGroup.Item>
                <i className="bi bi-twitter-x"></i>
              </ListGroup.Item>
              <ListGroup.Item>
                <i className="bi bi-youtube"></i>
              </ListGroup.Item>
              <ListGroup.Item>
                <i className="bi bi-facebook"></i>
              </ListGroup.Item>
            </ListGroup>
          </div>
        </Navbar>
        <div className="pt-2 pb-2 ps-3 pe-3">
          <Row>
            <Col xs={12} md={4}>
              <Image
                src="https://ik.imagekit.io/t3plizcmy/Trident.png?updatedAt=1698258613805"
                fluid
              />
            </Col>
            <Col xs={12} md={8}>
              <h2>Ad Will Be Shown Here</h2>
            </Col>
          </Row>
        </div>
        <div className="pt-5 pb-4 ps-3 pe-3">
          <h5>RECENT POSTS</h5>
          <Row>
            <Col xs={12} md={8}>
              {listRecentBlogs.map((blog) => listBlogView(blog))}
            </Col>
            <Col xs={12} md={4}>
              <h2>Ad Will Be Shown Here</h2>
            </Col>
          </Row>
        </div>
        <Container fluid className="footer-post-container">
        <Row>
            <Col xs={12} md={4}>
            <h5>Popular Posts</h5>
            <hr/>
              {listRecentBlogs.map((blog) => listPopularBlogsView(blog))}
            </Col>
            <Col xs={12} md={4}>
              <h5>Random Posts</h5>
              <hr/>
              {listRecentBlogs.map((blog) => listPopularBlogsView(blog))}
            </Col>
            <Col xs={12} md={4}>
              <h5>Recent Posts</h5>
              <hr/>
              {listRecentBlogs.map((blog) => listPopularBlogsView(blog))}
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}
export default IndexPage;
