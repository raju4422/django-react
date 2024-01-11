import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Breadcrumb, Image } from "react-bootstrap";

import PageNotFound from "../pages/PageNotFound";
import { useParams } from "react-router-dom";
import { axiosPost, base_url, loadBlogImages } from "../helpers/Master_helper";
import Header from "./Header";
import Footer from "./Footer";
import ".././assets/css/blog_post.css";

function BlogPostOrNotFound() {
  const { name } = useParams();
  const [isBlogFound, setIsBlogFound] = useState(false);
  const [blogCategory, setBlogCategory] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDesc, setBlogDesc] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogContent, setBlogContent] = useState("");

  useEffect(() => {
    if (name && name.endsWith(".html")) {
      fetchBlog();
    }
  }, [name]);

  function fetchBlog() {
    const url = "http://127.0.0.1:8000/api/blog/get_single_blog/";
    const slug = name.replace(/\.html$/, "");
    axiosPost(url, { blog_slug: slug }, function (res) {
      setIsBlogFound(true);
      setBlogCategory(res.data.category.category_name);
      setBlogTitle(res.data.title);
      setBlogImage(res.data.image)
      setBlogDesc(res.data.description)
      setBlogContent(res.data.content)
    });
  }

  if (name && name.endsWith(".html")) {
    if (isBlogFound) {
      return (
        <div className="" id="pages-wrap">
          <Container id="outer-wrapper">
            <Header />
            <div className="pt-2 pb-2 ps-3 pe-3">
              <Row>
                <Col xs={8}>
                  <Breadcrumb>
                    <Breadcrumb.Item href={base_url}>Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="#">
                      {blogCategory ? blogCategory : "Other"}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                      {blogTitle ? blogTitle : "Testing"}
                    </Breadcrumb.Item>
                  </Breadcrumb>
                  <div>
                    <h2>{blogTitle}</h2>
                    <hr />
                    <div className="single_blog_image">
                      <Image className="single_blog_image" src={loadBlogImages(blogImage)} fluid />
                    </div>
                    <br/>
                    <div className="single_blog_description">
                      {blogContent}
                    </div>
                    <br/>
                  </div>
                </Col>
                <Col xs={4}></Col>
              </Row>
            </div>
            <Footer />
          </Container>
        </div>
      );
    } else {
      return <PageNotFound />;
    }
  } else {
    return <PageNotFound />;
  }
}

export default BlogPostOrNotFound;
