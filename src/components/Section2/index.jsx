import React from "react";
import { Button, Col, Row } from "antd";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const Section2 = () => {
  const navigate = useNavigate();

  const handleRedirectToProductPage = () => {
    navigate(ROUTES.PRODUCT_PAGE);
  };

  return (
    <div className="section2-wrapper">
      <Row className="section2-container">
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <div className="section2-left">
            <h3 className="section2-left__title">WEDDING</h3>
            <p className="section2-left__description">
              Tại Eunoia Fine Jewelry, chúng tôi tạo ra những món đồ trang sức
              lấp lánh, đưa phụ nữ đến gần hơn với vẻ đẹp vượt thời gian, cũng
              như mong muốn mang đến sự trường tồn trong từng thiết kế.
            </p>
            <div className="section2-left__btn-show">
              <Button onClick={handleRedirectToProductPage}>Shop Now</Button>
            </div>
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <div className="section2-right">
            <img
              className="section2-right__img"
              src="https://eunoiajewelry.com/wp-content/uploads/2022/05/Nhan-Cuoi-Vang-Dinh-Kim-Cuong_2-scaled.jpg"
              alt=""
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Section2;
