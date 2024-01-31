import { React, useEffect, useState, useRef } from "react";

import {
  ListGroup,
  Row,
  Col,
  Image,
  Container,
  Card,
  Button,
} from "react-bootstrap";
import {
  useParams,
  useOutletContext,
  useNavigate,
  NavLink,
} from "react-router-dom";
import { useForm } from "react-hook-form";

import "../../assets/css/chat_layout.css";
import { axiosPost, axiosPut, successMsg } from "../../helpers/Master_helper";

function BlogReview() {
  let { blog_id } = useParams();
  const [blogId, setBlogId] = useState(null);
  const [message, setMessage] = useState("");
  const [listMessages, setListMessages] = useState([]);
  const [author, setAuthor] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const scrollContainerRef = useRef(null);


  useEffect(() => {
    fetchBlog();
    loadMessages();
    scrollToBottom();
  }, [blog_id]);

  function fetchBlog() {
    const url = "http://127.0.0.1:8000/api/blog/get_single_blog/";
    axiosPost(url, { blog_id: blog_id }, function (res) {
      setBlogId(res?.data?.id);
      setAuthor(res?.data?.user.id);
    });
  }

  function sendMessage(data) {
    console.log(data);
    const url = "http://127.0.0.1:8000/api/blog/add_blog_review_message/";
    axiosPost(
      url,
      { blog_id: blog_id, message: data.message },
      function (res) {}
    );
    loadMessages();
    setValue("message", "");
  }

  function loadMessages() {
    const url = "http://127.0.0.1:8000/api/blog/get_blog_review_messages/";
    axiosPost(url, { blog_id: blog_id }, function (res) {
      setListMessages(res?.data);
      scrollToBottom();
    });
  }
  const messageLayout = (data) => {
    if (data.user.id !== author) {
      return (
        <div className="d-flex justify-content-start mb-4" key={data.id}>
          <div className="img_cont_msg">
            <img
              src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png"
              className="rounded-circle user_img_msg"
            />
          </div>
          <div className="msg_cotainer">
            {data.message}
            <span className="msg_time">8:40 AM, Today</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="d-flex justify-content-end mb-4" key={data.id}>
          <div className="msg_cotainer_send">
            {data.message}
            <span className="msg_time_send">8:55 AM, Today</span>
          </div>
          <div className="img_cont_msg">
            <img
              src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png"
              className="rounded-circle user_img_msg"
            />
          </div>
        </div>
      );
    }
  };

  const scrollToBottom = () => {
    // Using current to access the actual DOM element
    const scrollContainer = scrollContainerRef.current;

    // Check if the container exists (it may not on the initial render)
    if (scrollContainer) {
      // Scroll to the bottom
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  };
  return (
    <Container fluid className="pt-3">
      <Row>
        <Col xs={6}></Col>
        <Col xs={6}>
          <h5>Chat</h5>
          <div className="maincontainer">
            <div className="container-fluid h-50">
              <div className="row justify-content-center h-100">
                <div className="col-md-12 col-xl-12 chat">
                  <div className="card">
                    <div className="card-header msg_head">
                      <div className="d-flex bd-highlight">
                        <div className="img_cont">
                          <img
                            src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png"
                            className="rounded-circle user_img"
                          />
                          <span className="online_icon"></span>
                        </div>
                        <div className="user_info">
                          <span>Chat with jassa</span>
                          <p>1767 Messages</p>
                        </div>
                      </div>
                    </div>
                    <div className="card-body msg_card_body"  ref={scrollContainerRef}>
                      {listMessages.length > 0
                        ? listMessages.map((message) => messageLayout(message))
                        : ""}
                      {/* <div className="d-flex justify-content-start mb-4">
                        <div className="img_cont_msg">
                          <img
                            src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png"
                            className="rounded-circle user_img_msg"
                          />
                        </div>
                        <div className="msg_cotainer">
                          Hi, how are you samim?
                          <span className="msg_time">8:40 AM, Today</span>
                        </div>
                      </div>
                      <div className="d-flex justify-content-end mb-4">
                        <div className="msg_cotainer_send">
                          Hi jassa i am good tnx how about you?
                          <span className="msg_time_send">8:55 AM, Today</span>
                        </div>
                        <div className="img_cont_msg">
                          <img
                            src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png"
                            className="rounded-circle user_img_msg"
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-start mb-4">
                        <div className="img_cont_msg">
                          <img
                            src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png"
                            className="rounded-circle user_img_msg"
                          />
                        </div>
                        <div className="msg_cotainer">
                          I am good too, thank you for your chat template
                          <span className="msg_time">9:00 AM, Today</span>
                        </div>
                      </div>
                      <div className="d-flex justify-content-end mb-4">
                        <div className="msg_cotainer_send">
                          You are welcome
                          <span className="msg_time_send">9:05 AM, Today</span>
                        </div>
                        <div className="img_cont_msg">
                          <img
                            src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png"
                            className="rounded-circle user_img_msg"
                          />
                        </div>
                      </div> */}
                    </div>
                    <div className="card-footer">
                      <form onSubmit={handleSubmit(sendMessage)}>
                        <div className="input-group">
                          <span className="input-group-text attach_btn">$</span>
                          <input
                            type="text"
                            name="message"
                            className="form-control type_msg message"
                            id="message"
                            aria-label="Amount (to the nearest dollar)"
                            {...register("message", {
                              required: "Category Name is required",
                            })}
                          />
                          <button
                            className="btn btn-primary"
                            type="submit"
                          >
                            <i className="bi bi-send-check-fill"></i>
                          </button>
                        </div>
                        <small>
                          {errors.message && (
                            <p className="errorMsg">{errors.message.message}</p>
                          )}
                        </small>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default BlogReview;
