import React from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  actFetchAllProducts,
  setSearchKey,
} from "../../redux/features/product/productSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const Section4ListProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { params, searchKey, pagination } = useSelector(
    (state) => state.product
  );

  const handleFilterEarringProduct = () => {
    dispatch(setSearchKey("Earring"));
    dispatch(
      actFetchAllProducts({
        _page: 1,
        _limit: pagination.limitPerPage,
        q: searchKey,
        ...params,
      })
    );
    navigate(ROUTES.PRODUCT_PAGE);
  };
  const handleFilterRingsProduct = () => {
    dispatch(setSearchKey("Rings"));
    dispatch(
      actFetchAllProducts({
        _page: 1,
        _limit: pagination.limitPerPage,
        q: searchKey,
        ...params,
      })
    );
    navigate(ROUTES.PRODUCT_PAGE);
  };
  const handleFilterNecklacesProduct = () => {
    dispatch(setSearchKey("Necklaces"));
    dispatch(
      actFetchAllProducts({
        _page: 1,
        _limit: pagination.limitPerPage,
        q: searchKey,
        ...params,
      })
    );
    navigate(ROUTES.PRODUCT_PAGE);
  };
  const handleFilterBraceletsProduct = () => {
    dispatch(setSearchKey("Bracelets"));
    dispatch(
      actFetchAllProducts({
        _page: 1,
        _limit: pagination.limitPerPage,
        q: searchKey,
        ...params,
      })
    );
    navigate(ROUTES.PRODUCT_PAGE);
  };

  return (
    <div className="section4-list-product-wrapper">
      <div className="section4-list-product-container">
        <div className="section4-list-product-container__left">
          <div
            className="section4-list-product-container__item"
            onClick={handleFilterRingsProduct}
          >
            <span>Rings</span>
          </div>
          <div
            className="section4-list-product-container__item"
            onClick={handleFilterNecklacesProduct}
          >
            <span>Necklaces</span>
          </div>
        </div>
        <div className="section4-list-product-container__right">
          <div
            className="section4-list-product-container__item"
            onClick={handleFilterEarringProduct}
          >
            <span>Earrings</span>
          </div>
          <div
            className="section4-list-product-container__item"
            onClick={handleFilterBraceletsProduct}
          >
            <span>Bracelets </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section4ListProduct;
