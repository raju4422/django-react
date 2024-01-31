import "../assets/css/indexpage.css";
// import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import { NavLink,useNavigate } from "react-router-dom";
import { ListGroup, Row, Col, Image } from "react-bootstrap";
import { axiosGet, axiosPost, loadBlogImages,limitBlogDescription } from "../helpers/Master_helper";
import { React, useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RecentPopular from "../components/RecentPopular";

function IndexPage() {
  const [listRecentBlogs, setListRecentBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [limit, setLimit] = useState(10);

  const navigate = useNavigate();

  useEffect(() => {
    loadRecentBlogs();
  }, [currentPage]);
  const loadRecentBlogs = () => {
    const url = `http://127.0.0.1:8000/api/public/get_all_blogs/?limit=${limit}&offset=${(currentPage - 1) * limit}`;
    axiosPost(url,{},function(response) {
      setListRecentBlogs(response.data);
      setTotalCount(response?.pagination?.count);
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
            <div className="list_blog_desc">{limitBlogDescription(data.description,550)}</div>
          </Col>
        </Row>
        <hr />
      </div>
    );
  };

  return (
    <div  id="pages-wrap">
      <Container id="outer-wrapper">
        <Header/>
        <div className="pt-5 pb-4 ps-3 pe-3">
          <h5>RECENT POSTS</h5>
          <Row>
            <Col xs={12} md={8}>
              {listRecentBlogs.map((blog) => listBlogView(blog))}
              {}
              <div className="text-end">
                  <span>
                    Page {currentPage} of {Math.ceil(totalCount / limit)}
                  </span>{" "}
                  &nbsp;&nbsp;
                  <button
                    className="btn btn-outline-primary"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    <i className="bi bi-box-arrow-in-left"></i>
                  </button>{" "}
                  &nbsp;
                  <button
                    className="btn btn-outline-primary"
                    disabled={currentPage * limit >= totalCount}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    <i className="bi bi-box-arrow-in-right"></i>
                  </button>
                </div>
            </Col>
            <Col xs={12} md={4}>
              <RecentPopular/>
            </Col>
          </Row>
        </div>
        <Footer />
      </Container>
    </div>
  );
}
export default IndexPage;
