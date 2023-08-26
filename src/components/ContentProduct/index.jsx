import React from "react";
import SideBar from "../SideBar";
import ListProductCard from "../ListProductCard";
import { Breadcrumb } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { ROUTES } from "../../constants/routes";
import { Link } from "react-router-dom";
import "./style.scss";

const ContentProduct = () => {
  return (
    <div className="content-product-all-wrapper">
      <div className="content-product-all-container">
        <div className="content-product-all-container__breadcrumb">
          <Breadcrumb
            items={[
              {
                title: (
                  <>
                    <HomeOutlined />
                    <Link to={ROUTES.HOME_PAGE}>Home</Link>
                  </>
                ),
              },
              {
                title: (
                  <>
                    <UserOutlined />
                    <Link to={ROUTES.PRODUCT_PAGE}>Product</Link>
                  </>
                ),
              },
              {
                title: "Products",
              },
            ]}
          />
        </div>
        <div className="content-product-all-container__description">
          <h3>Shop</h3>
          <p>
            Our Products Are Made From Solid Gold 14K and 18K With Natural
            Diamond and Gemstone
          </p>
        </div>
        <div className="content-product-container">
          <div className="content-product-container__side-bar">
            <SideBar />
          </div>
          <div className="content-product-container__product-content">
            <ListProductCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentProduct;
