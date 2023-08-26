import React from "react";
import CarouselComponent from "../Carousel";
import Section1 from "../Section1";
import Section2 from "../Section2";
import Section3ListHot from "../Section3ListHot";
import Section4ListProduct from "../Section4ListProduct";
import Section5Origin from "../Section5Origin";
import Section6Blog from "../Section6Blog";
import "./style.scss";

const ContentNormal = () => {
  return (
    <div className="content-normal-container">
      <CarouselComponent />
      <Section1 />
      <Section2 />
      <Section3ListHot />
      <Section4ListProduct />
      <Section5Origin />
      <Section6Blog />
    </div>
  );
};

export default ContentNormal;
