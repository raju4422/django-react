import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import { ListGroup, Row, Col, Image } from "react-bootstrap";

function Header() {
  return (
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
  );
}

export default Header;
