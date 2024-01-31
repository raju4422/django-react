import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import {
  Row,
  Col,
  Breadcrumb,
  Image,
  FloatingLabel,
  Form,
  Card,
  CardGroup,
  Button,
} from "react-bootstrap";

import PageNotFound from "../pages/PageNotFound";
import { useParams } from "react-router-dom";
import {
  axiosPost,
  base_url,
  loadBlogImages,
  warningMsg,
  successMsg,
  axiosGet,
} from "../helpers/Master_helper";
import Header from "./Header";
import Footer from "./Footer";
import RecentPopular from "./RecentPopular";
import ".././assets/css/blog_post.css";

function BlogPostOrNotFound() {
  const { name } = useParams();
  const [isBlogFound, setIsBlogFound] = useState(false);
  const [blogId, setBlogId] = useState("0");
  const [blogCategory, setBlogCategory] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDesc, setBlogDesc] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogComment, setBlogComment] = useState("");
  const [listBlogComments, setListBlogComments] = useState([]);
  const [lastBlogCommentId, setLastBlogCommentId] = useState(0);
  const [loadedComments, setLoadedComments] = useState([]);
  const [loadComments, setLoadComments] = useState(false);

  useEffect(() => {
    if (name && name.endsWith(".html")) {
      fetchBlog();
    }
  }, [name]);

  function fetchBlog() {
    const url = "http://127.0.0.1:8000/api/public/get_single_blog/";
    const slug = name.replace(/\.html$/, "");
    axiosPost(url, { blog_slug: slug }, function (res) {
      setIsBlogFound(true);
      setBlogId(res.data.id);
      setBlogCategory(res.data.category.category_name);
      setBlogTitle(res.data.title);
      setBlogImage(res.data.image);
      setBlogDesc(res.data.description);
      setBlogContent(res.data.content);
      fetchBlogComments(res.data.id);
    });
  }

  async function fetchBlogComments(id) {
    axiosPost(
      base_url + "blog/get_blog_comments/",
      { blog_id: id, last_id: lastBlogCommentId },
      function (res) {
        const first_record = res.first_record;
        var lastComment = null;
        if (res.data.length > 0) {
          lastComment = res.data[res.data.length - 1];
          setLastBlogCommentId(lastComment.id);
          if (lastBlogCommentId != 0) {
            const CombinedChats = res.data.concat(listBlogComments);
            setListBlogComments(CombinedChats);
          } else {
            setListBlogComments(res.data);
          }
        }
        if (lastComment.id > first_record.id) {
          setLoadComments(true);
          console.log(loadComments);
        }
      }
    );
  }

  function addBlogComment(event) {
    event.preventDefault();
    if (blogComment != "") {
      axiosPost(
        base_url + "blog/add_blog_comments/",
        { blog_id: blogId, blog_comment: blogComment },
        function (res) {
          fetchBlogComments(res.data.id);
        }
      );
    } else {
      warningMsg("Please Comment");
    }
  }

  function loadOlderMessages(event) {
    event.preventDefault();
    console.log(lastBlogCommentId);
    fetchBlogComments(blogId);
  }

  const blogCommentsView = (data) => {
    return (
      <div key={data.id}>
        <div className="d-flex flex-row p-3">
          <img
            src="https://i.imgur.com/zQZSWrt.jpg"
            width="40"
            height="40"
            className="rounded-circle mr-3"
          />
          <div className="w-100">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex flex-row align-items-center">
                <span className="mr-2">Brian selter</span>
                <small className="c-badge">Top Comment</small>
              </div>
              <small>12h ago</small>
            </div>
            <p className="text-justify comment-text mb-0">{data.comment}</p>
          </div>
        </div>
        <hr />
      </div>
    );
  };
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
                      <Image
                        className="single_blog_image"
                        src={loadBlogImages(blogImage)}
                        fluid
                      />
                    </div>
                    <br />
                    <div className="single_blog_description">{blogContent}</div>
                    <br />
                  </div>
                  <Row>
                    <Col xs={6}>
                      <div className="blog-comment-form-container">
                        <Form onSubmit={(e) => addBlogComment(e)}>
                          <Card>
                            <Card.Body>
                              <FloatingLabel
                                controlId="floatingTextarea2"
                                label="Comments"
                              >
                                <Form.Control
                                  as="textarea"
                                  placeholder="Leave a comment here"
                                  style={{ height: "250px" }}
                                  onChange={(e) =>
                                    setBlogComment(e.target.value)
                                  }
                                />
                              </FloatingLabel>
                            </Card.Body>
                            <Card.Footer>
                              <div className="comment-submit-container">
                                <div>Last updated 3 mins ago</div>
                                <div>
                                  <Button
                                    type="submit"
                                    variant="outline-primary"
                                  >
                                    Post Your Comment
                                  </Button>
                                </div>
                              </div>
                            </Card.Footer>
                          </Card>
                        </Form>
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div className="blog-comments-container">
                        <Card>
                          <Card.Header>Comments</Card.Header>
                          {/* <div className="ps-3 pt-3">
                            <h6>Comments</h6>
                          </div> */}
                          <Card.Body style={{ padding: "0" }}>
                            <div className="mt-2 list-blog-comments">
                              {loadComments == true ?? (
                                <div
                                  className="text-center p-2 load-older-messages"
                                  onClick={(e) => loadOlderMessages(e)}
                                >
                                  Load older messages..
                                </div>
                              )}
                              <div className="load-blog-comments">
                                {listBlogComments.map((comment, index) =>
                                  blogCommentsView(comment)
                                )}
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col xs={4}>
                  <RecentPopular />
                </Col>
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
