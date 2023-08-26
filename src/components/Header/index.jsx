import {
  CloseOutlined,
  DownOutlined,
  MenuOutlined,
  SearchOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Input } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/user/userSlice";
import {
  actFetchAllProducts,
  setNewPage,
  setSearchKey,
} from "../../redux/features/product/productSlice";
import "./style.scss";

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchKey, pagination, params } = useSelector(
    (state) => state.product
  );
  const { isLogin, userInfo } = useSelector((state) => state.user);
  const { carts } = useSelector((state) => state.cart);
  const [isToggle, setIsToggle] = useState(false);
  const [isShowSubNavProductMobile, setIsShowSubNavProductMobile] =
    useState(false);
  const [isShowSubNavGiftMobile, setIsShowSubNavGiftMobile] = useState(false);
  const [isShowSubNavBlogMobile, setIsShowSubNavBlogMobile] = useState(false);

  const items = [
    {
      key: "1",
      label: <Link to={ROUTES.LOGIN_PAGE}>Login</Link>,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: <Link to={ROUTES.REGISTER_PAGE}>Register</Link>,
    },
  ];
  const itemsLoginSuccess = [
    {
      key: "1",
      label: <Link to={ROUTES.USER_PROFILE_PAGE}>My Profile</Link>,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: <Link to={ROUTES.USER_CHANGE_PASSWORD_PAGE}>Change password</Link>,
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: (
        <Link to={ROUTES.USER_PURCHASE_HISTORY_PAGE}>Purchase History</Link>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "4",
      label: (
        <Button
          onClick={() => {
            dispatch(logout());
            navigate(ROUTES.HOME_PAGE);
          }}
        >
          Logout
        </Button>
      ),
    },
  ];

  const handleToggleNavBar = () => {
    setIsToggle(!isToggle);
  };
  const handleToggleSubNavProductMobile = () => {
    setIsShowSubNavProductMobile(!isShowSubNavProductMobile);
  };
  const handleToggleSubNavGiftMobile = () => {
    setIsShowSubNavGiftMobile(!isShowSubNavGiftMobile);
  };
  const handleToggleSubNavBlogMobile = () => {
    setIsShowSubNavBlogMobile(!isShowSubNavBlogMobile);
  };

  const handleRedirectToHomePage = () => {
    navigate(ROUTES.HOME_PAGE);
  };
  const handleRedirectToCartPage = () => {
    navigate(ROUTES.CART_PAGE);
  };

  const handleSearchProduct = (e) => {
    e.preventDefault();
    // Khi search => pagination về currentPage=1, bổ sung params Search
    dispatch(
      actFetchAllProducts({
        _page: 1,
        _limit: pagination.limitPerPage,
        q: searchKey,
      })
    );
    dispatch(setNewPage(1));
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
    setIsToggle(!isToggle);
  };

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
    setIsToggle(!isToggle);
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
    setIsToggle(!isToggle);
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
    setIsToggle(!isToggle);
  };

  const handleFilterHerProduct = () => {
    dispatch(setSearchKey("Her"));
    dispatch(
      actFetchAllProducts({
        _page: 1,
        _limit: pagination.limitPerPage,
        q: searchKey,
        ...params,
      })
    );
    navigate(ROUTES.PRODUCT_PAGE);
    setIsToggle(!isToggle);
  };

  const handleFilterHimProduct = () => {
    dispatch(setSearchKey("Him"));
    dispatch(
      actFetchAllProducts({
        _page: 1,
        _limit: pagination.limitPerPage,
        q: searchKey,
        ...params,
      })
    );
    navigate(ROUTES.PRODUCT_PAGE);
    setIsToggle(!isToggle);
  };

  const handleChangeInputSearch = (e) => {
    const value = e.target.value;
    dispatch(setSearchKey(value));
  };

  return (
    <div className="header-wrapper">
      <div className="header-container">
        <div className="header-btn-show-navBar">
          <MenuOutlined onClick={handleToggleNavBar} />
        </div>

        <div className="header-navBar">
          <div
            className="header-navBar__logo"
            onClick={handleRedirectToHomePage}
          >
            <img
              src="https://eunoiajewelry.com/wp-content/uploads/2022/05/cropped-LOGO-e1651901202165-150x28.png"
              alt="logo"
            />
          </div>
          <div
            className={`header-navBar__list-grp ${
              isToggle ? "header-navBar__list-grp-show" : ""
            }`}
          >
            <ul className="header-navBar__list">
              <li className="header-navBar__btnClosed-navBar">
                <CloseOutlined onClick={handleToggleNavBar} />
              </li>

              <li className="header-navBar__listItem">
                <Link to={ROUTES.ABOUT_US_PAGE}>
                  <span onClick={handleToggleNavBar}>About Us</span>
                </Link>
              </li>
              <li className="header-navBar__listItem header-navBar__shopItem">
                <div className="header-navBar__shopItem--title">
                  <Link to={ROUTES.PRODUCT_PAGE}>
                    <span onClick={handleToggleNavBar}>Product</span>
                    <div className="header-navBar__btnShow"></div>
                    <DownOutlined onClick={handleToggleSubNavProductMobile} />
                  </Link>
                </div>
                <ul
                  className={`header-navBar__subNavProduct ${
                    isShowSubNavProductMobile
                      ? "header-navBar__subNavProductMobile"
                      : ""
                  }`}
                >
                  <li
                    className="header-navBar__subNavProduct--rings"
                    onClick={handleFilterRingsProduct}
                  >
                    Rings
                  </li>
                  <li
                    className="header-navBar__subNavProduct--earrings"
                    onClick={handleFilterEarringProduct}
                  >
                    Earrings
                  </li>
                  <li
                    className="header-navBar__subNavProduct--necklaces"
                    onClick={handleFilterNecklacesProduct}
                  >
                    Necklaces
                  </li>
                  <li
                    className="header-navBar__subNavProduct--bracelets"
                    onClick={handleFilterBraceletsProduct}
                  >
                    Bracelets
                  </li>
                </ul>
              </li>

              <li className="header-navBar__listItem header-navBar__giftItem">
                <div className="header-navBar__giftItem--title">
                  <Link to={ROUTES.PRODUCT_PAGE}>
                    <span onClick={handleToggleNavBar}>Gift</span>
                    <div className="header-navBar__btnShow"></div>
                    <DownOutlined onClick={handleToggleSubNavGiftMobile} />
                  </Link>
                </div>
                <ul
                  className={`header-navBar__subNavGift ${
                    isShowSubNavGiftMobile
                      ? "header-navBar__subNavGiftMobile"
                      : ""
                  }`}
                >
                  <li
                    className="header-navBar__subNavGift--her"
                    onClick={handleFilterHerProduct}
                  >
                    Gift for her
                  </li>
                  <li
                    className="header-navBar__subNavGift--him"
                    onClick={handleFilterHimProduct}
                  >
                    Gift for him
                  </li>
                </ul>
              </li>

              <li className="header-navBar__listItem header-navBar__blogItem">
                <div className="header-navBar__blogItem--title">
                  <Link to={ROUTES.BLOG_PAGE}>
                    <span onClick={handleToggleNavBar}>Blog</span>
                    <div className="header-navBar__btnShow"></div>
                    <DownOutlined onClick={handleToggleSubNavBlogMobile} />
                  </Link>
                </div>
                <ul
                  className={`header-navBar__subNavBlog ${
                    isShowSubNavBlogMobile
                      ? "header-navBar__subNavBlogMobile"
                      : ""
                  }`}
                >
                  <li className="header-navBar__subNavBlog--basicInformation">
                    Basic Information
                  </li>
                  <li className="header-navBar__subNavBlog--tips">
                    Tips for you
                  </li>
                  <li className="header-navBar__subNavBlog--diamondJewelry">
                    Diamond jewelry
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <form className="header-left" onSubmit={handleSearchProduct}>
          <div className="header-left__searchBox">
            <Input
              className="header-left__input"
              placeholder="Search product..."
              value={searchKey}
              onChange={handleChangeInputSearch}
            />
            <SearchOutlined className="header-left__search-icon" />
          </div>
          <div
            className="header-left__shoppingCart"
            onClick={handleRedirectToCartPage}
          >
            <ShoppingOutlined />
            {!!carts.length && (
              <div className="header-left__shoppingCartCount">
                <p>{carts.length}</p>
              </div>
            )}
          </div>

          {!isLogin && (
            <div className="header-left__loginRegisterGrp">
              <div className="header-left__icon">
                <Dropdown menu={{ items }} placement="bottomLeft">
                  <UserOutlined />
                </Dropdown>
              </div>
            </div>
          )}

          {isLogin && (
            <div className="header-left__user-grp">
              <div className="header-left__user-avatar">
                <Dropdown
                  menu={{ items: itemsLoginSuccess }}
                  trigger={"click"}
                  placement="bottomLeft"
                >
                  {userInfo?.avatarURL ? (
                    <div className="header-left__avatar-user">
                      <img src={userInfo?.avatarURL} alt="" />
                    </div>
                  ) : (
                    <UserOutlined />
                  )}
                </Dropdown>
              </div>
              <div className="header-left__user-name">
                <p>Hello, {userInfo?.user}</p>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default HeaderComponent;
