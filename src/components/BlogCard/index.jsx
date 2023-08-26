import React from "react";
import "./style.scss";

const BlogCard = () => {
  return (
    <div className="blog-card-wrapper">
      <div className="blog-card-container">
        <div className="blog-card">
          <div className="blog-card__img">
            <img
              src="https://eunoiajewelry.com/wp-content/uploads/2022/06/EUN_01.png"
              alt=""
            />
          </div>
          <div className="blog-card__content">
            <div className="blog-card__title">
              <h3>MOM AND ME COLLECTION</h3>
            </div>
            <div className="blog-card__date">
              <span>June 24, 2022</span>
            </div>
            <div className="blog-card__description">
              <p>
                Mom-me là bộ dây chuyền vàng dành cho mẹ-con với hai sản phẩm là
                Full Moon Necklace và Half Moon Diamond Necklace. Ấp ủ từ những
                điều đẹp nhất của tình mẫu tử, Eunoia chọn hình ảnh mặt trăng
                luôn soi rọi trong bóng tối để tạo nên bộ dây chuyền Mom-me. Bộ
                dây chuyền
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
