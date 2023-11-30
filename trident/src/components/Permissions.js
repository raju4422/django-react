import React from "react";
import { axiosGet } from "../helpers/Master_helper";
import { Container, Col, Row, Button, Form, Table } from "react-bootstrap";
class Permissions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listAppLabels: [],
      listPermissions: [],
      permission_name : "",
      app_label : 0,
    };
    // Bind the method to the instance
   // this.loadAppLabels = this.loadAppLabels.bind(this);
    //this.loadPermissions = this.loadPermissions.bind(this);
  }

  loadPermissions = () => {
    const url = "http://127.0.0.1:8000/api/permissions/";
    axiosGet(
      url,
      function (response) {
        this.setState({ listPermissions: response.data });
      }.bind(this)
    );
  };

  loadAppLabels = () => {
    const url = "http://127.0.0.1:8000/api/permissions/get_all_app_labels/";
    axiosGet(
      url,
      function (response) {
        this.setState({ listAppLabels: response.data });
      }.bind(this)
    );
  };

  componentDidMount() {
    this.loadAppLabels();
    this.loadPermissions();
  }

  addPermission =(e)=>{
     e.preventDefault();
     const {permission_name} = this.state
     const {app_label} = this.state
      console.log(permission_name,app_label)
  }

  render() {
    const { listAppLabels } = this.state;
    const { listPermissions } = this.state;
    return (
      <div>
        <Container fluid className="pt-2">
          <Row>
            <Col xs={7} className="border-end">
              <h4>List Of Roles</h4>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Permission</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {listPermissions.length > 0 ? (
                    listPermissions.map((permission, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{permission.name}</td>
                        <td>
                          <i className="actionIcon bi bi-trash3-fill" ></i>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="text-center" colSpan={3}>
                        No Data found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Col>
            <Col xs={5}>
              <Form onSubmit={(e)=>this.addPermission(e)}>
                <Form.Group className="mb-3" >
                  <Form.Label>Permission</Form.Label>
                  <Form.Control
                    type="text"
                    id="permission_name"
                    name="permission_name"
                    placeholder="Enter Permission"
                    onChange={(event)=>this.setState({...this.state,permission_name:event.target.value})}
                  />
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label>App Label</Form.Label>
                  <Form.Select name="app_lable" id="app_label" onChange={(event)=>this.setState({...this.state,app_label:event.target.value})}>
                    <option>Select App</option>
                    {listAppLabels.map((listAppLabel) => (
                      <option value={listAppLabel.id} key={listAppLabel.id}>
                        {listAppLabel.model}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>App Label</Form.Label>
                  <Form.Control
                    type="text"
                    name="app_label"
                    placeholder="Enter Role"
                  />
                </Form.Group> */}
                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit">
                    Create
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Permissions;
