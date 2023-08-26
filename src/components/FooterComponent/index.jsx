import {
  TwitterOutlined,
  InstagramOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import { Col, Input, Row } from "antd";
import React from "react";
import "./style.scss";

const FooterComponent = () => {
  return (
    <div className="footer-wrapper">
      <Row className="footer-container">
        <Col className="footer-item" xs={24} sm={12} md={6}>
          <div className="footer-item__title">
            <h3>HELP</h3>
          </div>
          <div className="footer-item__description-grp">
            <p className="footer-item__description">Shipping</p>
            <p className="footer-item__description">Product and Material</p>
            <p className="footer-item__description">Payment</p>
            <p className="footer-item__description">All FAQ</p>
          </div>
        </Col>

        <Col className="footer-item" xs={24} sm={12} md={6}>
          <div className="footer-item__title">
            <h3>STORE & SERVICE</h3>
          </div>
          <div className="footer-item__description-grp">
            <p className="footer-item__description">Store</p>
            <p className="footer-item__description">About Us</p>
            <p className="footer-item__description">Warranty and Return</p>
          </div>
        </Col>

        <Col className="footer-item" xs={24} sm={12} md={6}>
          <div className="footer-item__title">
            <h3>RESOURCES</h3>
          </div>
          <div className="footer-item__description-grp">
            <p className="footer-item__description">Jewelry Care</p>
            <p className="footer-item__description">Ring Sizer</p>
          </div>
        </Col>

        <Col className="footer-item" xs={24} sm={12} md={6}>
          <div className="footer-item__top">
            <div className="footer-item__title">
              <h3>ABOUT US</h3>
            </div>
            <div className="footer-item__description-grp">
              <p className="footer-item__description">
                At Eunoia Fine Jewelry, we create sparkling jewelry <br /> that
                brings women closer to timeless beauty, as well <br /> as the
                desire to bring eternity in each design.
              </p>
              <p className="footer-item__description">
                Insider info on our news
              </p>
            </div>
          </div>

          <div className="footer-item__bottom">
            <Input placeholder="Email Address" />
            <FacebookOutlined />
            <InstagramOutlined />
            <TwitterOutlined />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default FooterComponent;
