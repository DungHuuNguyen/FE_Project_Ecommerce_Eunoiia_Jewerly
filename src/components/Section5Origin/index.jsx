import { Button } from "antd";
import React from "react";
import "./style.scss";

const Section5Origin = () => {
  return (
    <div className="section5-origin-wrapper">
      <div className="section5-origin-container">
        <div className="section5-origin-container__title">
          <h3>TRANG SỨC THỦ CÔNG VIỆT CÓ NGUỒN GỐC</h3>
        </div>
        <div className="section5-origin-container__description">
          <p>
            Eunoia Jewelry chuyên cung cấp trang sức từ vàng, kim cương và các
            loại đá quý. Trang sức thiết kế giao thoa giữa truyền thống và hiện
            đại, nhiều kiểu dáng. Đặc biệt, chúng tôi có sản phẩm từ kim cương
            GIA uy tín tại Việt Nam.
          </p>
          <p>&nbsp;</p>
          <p>
            Ngoài các sản phẩm có sẵn tại cửa hàng, Eunoia Jewelry còn có dịch
            vụ chế tác trang sức theo yêu cầu của khách hàng.
          </p>
        </div>
        <div className="section5-origin-container__btn">
          <Button>Xem thêm</Button>
        </div>
      </div>
    </div>
  );
};

export default Section5Origin;
