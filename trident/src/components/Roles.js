import { React, useEffect, useState } from "react";
import {
  Container,
  Col,
  Row,
  Button,
  Form,
  Table,
  Modal,
} from "react-bootstrap";
import {
  axiosDelete,
  axiosGet,
  axiosPost,
  successMsg,
} from "../helpers/Master_helper";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

// import { NavLink, Outlet } from "react-router-dom";

const Roles = () => {
  const [isRoleCreated, setIsRoleCreated] = useState(false);
  const [isRoleDeleted, setIsRoleDeleted] = useState(false);
  const [listRoles, setListRoles] = useState([]);
  const [listRolePermissions, setListRolePermissions] = useState([]);
  const [listAllPermissions, setListAllPermissions] = useState([]);
  const [show, setShow] = useState(false);
  const [rolePermId, setRolePermId] = useState(0);
  const [viewRolePerm, setViewRolePerm] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    loadRoles();
    setIsRoleCreated(false);
    setIsRoleDeleted(false);
  }, [isRoleCreated, isRoleDeleted]);

  function loadRoles() {
    const url = "http://127.0.0.1:8000/api/roles/";
    axiosGet(url, function (response) {
      setListRoles(response.data);
    });
  }
  function addRole(data) {
    const url = "http://127.0.0.1:8000/api/roles/";
    axiosPost(url, { name: data.role_name }, function (response) {
      setIsRoleCreated(true);
      successMsg(response.msg);
    });
  }

  function deleteRole(id) {
    Swal.fire({
      title: "Do You Really Want To Delete Blog?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        const url = "http://127.0.0.1:8000/api/roles/" + id + "/";
        axiosDelete(url, { id: id }, function (response) {
          setIsRoleDeleted(true);
          successMsg(response.msg);
        });
      }
    });
  }

  function loadRolePermissions(id) {
    const url = "http://127.0.0.1:8000/api/roles/get_all_role_permissions/";
    axiosPost(url,{'role_id':id},function (response) {
      setListRolePermissions(response.role_permissions);
      setListAllPermissions(response.all_permissions);
      setShow(true);
      setRolePermId(id)
      setViewRolePerm(response.role)
    });
  }

  function assignRolePermissions(e) {
    e.preventDefault();
    const pemissionIds = document.getElementsByName("permissions[]");
    const checkedValues = [];

    // Iterate through checkboxes to find the checked ones
    pemissionIds.forEach((checkbox) => {
      if (checkbox.checked) {
        checkedValues.push(checkbox.value);
      }
    });
    const url = "http://127.0.0.1:8000/api/roles/assign_role_permissions/";
    axiosPost(url, { permissions: checkedValues,'role_id': rolePermId }, function (response) {
      setShow(false);
      successMsg(response.msg);
    });
  }

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
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {listRoles.length > 0 ? (
                  listRoles.map((role, key) => (
                    <tr key={role.id}>
                      <td>{key + 1}</td>
                      <td>{role.name}</td>
                      <td>
                        <i
                          className="actionIcon bi bi-pencil-square"
                          onClick={() => {
                            alert("test");
                          }}
                        ></i>
                        &nbsp;
                        <i
                          className="actionIcon bi bi-trash"
                          onClick={() => deleteRole(role.id)}
                        ></i>
                        &nbsp;
                        <i
                          className="actionIcon bi bi-snow2"
                          onClick={() => loadRolePermissions(role.id)}
                        ></i>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2">No Data Found..</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
          <Col xs={5}>
            <Form onSubmit={handleSubmit(addRole)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  type="text"
                  name="role_name"
                  placeholder="Enter Role"
                  {...register("role_name", {
                    required: "Role is required",
                  })}
                />
                {errors.role_name && (
                  <p className="errorMsg">{errors.role_name.message}</p>
                )}
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
      {/* modal */}
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-lg"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
          <b>{viewRolePerm ?? viewRolePerm}</b> Permissions 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
            commodi aspernatur enim, consectetur. Cumque deleniti temporibus
          </p>
          <div>
            <form onSubmit={(e) => assignRolePermissions(e)}>
              {listAllPermissions.length > 0
                ? listAllPermissions.map((permission) => (
                    <div key={permission.id}>
                      {listRolePermissions.includes(permission.codename) ? (
                        <Form.Check
                          type="switch"
                          name="permissions[]"
                          defaultChecked
                          id={permission.codename}
                          label={permission.name}
                          value={permission.id}
                        />
                      ) : (
                        <Form.Check
                          type="switch"
                          name="permissions[]"
                          id={permission.codename}
                          label={permission.name}
                          value={permission.id}
                        />
                      )}
                    </div>
                  ))
                : ""}
                <br/>
              <Button variant="primary" type="submit">
                Update
              </Button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Roles;
