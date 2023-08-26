import React from "react";
import BlogCard from "../BlogCard";
import { Col, Row } from "antd";
import "./style.scss";

const BlogCardList = () => {
  return (
    <div className="blog-card-list-wrapper">
      <div className="blog-card-list-container">
        <Row className="blog-card-list">
          <Col className="blog-card-list__blogs" xs={24} sm={24} md={16}>
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </Col>

          <Col className="blog-card-list__img-grp" xs={0} sm={0} md={8}>
            <div className="blog-card-list__img1">
              <img
                src="https://eunoiajewelry.com/wp-content/uploads/2021/07/DSC06646-2.jpg"
                alt=""
              />
            </div>
            <div className="blog-card-list__img2">
              <img
                src="https://eunoiajewelry.com/wp-content/uploads/2021/07/DSC06666-2.jpg"
                alt=""
              />
            </div>
            <div className="blog-card-list__img3">
              <img
                src="https://eunoiajewelry.com/wp-content/uploads/2021/07/DSC06646-2.jpg"
                alt=""
              />
            </div>
            <div className="blog-card-list__img4">
              <img
                src="https://eunoiajewelry.com/wp-content/uploads/2021/07/DSC06666-2.jpg"
                alt=""
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default BlogCardList;
