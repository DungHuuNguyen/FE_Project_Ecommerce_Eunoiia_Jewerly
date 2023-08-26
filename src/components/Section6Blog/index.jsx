import React from "react";
import "./style.scss";
import { Col, Row } from "antd";

const Section6Blog = () => {
  return (
    <div className="section6-blog-wrapper">
      <div className="section6-blog-container">
        <div className="section6-blog-container__title">
          <h3>Blog</h3>
        </div>
        <div className="section6-blog-container__item-list-wrapper">
          <div className="section6-blog-container__item-list-container">
            <Row
              className="section6-blog-container__item-list"
              gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}
            >
              <Col
                className="section6-blog-container__item"
                xs={12}
                sm={12}
                md={12}
                lg={6}
              >
                <img
                  src="https://eunoiajewelry.com/wp-content/uploads/2023/07/EUN_2-1-1024x1024.jpg"
                  alt=""
                />
                <span className="section6-container__item-description">
                  Thông tin bạn nên biết về kim cương màu vàng
                </span>
              </Col>

              <Col
                className="section6-blog-container__item"
                xs={12}
                sm={12}
                md={12}
                lg={6}
              >
                <img
                  src="https://eunoiajewelry.com/wp-content/uploads/2023/07/df1e416ca6ae548162257cb0a6c37da1.jpg"
                  alt=""
                />
                <span className="section6-container__item-description">
                  Ý nghĩa nhẫn cầu hôn và nhẫn cưới mà bạn chưa biết
                </span>
              </Col>

              <Col
                className="section6-blog-container__item"
                xs={12}
                sm={12}
                md={12}
                lg={6}
              >
                <img
                  src="https://eunoiajewelry.com/wp-content/uploads/2023/07/19-1024x683.jpg"
                  alt=""
                />
                <span className="section6-container__item-description">
                  Viên kim cương đạt chất lượng là viên kim cương như thế nào?
                </span>
              </Col>

              <Col
                className="section6-blog-container__item"
                xs={12}
                sm={12}
                md={12}
                lg={6}
              >
                <img
                  src="https://eunoiajewelry.com/wp-content/uploads/2023/06/84d664bfd30ebdfd00dcd69b6dbf2300.jpeg"
                  alt=""
                />
                <span className="section6-container__item-description">
                  Tặng quà cưới cho người thân sao cho đặc biệt
                </span>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section6Blog;
