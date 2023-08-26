import React from "react";
import "./style.scss";
import { generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const ProductCard = (props) => {
  const navigate = useNavigate();
  const { id, imgURL, name, typeJewelry, price } = props.product;

  const formatNumber = (num) => {
    let numString = "";
    while (num > 0) {
      let div = num % 1000;
      num = Math.floor(num / 1000);
      if (num !== 0) {
        if (div < 10) {
          div = "00" + div;
        } else if (div < 100) {
          div = "0" + div;
        }
        numString = "." + div + numString;
      } else {
        numString = div + numString;
      }
    }
    return numString;
  };

  const handleRedirectToDetailProductPage = () => {
    console.log(id);
    navigate(generatePath(ROUTES.DETAIL_PRODUCT_PAGE, { productId: id }));
  };

  // console.log(typeof formatNumber(price));

  return (
    <div className="product-card-wrapper">
      <div className="product-card">
        <div className="product-card__img">
          <img src={imgURL} alt={name} />
        </div>
        <div
          className="product-card__name"
          onClick={handleRedirectToDetailProductPage}
        >
          <p>{name}</p>
        </div>
        <div className="product-card__type-jewelry">
          <p>{typeJewelry}</p>
        </div>
        <div className="product-card__price">
          <p>{formatNumber(price)}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
