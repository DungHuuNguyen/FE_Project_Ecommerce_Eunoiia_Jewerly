import React from "react";
import HeaderComponent from "../../components/Header";
import FooterComponent from "../../components/FooterComponent";
import { Outlet } from "react-router-dom";
import "./style.scss";

const MainLayout = () => {
  return (
    <div className="main-layout-container">
      <div className="main-layout-container__header">
        <HeaderComponent />
      </div>
      <div className="main-layout-container__content">
        <Outlet />
      </div>
      <div className="main-layout-container__footer">
        <FooterComponent />
      </div>
    </div>
  );
};

export default MainLayout;
