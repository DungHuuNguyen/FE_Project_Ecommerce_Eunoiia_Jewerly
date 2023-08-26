import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  actFetchAllProducts,
  setSearchKey,
} from "../../redux/features/product/productSlice";
import "./style.scss";

const SideBar = () => {
  const dispatch = useDispatch();
  const { pagination, params, searchKey } = useSelector(
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
  };
  // console.log(searchKey, "searchKey in side bar");

  return (
    <div className="side-bar-wrapper">
      <div className="side-bar-container">
        <ul className="side-bar">
          <li className="side-bar__item">
            <Link className="side-bar__item-title">Best Seller</Link>
          </li>
          <li className="side-bar__item" onClick={handleFilterRingsProduct}>
            <Link
              className="side-bar__item-title"
              to={"/Products?brands=Rings"}
            >
              Rings
            </Link>
          </li>
          <li className="side-bar__item" onClick={handleFilterEarringProduct}>
            <Link
              className="side-bar__item-title"
              to={"/Products?brands=Earring"}
            >
              Earrings
            </Link>
          </li>
          <li className="side-bar__item" onClick={handleFilterNecklacesProduct}>
            <Link
              className="side-bar__item-title"
              to={"/Products?brands=Necklaces"}
            >
              Necklaces
            </Link>
          </li>
          <li className="side-bar__item" onClick={handleFilterBraceletsProduct}>
            <Link
              className="side-bar__item-title"
              to={"/Products?brands=Bracelets"}
            >
              Bracelets
            </Link>
          </li>
          <li className="side-bar__item">
            <Link className="side-bar__item-title">Wedding</Link>
          </li>
          <li className="side-bar__item">
            <Link className="side-bar__item-title">GIA Diamonds</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
