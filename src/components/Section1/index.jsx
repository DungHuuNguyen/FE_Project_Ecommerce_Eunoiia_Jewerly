import React from "react";
import "./style.scss";

const Section1 = () => {
  return (
    <div className="section1-wrapper">
      <div className="section1">
        <div className="section1__grp1">
          <div className="section1__rings">
            {/* <img
              src="https://eunoiajewelry.com/wp-content/uploads/2022/03/Nhan-Vang-Tron-Don-Gian_1.jpg"
              alt=""
            /> */}
            <p>Rings</p>
          </div>
          <div className="section1__earrings">
            <img
              src="https://eunoiajewelry.com/wp-content/uploads/2022/05/Khuyen-Tai-Vang-Tron-Don-Gian_2-scaled.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="section1__grp2">
          <div className="section1__bracelets">
            <img
              src="https://eunoiajewelry.com/wp-content/uploads/2023/03/Lac-Tay-Vang-Tron-Don-Gian_2-1-scaled.jpg"
              alt=""
            />
          </div>
          <div className="section1__necklaces">
            <img
              src="https://eunoiajewelry.com/wp-content/uploads/2022/01/Day-Chuyen-Vang-Dinh-Kim-Cuong_1-2.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1;
