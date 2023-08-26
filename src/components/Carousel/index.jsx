import { Carousel } from "antd";
import React from "react";
import "./style.scss";

const CarouselComponent = () => {
  return (
    <div className="carousel-container">
      <Carousel
        className="carousel"
        autoplay
        effect="fade"
        waitForAnimate="true"
      >
        <div className="carousel__item">
          <img
            className="carousel__item1"
            src="https://eunoiajewelry.com/wp-content/uploads/2022/05/EUN_047-scaled.jpg"
            alt=""
          />
        </div>

        <div className="carousel__item">
          <img
            className="carousel__item2"
            src="https://eunoiajewelry.com/wp-content/uploads/2023/07/19-1024x683.jpg"
            alt=""
          />
        </div>

        <div className="carousel__item">
          <img
            className="carousel__item3"
            src="https://eunoiajewelry.com/wp-content/uploads/2022/04/Mat-Day-Chuyen-Vang-Tron-Don-Gian_1-768x768.jpg"
            alt=""
          />
        </div>

        <div className="carousel__item">
          <img
            className="carousel__item4"
            src="https://eunoiajewelry.com/wp-content/uploads/2022/10/Artboard-2.12.png"
            alt=""
          />
        </div>

        <div className="carousel__item">
          <img
            className="carousel__item5"
            src="https://eunoiajewelry.com/wp-content/uploads/2022/05/EUN_047-scaled.jpg"
            alt=""
          />
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
