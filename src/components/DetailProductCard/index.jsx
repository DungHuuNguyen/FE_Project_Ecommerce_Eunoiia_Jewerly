import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Input,
  InputNumber,
  Pagination,
  Rate,
  Row,
  Select,
} from "antd";
import { CarOutlined, SafetyCertificateOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import {
  actFetchAllImgsProducts,
  actFetchAllProducts,
  actFetchProductById,
} from "../../redux/features/product/productSlice";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { actAddProductToCarts } from "../../redux/features/cart/cartSlice";
import { makeRandomId } from "../../utils/makeRandomId";
import {
  actAddComment,
  actFetchAllComments,
  actFetchAllCommentsCalcuStarAverage,
  setNewPage,
} from "../../redux/features/comment/commentSlice";
import { actFetchUserById } from "../../redux/features/user/userSlice";
import dayjs from "dayjs";
import "./style.scss";
import { ROUTES } from "../../constants/routes";

const schema = Yup.object().shape({
  color: Yup.string().required("Please choose color"),
  material: Yup.string().required("Please choose material"),
});
const schemaBoxReview = Yup.object().shape({
  star: Yup.string().required("Please choose start"),
});

const DetailProductCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { productInfo } = useSelector((state) => state.product);
  const { imgURL, color, material, name, brands, id } = productInfo;
  const { imgsProducts } = useSelector((state) => state.product);
  const { userInfo } = useSelector((state) => state.user);
  const { fullName, user, phoneNumber, email, avatarURL } = userInfo;
  const { comments } = useSelector((state) => state.comment);
  const { commentsCalcuStarAverage } = useSelector((state) => state.comment);
  const { pagination } = useSelector((state) => state.comment);
  const isLogin = JSON.parse(localStorage.getItem("isLogin"));
  const { products } = useSelector((state) => state.product);

  const [quantityProduct, setQuantityProduct] = useState(1);
  const [isShowBoxReview, setIsShowBoxReview] = useState(false);

  const methods = useForm({
    defaultValues: {
      color: "",
      material: "",
    },
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const {
    handleSubmit: handleSubmitBoxReview,
    control: controlBoxReview,
    formState: { errors: errorsBoxReview },
  } = useForm({
    defaultValues: {
      star: "",
      comment: "",
    },
    resolver: yupResolver(schemaBoxReview),
  });

  const imgsProduct = imgsProducts.find(
    (item) => item.id === productInfo.imgProductId
  );
  const [largeImg, setLargeImg] = useState(imgsProduct?.imgProduct1);
  const handleChangeImg = (imgPath) => {
    setLargeImg(imgPath);
  };

  useEffect(() => {
    setLargeImg(imgsProduct?.imgProduct1);
  }, [imgsProduct]);

  useEffect(() => {
    dispatch(actFetchProductById(params.productId));
    dispatch(actFetchUserById(userInfo.id));
    dispatch(actFetchAllImgsProducts());

    dispatch(
      actFetchAllComments({
        _page: 1,
        _limit: pagination.limitPerPage,
        ...params,
      })
    );
    dispatch(actFetchAllCommentsCalcuStarAverage(params));
    // eslint-disable-next-line
  }, []);

  useEffect(
    () => {
      dispatch(
        actFetchAllProducts({
          ...params,
          _sort: "star",
          _order: "asc",
          brands: productInfo.brands,
        })
      );
    },
    // eslint-disable-next-line
    /*..*/
    [productInfo.brands]
  );
  // const productsListRelated = products; //viết như này sẽ lỗi, phải clone ra
  const productsClone = [...products];
  const indexThisProduct = productsClone.findIndex((product) => {
    return parseFloat(params.productId) === product.id;
  });
  productsClone.splice(indexThisProduct, 1);
  const relatedProductList = productsClone.slice(0, 4);

  const onValid = (formValueOrder) => {
    dispatch(
      actAddProductToCarts({
        ...productInfo,
        ...formValueOrder,
        quantity: quantityProduct,
        idProduct: productInfo.id,
        id: makeRandomId(),
      })
    );
  };

  const onValidBoxReview = (formValueBoxReview) => {
    const valueCommentBox = {
      ...formValueBoxReview,
      nameProduct: name,
      idProduct: id,
      brands,
      fullName,
      userName: user,
      phoneNumber,
      email,
      avatarURL,
      dateComment: dayjs(new Date()).format("DD/MM/YYYY"),
    };
    // console.log(productInfo, "productInfo");

    if (isLogin) {
      console.log(valueCommentBox, "valueCommentBox");
      dispatch(actAddComment(valueCommentBox));
    } else {
      alert("You must be logged in to comment! ");
      navigate(ROUTES.LOGIN_PAGE);
    }
    setIsShowBoxReview(!isShowBoxReview);
  };

  // để gọi ra comments đúng với sp đc comments
  // chú ý truyền vô params cái id là id của sp => fil ra
  useEffect(() => {
    dispatch(
      actFetchAllComments({
        ...params,
        _page: 1,
        _limit: pagination.limitPerPage,
        idProduct: params.productId,
      })
    );
    dispatch(
      actFetchAllCommentsCalcuStarAverage({
        ...params,
        idProduct: params.productId,
      })
    );
    // eslint-disable-next-line
    /* Add comment */
  }, [params.productId]);

  let sumStar = 0;
  let result = 0;
  commentsCalcuStarAverage.forEach((comment) => {
    sumStar += parseFloat(comment?.star);
    result = Math.round(sumStar / commentsCalcuStarAverage.length);
    return result;
  });

  // useEffect(() => {
  //   const productUpdate = {
  //     ...productInfo,
  //     star: result,
  //   };
  //   dispatch(actUpdateProductById({ id: params.productId, productUpdate }));
  //   // eslint-disable-next-line
  // }, [result]);

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

  const onChangeQuantityProduct = (value) => {
    setQuantityProduct(value);
  };

  const handleToggleBoxReview = () => {
    setIsShowBoxReview(!isShowBoxReview);
  };

  const handleChangePage = (newPage) => {
    dispatch(setNewPage(newPage));
    dispatch(
      actFetchAllComments({
        _page: newPage,
        _limit: pagination.limitPerPage,
        idProduct: params.productId,
        ...params,
      })
    );
  };

  // };

  const renderComments = (comments) => {
    return comments.map((comment) => {
      return (
        <div
          key={comment.id}
          className="detail-product-card-comment__review--item"
        >
          <div className="detail-product-card-comment__review--avatar-user">
            <img src={comment?.avatarURL} alt="" />
          </div>
          <div className="detail-product-card-comment__review--grp-right">
            <div className="detail-product-card-comment__review--user-name">
              <p>{comment?.fullName}</p>
            </div>
            <div className="detail-product-card-comment__review--star">
              <Rate value={comment?.star} />
            </div>
            <div className="detail-product-card-comment__review--comment">
              <p>{comment?.comment}</p>
            </div>
            <div className="detail-product-card-comment__review--date-comment">
              <p>Ngày: {comment?.dateComment}</p>
            </div>
          </div>
        </div>
      );
    });
  };

  const renderRelatedProductList = (relatedProductList) => {
    return relatedProductList.map((product) => {
      return (
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={6}
          xl={6}
          className="detail-product-card-bottom__related-products-grp-item"
        >
          <img
            className="detail-product-card-bottom__related-products-grp-item--img"
            src={product.imgURL}
            alt=""
          />
          <div className="detail-product-card-bottom__related-products-grp-item--name">
            <p>{product?.name}</p>
          </div>
          <div className="detail-product-card-bottom__related-products-grp-item--price">
            <p>{formatNumber(product?.price)}</p>
          </div>
        </Col>
      );
    });
  };

  return (
    <div className="detail-product-card-wrapper">
      <div className="detail-product-card-container">
        <div className="detail-product-card-top-wrapper">
          <Row className="detail-product-card-top">
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={12}
              xl={12}
              className="detail-product-card-top__img-grp"
            >
              <div className="detail-product-card-top__large-img">
                <img src={largeImg ? largeImg : imgURL} alt="" />
              </div>
              <div className="detail-product-card-top__img-small-grp">
                {!!imgsProduct?.imgProduct1 && (
                  <img
                    src={imgsProduct?.imgProduct1}
                    alt=""
                    onClick={() => {
                      handleChangeImg(imgsProduct?.imgProduct1);
                    }}
                  />
                )}

                {!!imgsProduct?.imgProduct2 && (
                  <img
                    src={imgsProduct?.imgProduct2}
                    alt=""
                    onClick={() => {
                      handleChangeImg(imgsProduct?.imgProduct2);
                    }}
                  />
                )}

                {!!imgsProduct?.imgProduct3 && (
                  <img
                    src={imgsProduct?.imgProduct3}
                    alt=""
                    onClick={() => {
                      handleChangeImg(imgsProduct?.imgProduct3);
                    }}
                  />
                )}
              </div>
            </Col>

            <Col
              xs={24}
              sm={24}
              md={24}
              lg={12}
              xl={12}
              className="detail-product-card-top__information-product-grp"
            >
              <form
                onSubmit={handleSubmit(onValid)}
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="detail-product-card-top__product-name">
                  <h3>{productInfo.name}</h3>
                </div>
                <div className="detail-product-card-top__product-price">
                  <h3>{formatNumber(productInfo.price)}</h3>
                </div>
                <div className="detail-product-card-top__product-color">
                  <div className="detail-product-card-top__product-color-title">
                    <h5>Color:</h5>
                  </div>
                  <div className="detail-product-card-top__product-color-selected">
                    <Controller
                      control={control}
                      name="color"
                      render={({ field }) => {
                        return (
                          <Select
                            {...field}
                            style={{ width: "100%" }}
                            placeholder="Choose an color..."
                            allowClear
                            // onChange={handleChangeSelectBox}
                            options={[
                              {
                                value: `${color?.color1}`,
                                label: `${color?.color1}`,
                              },
                              {
                                value: `${color?.color2}`,
                                label: `${color?.color2}`,
                              },
                              {
                                value: `${color?.color3}`,
                                label: `${color?.color3}`,
                              },
                            ]}
                          />
                        );
                      }}
                    />
                    {!!errors.color?.message && (
                      <i style={{ color: "red", padding: "0px 10px" }}>
                        {errors.color?.message}
                      </i>
                    )}
                  </div>
                </div>
                <div className="detail-product-card-top__product-material">
                  <div className="detail-product-card-top__product-material-title">
                    <h5>Material:</h5>
                  </div>
                  <div className="detail-product-card__product-material-selected">
                    <Controller
                      control={control}
                      name="material"
                      render={({ field }) => {
                        return (
                          <Select
                            style={{ width: "100%" }}
                            {...field}
                            placeholder={"Choose an option..."}
                            allowClear
                            // onChange={handleChangeSelectBox}
                            options={[
                              {
                                value: `${material?.material1}`,
                                label: `${material?.material1}`,
                              },
                              {
                                value: `${material?.material2}`,
                                label: `${material?.material2}`,
                              },
                            ]}
                          />
                        );
                      }}
                    />
                    {!!errors.material?.message && (
                      <i style={{ color: "red", padding: "0px 10px" }}>
                        {errors.material?.message}
                      </i>
                    )}
                  </div>
                </div>
                <div className="detail-product-card-top__product-quantity-grp">
                  <div className="detail-product-card-top__quantity-title">
                    <p>Pre-Order</p>
                  </div>
                  <div className="detail-product-card-top__product-quantity-grp-bottom">
                    <div className="detail-product-card-top__product-quantity">
                      <Controller
                        control={control}
                        name="quantity"
                        render={({ field }) => {
                          return (
                            <InputNumber
                              {...field}
                              className="detail-product-card-top__product-quantity--number"
                              style={{ width: 62, borderRadius: 0 }}
                              min={1}
                              max={99}
                              defaultValue={1}
                              value={quantityProduct}
                              onChange={onChangeQuantityProduct}
                            />
                          );
                        }}
                      />
                    </div>
                    {!!errors.quantity?.message && (
                      <p style={{ color: "red" }}>{errors.quantity?.message}</p>
                    )}

                    <div className="detail-product-card-top__btn-add-cart">
                      <Button htmlType="submit">Add to cart</Button>
                    </div>
                  </div>
                </div>
              </form>

              <div className="detail-product-card-top__shipping-warranty-grp">
                <div className="detail-product-card-top__shipping">
                  <span>
                    <CarOutlined />
                  </span>
                  <p>Free Shipping</p>
                </div>

                <div className="detail-product-card-top__warranty-return">
                  <span>
                    <SafetyCertificateOutlined />
                  </span>
                  <p>Warranty & Return</p>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <div className="detail-product-card-bottom-wrapper">
          <Row className="detail-product-card-bottom">
            <div
              style={{ paddingLeft: 20, paddingRight: 20 }}
              className="detail-product-card-bottom__related-products-grp"
            >
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={24}
                className="detail-product-card-bottom__related-products-grp--title"
              >
                <h3>Related products</h3>
              </Col>

              <Row className="detail-product-card-bottom__related-products-grp-item-grp">
                {renderRelatedProductList(relatedProductList)}
              </Row>
            </div>
          </Row>
        </div>

        <div className="detail-product-card-comment-wrapper">
          <div className="detail-product-card-comment">
            <div className="detail-product-card-comment__name-product">
              <p>Reviews product: {productInfo.name}</p>
            </div>

            <div className="detail-product-card-comment__star-average">
              <div className="detail-product-card-comment__star-average--star">
                <div className="detail-product-card-comment__star-average--title-review">
                  <p>Star average:</p>
                </div>
                <div className="detail-product-card-comment__star-average--star-avg">
                  <Rate value={result} />
                </div>
                <div className="detail-product-card-comment__star-average--number-of-reviews">
                  <p>{commentsCalcuStarAverage?.length} reviews</p>
                </div>
              </div>
              <div className="detail-product-card-comment__star-average--grp-btn-open-review-box">
                <div className="detail-product-card-comment__star-average--question">
                  <p>Have you been used this product yet?</p>
                </div>
                <div className="detail-product-card-comment__star-average--btn">
                  <Button onClick={handleToggleBoxReview}>
                    Send your review
                  </Button>
                </div>
              </div>
            </div>

            <div
              className={`detail-product-card-comment__box-review-wrapper ${
                isShowBoxReview ? "detail-product-card-comment__show-box" : ""
              }`}
            >
              <form
                className="detail-product-card-comment__box-review"
                onSubmit={handleSubmitBoxReview(onValidBoxReview)}
              >
                <div className="detail-product-card-comment__box-review--img-product">
                  <img src={largeImg ? largeImg : imgURL} alt="" />
                </div>
                <div className="detail-product-card-comment__box-review--name-product">
                  <p>{productInfo.name}</p>
                </div>
                <div
                  className="detail-product-card-comment__box-review--your-rate"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Controller
                    control={controlBoxReview}
                    name="star"
                    render={({ field }) => {
                      return (
                        <Rate
                          style={{ display: "flex", justifyContent: "center" }}
                          {...field}
                        />
                      );
                    }}
                  />
                  {!!errorsBoxReview.star?.message && (
                    <p style={{ color: "red", padding: "0px 10px" }}>
                      {errorsBoxReview.star?.message}
                    </p>
                  )}
                </div>
                <div className="detail-product-card-comment__box-review--comment">
                  <Controller
                    control={controlBoxReview}
                    name="comment"
                    render={({ field }) => {
                      return (
                        <Input
                          placeholder="Please enter your review about this product..."
                          {...field}
                        />
                      );
                    }}
                  />
                </div>
                <div className="detail-product-card-comment__box-review--btn-done">
                  <Button htmlType="submit">Done</Button>
                </div>
              </form>
            </div>

            <div className="detail-product-card-comment__filter-star">
              <div className="detail-product-card-comment__filter-star--title">
                <p>Lọc xem theo:</p>
              </div>
              <div className="detail-product-card-comment__filter-star--item-grp">
                <div className="detail-product-card-comment__filter-star--item">
                  5 sao
                </div>
                <div className="detail-product-card-comment__filter-star--item">
                  4 sao
                </div>
                <div className="detail-product-card-comment__filter-star--item">
                  3 sao
                </div>
                <div className="detail-product-card-comment__filter-star--item">
                  2 sao
                </div>
                <div className="detail-product-card-comment__filter-star--item">
                  1 sao
                </div>
              </div>
            </div>

            <div className="detail-product-card-comment__reviews-grp">
              <div className="detail-product-card-comment__review">
                {renderComments(comments)}
              </div>
            </div>

            <div className="detail-product-card-comment__reviews-pagination">
              <Pagination
                pageSize={pagination.limitPerPage}
                current={pagination.currentPage}
                total={pagination.total}
                onChange={handleChangePage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProductCard;
