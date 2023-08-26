import React, { useEffect } from "react";
import ProductCard from "../ProductCard";
import { Col, Pagination, Row, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  actFetchAllProducts,
  filterReducer,
  setNewPage,
} from "../../redux/features/product/productSlice";
import SpinFC from "antd/es/spin";
import "./style.scss";

const ListProductCard = () => {
  const dispatch = useDispatch();
  const { isLoading, products, pagination, searchKey, params } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    // truyền thêm params pagination
    dispatch(
      actFetchAllProducts({
        _page: 1,
        _limit: pagination.limitPerPage,
        q: params.search,
        // brands: params.brands,
        // search: params.search,
        ...params,
      })
    );
    return () => {
      dispatch(setNewPage(1));
    };
    // eslint-disable-next-line
  }, []);

  const handleChangePage = (newPage) => {
    dispatch(setNewPage(newPage));
    dispatch(
      actFetchAllProducts({
        _page: newPage,
        _limit: pagination.limitPerPage,
        q: searchKey,
        ...params,
      })
    );
  };

  useEffect(() => {
    dispatch(
      actFetchAllProducts({
        _page: 1,
        _limit: pagination.limitPerPage,
        q: searchKey,
        ...params,
      })
    );
    // eslint-disable-next-line
  }, [searchKey]);

  // filter sp
  const handleFilterChange = async (valueFilter) => {
    dispatch(filterReducer(valueFilter));
    // dispatch(
    //   actFetchAllProducts({
    //     _page: 1,
    //     _limit: pagination.limitPerPage,
    //     q: searchKey,
    //     ...params,
    //   })
    // );
  };

  const { filter } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(
      actFetchAllProducts({
        _page: 1,
        _limit: pagination.limitPerPage,
        q: searchKey,
        ...params,
      })
    );
    // eslint-disable-next-line
  }, [filter]);

  if (isLoading) {
    return <SpinFC />;
  }

  const renderProducts = (products) => {
    return products.map((product) => {
      return (
        <Col key={product.id} xs={12} sm={8} md={6}>
          <ProductCard product={product} />
        </Col>
      );
    });
  };

  return (
    <div className="list-product">
      <div className="list-product__filter-grp">
        <Select
          defaultValue="Filter Price:"
          style={{
            width: 188,
          }}
          onChange={handleFilterChange}
          options={[
            {
              value: "less than 1.500.000đ",
              label: "less than 1.500.000đ",
            },
            {
              value: "1.500.000đ - 5.000.000đ",
              label: "1.500.000đ - 5.000.000đ",
            },
            {
              value: "5.000.000đ - 10.000.000đ",
              label: "5.000.000đ - 10.000.000đ",
            },
            {
              value: "greater than 10.000.000đ",
              label: "greater than 10.000.000đ",
            },
          ]}
        />

        <Select
          defaultValue="Sort by:"
          style={{
            width: 150,
          }}
          onChange={handleFilterChange}
          options={[
            {
              value: "Name: A-Z",
              label: "Name: A-Z",
            },
            {
              value: "Name: Z-A",
              label: "Name: Z-A",
            },
            {
              value: "Price: Low to High",
              label: "Price: Low to High",
            },
            {
              value: "Price: High to Low",
              label: "Price: High to Low",
            },
          ]}
        />
      </div>
      <div className="list-product__items">
        <Row gutter={16}>{renderProducts(products)}</Row>
      </div>
      <div className="list-product__pagination">
        <Pagination
          pageSize={pagination.limitPerPage}
          current={pagination.currentPage}
          total={pagination.total}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
};

export default ListProductCard;
