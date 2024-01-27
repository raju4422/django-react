import {
  Row,
  Col,
  Container,
  Form,
  Button,
  Card,
  Image,
  ListGroup,
} from "react-bootstrap";
import {
  axiosPost,
  successMsg,
  axiosGet,
  loadBlogImages,
  load_images,
  axiosDelete
} from "../../helpers/Master_helper";
import { useForm, Controller } from "react-hook-form";
import { React, useEffect, useState } from "react";
import "../../assets/css/trident_images.css";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";


function TridentImages() {
  const [listImages, setListImages] = useState([]);
  const [loadImages, setLoadImages] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [allLinks, setAllLinks] = useState([]);
  // const [currentPage, setCurrentPage] = useState(0);
  // const [pageSize, setPageSize] = useState(0);
  // const [page, setPage] = useState(0);
  // const [records, setRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [limit, setLimit] = useState(10);

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchImages();
    setLoadImages(false);
  }, [loadImages,currentPage]);

  function uploadImages(data) {
    const url = "http://127.0.0.1:8000/api/images/";
    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("alt_text", data.alt_text);
    axiosPost(url, formData, function (response) {
      reset();
      setLoadImages(true);
      successMsg(response.msg);
    });
  }
  var all_links = [];
  const fetchImages = () => {
    all_links = [];
    var url = "";
    // if (page > 0) {
      url = `http://127.0.0.1:8000/api/images/?limit=${limit}&offset=${(currentPage - 1) * limit}`;
    // } else {
    //   url = "http://127.0.0.1:8000/api/images/";
    // }
    axiosGet(url, function (response) {
      setListImages(response.data);
      setTotalPages(response.total_pages);
      setTotalCount(response?.pagination?.count);

      // setRecords(response.count);
      // setPageSize(response.page_size);
    });
  };

  const deleteImage = (id) => {
    Swal.fire({
      title: "Do You Really Want To Delete Blog?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        const url = "http://127.0.0.1:8000/api/images/"+id+"/";
        axiosDelete(url, {id:id},function (response) {
          setLoadImages(true);
          successMsg(response.msg);
        });
      }
    });
  };


  return (
    <div className="pt-3 pb-2 mb-3">
      <h1 className="h2">Trident Images</h1>
      <hr />
      <Container fluid>
        <Row>
          <Col md={9} className="border-end">
            <Row>
              {listImages.map((image) => (
                <Col md={3} key={image.id} className="pb-3">
                  <Card>
                    <Card.Img
                      variant="top"
                      className="listImages-image"
                      src={load_images(image.image)}
                    />
                    <Card.Body>
                      <Card.Text>{image.alt_text}</Card.Text>
                      <div className="img_actions d-flex">
                      <i
                        className="blog_action_icons bi bi-trash3-fill"  onClick={()=>deleteImage(image.id)}
                      ></i>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
                <div className="text-end">
                  <span>
                    Page {currentPage} of {Math.ceil(totalCount / limit)}
                  </span>{" "}
                  &nbsp;&nbsp;
                  <button
                    className="btn btn-outline-primary"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    <i className="bi bi-box-arrow-in-left"></i>
                  </button>{" "}
                  &nbsp;
                  <button
                    className="btn btn-outline-primary"
                    disabled={currentPage * limit >= totalCount}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    <i className="bi bi-box-arrow-in-right"></i>
                  </button>
                </div>
            </Row>
          </Col>
          <Col md={3}>
            <Form onSubmit={handleSubmit(uploadImages)}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Default file input example</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  {...register("image", {
                    required: "Image is required",
                  })}
                />
                {errors.image && (
                  <p className="errorMsg">{errors.image.message}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPlaintextEmail">
                <Form.Label>Alternate Text</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Alt Text"
                  name="alt_text"
                  {...register("alt_text", {
                    required: "Alt Text is required",
                  })}
                />
                {errors.alt_text && (
                  <p className="errorMsg">{errors.alt_text.message}</p>
                )}
              </Form.Group>
              <div className="d-grid gap-2">
                <Button variant="primary" type="submit" size="lg">
                  Upload
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default TridentImages;
