import { Nav } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Row, Col, Image } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import {
  axiosPost,
  base_url,
  loadBlogImages,
  limitBlogDescription,
} from "../helpers/Master_helper";

//css
import "../assets/css/recent_popular.css";

function RecentPopular() {
  const [reqType, setReqType] = useState("recent");
  const [activeClass, setActiveClass] = useState("recent");

  const [recentRecords, setRecentRecord] = useState([]);
  const [popularRecords, setPopulaRecord] = useState([]);

  useEffect(() => {
    loadData();
  }, [reqType]);

  function loadData() {
    axiosPost(
      base_url + "blog/get_recent_popular_blogs/",
      { req_type: reqType },
      function (res) {
        if (reqType == "recent") {
          setRecentRecord(res.data);
        } else if (reqType == "popular") {
          setPopulaRecord(res.data);
        }
        setActiveClass(reqType)
      }
    );
  }

  const listRecentBlogView = (data) => {
    return (
      <div key={data.id}>
        <Row>
          <Col sm={4}>
            <Image
              className="list-recent-blog-image" 
              src={loadBlogImages(data.image)}
              fluid
            />
          </Col>
          <Col sm={8}>
            <h5>
              <NavLink
                className="list-blog-title-link"
                to={data.slug + ".html"}
              >
                {data.title}
              </NavLink>
            </h5>
            <div><span><i className="bi bi-person"></i> {data.user.last_name}.{data.user.first_name} &nbsp; </span><i className="bi bi-calendar"></i> &nbsp;{data.created_at}</div>
          </Col>
        </Row>
        <hr />
      </div>
    );
  };

  return (
    <div className="recent-latest-container">
      <Nav variant="pills" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link onClick={()=>setReqType('recent')}  className={ activeClass === 'recent' ? 'active' : ''}  >Recent</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>setReqType('popular')} className={ activeClass === 'popular' ? 'active' : ''} >Popular</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>setReqType('comments')} className={ activeClass === 'comments' ? 'active' : ''} >Comments</Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="recent-latest-result-container pt-3">
        {recentRecords.map((blog) => listRecentBlogView(blog))}
      </div>
    </div>
  );
}

export default RecentPopular;
