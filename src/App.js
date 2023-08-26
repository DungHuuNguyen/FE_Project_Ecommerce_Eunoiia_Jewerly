import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { ROUTES } from "./constants/routes";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import BlogPage from "./pages/BlogPage";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import DetailProductPage from "./pages/DetailProductPage";
import UserProfilePage from "./pages/UserProfilePage";
import UserChangePassWord from "./pages/UserChangePassword";
import UserPurchaseHistoryPage from "./pages/UserPurchaseHistoryPage";
import { GlobalHistory } from "./utils/globalHistory";
import OrderPage from "./pages/OrderPage";
import CheckoutPage from "./pages/CheckoutPage";
import { actClearCarts } from "./redux/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isLogin) {
      dispatch(actClearCarts());
    }
    // eslint-disable-next-line
  }, [isLogin]);

  return (
    <div className="App">
      <BrowserRouter>
        <GlobalHistory />
        <Routes>
          <Route element={<MainLayout />}>
            <Route path={ROUTES.HOME_PAGE} element={<HomePage />} />
            <Route path={ROUTES.ABOUT_US_PAGE} element={<AboutUsPage />} />
            <Route path={ROUTES.PRODUCT_PAGE} element={<ProductPage />} />
            <Route path={ROUTES.BLOG_PAGE} element={<BlogPage />} />
            <Route path={ROUTES.LOGIN_PAGE} element={<LoginPage />} />
            <Route path={ROUTES.REGISTER_PAGE} element={<RegisterPage />} />
            <Route path={ROUTES.CART_PAGE} element={<CartPage />} />
            <Route path={ROUTES.ORDER_PAGE} element={<OrderPage />} />
            <Route path={ROUTES.CHECK_OUT_PAGE} element={<CheckoutPage />} />
            <Route
              path={ROUTES.USER_PROFILE_PAGE}
              element={<UserProfilePage />}
            />
            <Route
              path={ROUTES.DETAIL_PRODUCT_PAGE}
              element={<DetailProductPage />}
            />
            <Route
              path={ROUTES.USER_CHANGE_PASSWORD_PAGE}
              element={<UserChangePassWord />}
            />
            <Route
              path={ROUTES.USER_PURCHASE_HISTORY_PAGE}
              element={<UserPurchaseHistoryPage />}
            />
          </Route>
          <Route path="/" element={<Navigate to={ROUTES.HOME_PAGE} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
