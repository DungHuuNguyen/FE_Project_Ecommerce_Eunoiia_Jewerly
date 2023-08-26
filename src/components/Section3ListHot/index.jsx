import React from "react";
import { Button, Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import "./style.scss";

const Section3ListHot = () => {
  const navigate = useNavigate();

  const handleRedirectProductPage = () => {
    navigate(ROUTES.PRODUCT_PAGE);
  };

  return (
    <div className="section3-list-hot-container">
      <div className="section3-list-hot-container__product-hot-grp">
        <Row className="section3-list-hot-container__list-product">
          <Col
            className="section3-list-hot-container__product"
            xs={12}
            sm={12}
            md={8}
            lg={6}
            xl={6}
          >
            <img
              src="https://eunoiajewelry.com/wp-content/uploads/2023/08/DSC08158.2-768x768.jpg"
              alt=""
            />
            <p className="section3-list-hot-container__product-name">
              The Earth Pendant
            </p>
            <p className="section3-list-hot-container__product-price">
              8.530.000
            </p>
          </Col>

          <Col
            className="section3-list-hot-container__product"
            xs={12}
            sm={12}
            md={8}
            lg={6}
            xl={6}
          >
            <img
              src="https://eunoiajewelry.com/wp-content/uploads/2023/04/Day-Chuyen-Vang-Tron-Don-Gian_1-768x768.jpg"
              alt=""
            />
            <p className="section3-list-hot-container__product-name">
              Trinity Pendant
            </p>
            <p className="section3-list-hot-container__product-price">
              59.690.000
            </p>
          </Col>

          <Col
            className="section3-list-hot-container__product"
            xs={12}
            sm={12}
            md={8}
            lg={6}
            xl={6}
          >
            <img
              src="https://eunoiajewelry.com/wp-content/uploads/2023/04/Khuyen-Tai-Vang-Dinh-Kim-Cuong_1-3-768x768.jpg"
              alt=""
            />
            <p className="section3-list-hot-container__product-name">
              Cushion Halo Diamond Earring
            </p>
            <p className="section3-list-hot-container__product-price">
              41.000.000
            </p>
          </Col>

          <Col
            className="section3-list-hot-container__product"
            xs={12}
            sm={12}
            md={8}
            lg={6}
            xl={6}
          >
            <img
              src="https://eunoiajewelry.com/wp-content/uploads/2023/01/Lac-Tay-Don-Gian_2-768x768.jpg"
              alt=""
            />
            <p className="section3-list-hot-container__product-name">
              Cat Bracelet
            </p>
            <p className="section3-list-hot-container__product-price">
              1.455.000
            </p>
          </Col>
        </Row>
      </div>
      <div className="section3-list-hot-container__btn-shopping">
        <Button onClick={handleRedirectProductPage}>Shop Now</Button>
      </div>
    </div>
  );
};

export default Section3ListHot;
