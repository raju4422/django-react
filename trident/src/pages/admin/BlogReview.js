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
import { connect } from "react-redux";

import "../../assets/css/chat_layout.css";
import { axiosPost, axiosPut, successMsg } from "../../helpers/Master_helper";
import { w3cwebsocket as W3CWebSocket } from "websocket";

// const client = new W3CWebSocket('ws://127.0.0.1:8000/ws/' + this.state.room + '/'); //gets room_name from the state and connects to the backend server

function BlogReview({ local_state}) {
  const user_id = local_state?.setUser?.id;
  let { blog_id } = useParams();
  const [blogId, setBlogId] = useState(null);
  const [listMessages, setListMessages] = useState([]);
  const [author, setAuthor] = useState(0);

  const [webSocket, setWebSocket] = useState(null);
  const [room, setRoom] = useState("test");
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

    scrollToBottom();
    console.log(listMessages);
    // const socket = new WebSocket('ws://127.0.0.1:8000/ws/' + room + '/');
    const socket = new WebSocket("ws://127.0.0.1:8000/ws/" + room + "/"); //gets room_name from the state and connects to the backend server

    // Set up event listeners
    socket.addEventListener("open", (event) => {
      console.log("WebSocket connection opened:", event);
    });

    socket.addEventListener("message", (event) => {
      //console.log(event.data)
      // Handle incoming messages
      // const newMessages = [...messages, event.data];
      // setMessages(newMessages);
      console.log(event.data)
      addElement(event.data);
    });

    socket.addEventListener("close", (event) => {
      console.log("WebSocket connection closed:", event);
    });
    setWebSocket(socket);
    // Clean up the WebSocket connection on component unmount
    return () => {
      socket.close();
    };
  }, [blog_id]);

  useEffect(() => {
    loadMessages();
  }, []);

  const addElement = (data) => {
    setListMessages(prevElements => [...prevElements, JSON.parse(data)]);
  };

  function send_Message(data) {
    const resdata = {
      type: "message",
      text: data.message,
      sender: user_id,
      blog_id: blogId,
    };
    webSocket.send(JSON.stringify(resdata));
    setValue('message',"");
  }

  function fetchBlog() {
    const url = "http://127.0.0.1:8000/api/blog/get_single_blog/";
    axiosPost(url, { blog_id: blog_id }, function (res) {
      setBlogId(res?.data?.id);
      setAuthor(res?.data?.user.id);
    });
  }

  function loadMessages() {
    const url = "http://127.0.0.1:8000/api/blog/get_blog_review_messages/";
    axiosPost(url, { blog_id: blog_id }, function (res) {
      setListMessages(res?.data);
      scrollToBottom();
    });
  }
  const messageLayout = (data) => {
    if (data.user !== author) {
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
                    <div
                      className="card-body msg_card_body"
                      ref={scrollContainerRef}
                    >
                      {listMessages.length > 0
                        ? listMessages.map((message) => messageLayout(message))
                        : ""}
                    </div>
                    <div className="card-footer send_message_container">
                      <form onSubmit={handleSubmit(send_Message)}>
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
                          <button className="btn btn-primary" type="submit">
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

const mapStateToProps = (state) => ({
  local_state: state,
});

export default connect(mapStateToProps)(
  BlogReview
);
