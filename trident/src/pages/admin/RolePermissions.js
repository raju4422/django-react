import React from "react";

import { Container, Col, Row , Card } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";

function RolePermissions() {
  return (
    <Container fluid className="pt-2">
      <Row>
        <Col xs={9} className="border-end">
            <Outlet />
        </Col>
        <Col xs={3} className="justify-content">
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Navigation Links</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <NavLink className="card-link" to={'roles'}>Roles</NavLink>
              <NavLink className="card-link" to={'permissions'}>Permissions</NavLink>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Card Link</Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default RolePermissions;
