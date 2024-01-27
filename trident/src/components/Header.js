import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../assets/css/header.css"
import { ListGroup, Row, Col, Image,Form, Container,Nav,Navbar } from "react-bootstrap";

function Header() {
  return (
    <>
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
                src="http://127.0.0.1:8000//media/trident_images/pngegg.png"
                fluid
              />
            </Col>
            <Col xs={12} md={8}>
              <h2>Ad Will Be Shown Here</h2>
            </Col>
          </Row>
        </div>
        <div className="ps-3 pe-3">
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home"><i className="bi bi-house-fill"></i></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      </div>
    </>
  );
}

export default Header;
