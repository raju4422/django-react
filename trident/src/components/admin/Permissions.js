import React from "react";
import { axiosGet, axiosPost, axiosDelete } from "../../helpers/Master_helper";
import {
  Container,
  Col,
  Row,
  Button,
  Form,
  Table,
  InputGroup,
} from "react-bootstrap";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import "../../assets/css/permissions.css";

class Permissions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listAppLabels: [],
      listPermissions: [],
      permission_name: "",
      app_label: 0,
      items: [], // List of items from the API
      currentPage: 1, // Current page
      limit: 10, // Number of items per page
      totalCount: 0,
      search: "",
    };
  }

  loadPermissions = (filters = {}) => {
    const { currentPage, limit } = this.state;
    const url = `http://127.0.0.1:8000/api/permissions/list_permissions/?limit=${limit}&offset=${
      (currentPage - 1) * limit
    }`;
    const filters_obj = {};
    if (filters.name) {
      filters_obj.name = filters.name;
    }
    axiosPost(
      url,
      filters_obj,
      function (response) {
        const { data, pagination } = response;
        this.setState({
          listPermissions: data,
          totalCount: pagination.count,
        });
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

  addPermission = (e) => {
    e.preventDefault();
    const { permission_name } = this.state;
    const { app_label } = this.state;
    const url = "http://127.0.0.1:8000/api/permissions/";
    axiosPost(
      url,
      { name: permission_name, content_type_id: app_label },
      function (response) {
        this.loadPermissions();
      }.bind(this)
    );
  };

  deletePermission = (id) => {
    Swal.fire({
      title: "Do You Really Want To Delete?",
      text: "All the Blogs will be deleted...!",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        const url = "http://127.0.0.1:8000/api/permissions/" + id + "/";
        axiosDelete(
          url,
          {},
          function (response) {
            this.loadPermissions();
          }.bind(this)
        );
      }
    });
  };

  handlePageChange = (newPage) => {
    this.setState({ currentPage: newPage }, () => this.loadPermissions());
  };

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.setState({ currentPage: 1 }, () => {
        const { search } = this.state;
          this.loadPermissions({ name: search });
      });
    }
  };

  render() {
    const { listAppLabels } = this.state;
    // const { listPermissions } = this.state;
    const { listPermissions, currentPage, limit, totalCount } = this.state;

    return (
      <div>
        <Container fluid className="pt-2 ">
          <Row>
            <Col xs={7} className="border-end">
              <h4>List Of Permissions</h4>
              <div className="permissions-table-container">
                <Row>
                  <Col xs={6}>
                    <InputGroup hasValidation>
                      <InputGroup.Text>
                        <i className="bi bi-search"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="search"
                        onChange={(event) =>
                          this.setState({
                            ...this.state,
                            search: event.target.value,
                          })
                        }
                        onKeyDown={this.handleKeyPress}
                        placeholder="Search here.."
                      />
                    </InputGroup>
                  </Col>
                  <Col xs={6}></Col>
                </Row>
                <br />
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
                            <i
                              className="actionIcon bi bi-trash3-fill"
                              onClick={() =>
                                this.deletePermission(permission.id)
                              }
                            ></i>
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
                <div className="text-end">
                  <span>
                    Page {currentPage} of {Math.ceil(totalCount / limit)}
                  </span>{" "}
                  &nbsp;&nbsp;
                  <button
                    className="btn btn-outline-primary"
                    disabled={currentPage === 1}
                    onClick={() => this.handlePageChange(currentPage - 1)}
                  >
                    <i className="bi bi-box-arrow-in-left"></i>
                  </button>{" "}
                  &nbsp;
                  <button
                    className="btn btn-outline-primary"
                    disabled={currentPage * limit >= totalCount}
                    onClick={() => this.handlePageChange(currentPage + 1)}
                  >
                    <i className="bi bi-box-arrow-in-right"></i>
                  </button>
                </div>
              </div>
            </Col>
            <Col xs={5}>
              <Form onSubmit={(e) => this.addPermission(e)}>
                <Form.Group className="mb-3">
                  <Form.Label>Permission</Form.Label>
                  <Form.Control
                    type="text"
                    id="permission_name"
                    name="permission_name"
                    placeholder="Enter Permission"
                    onChange={(event) =>
                      this.setState({
                        ...this.state,
                        permission_name: event.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>App Label</Form.Label>
                  <Form.Select
                    name="app_lable"
                    id="app_label"
                    onChange={(event) =>
                      this.setState({
                        ...this.state,
                        app_label: event.target.value,
                      })
                    }
                  >
                    <option>Select App</option>
                    {listAppLabels.map((listAppLabel) => (
                      <option value={listAppLabel.id} key={listAppLabel.id}>
                        {listAppLabel.model}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
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
