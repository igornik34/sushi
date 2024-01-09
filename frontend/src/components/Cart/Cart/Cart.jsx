import React, { useContext, useRef, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../../UI/Modal/Modal";
import CartContext from "../../../store/cartContext";
import CartItem from "../CartItem/CartItem";
import axios from "axios";
import Input from "../../UI/Input/Input";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import CartHeader from "../CartHeader/CartHeader";
import Button from "../../UI/Button/Button";
import CartForm from "../CartForm/CartForm";
import CartItemsList from "../CartItemsList/CartItemsList";
import StatusOrder from "../StatusOrder/StatusOrder";
import UserContext from "../../../store/userContext";

function Cart(props) {
  const ctxCart = useContext(CartContext);
  const ctxUser = useContext(UserContext);
  const swiperRef = useRef(null);
  const [sliderInfo, setSliderInfo] = useState({
    slidesCount: 0,
    currentSlide: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessRequest, setIsSuccessRequest] = useState(false);
  const [isErrorRequest, setIsErrorRequest] = useState(false);

  const hasItems = !!ctxCart.items.length;

  // Ваш обработчик заказа
  async function orderHandler(userInfo) {
    setIsLoading(true);
    ctxUser.setInfo(userInfo)
    
    const orderInfo = {
      name: userInfo.name,
      phone_number: userInfo.phone_number,
      city: userInfo.city,
      street: userInfo.street,
      home: userInfo.home,
      sum_order: ctxCart.totalAmountWithDiscount ? ctxCart.totalAmountWithDiscount : ctxCart.totalAmountWithDiscount,
      promocode: ctxCart.promocodeApply && ctxCart.promocode.inputPromocode,
      sushi_orders: ctxCart.items.map((item) => ({
        sushi: item.id,
        amount: item.amount,
      })),
    };
    console.log(orderInfo);
    try {
      const { data } = await axios.post(
        "http://127.0.0.1:8000/api/orders/",
        orderInfo
      );
      ctxCart.clearItems();
      console.log(data);
      setIsSuccessRequest(true);
    } catch (error) {
      console.log(error);
      setIsErrorRequest(true);
    }
    setIsLoading(false);
  }

  let content;
  if (hasItems) {
    content = (
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={(swiper) => {
          setSliderInfo({
            slidesCount: swiper.slides.length,
            currentSlide: swiper.activeIndex,
          });
        }}
        onSwiper={(swiper) => {
          if (swiper !== null) {
            swiperRef.current = swiper;
            setSliderInfo({
              slidesCount: swiper.slides.length,
              currentSlide: swiper.activeIndex,
            });
          }
        }}
        allowTouchMove={false}
      >
        <SwiperSlide>
          <CartItemsList swiperRef={swiperRef} />
        </SwiperSlide>

        <SwiperSlide>
          <CartForm onOrder={orderHandler} swiperRef={swiperRef} />
        </SwiperSlide>
      </Swiper>
    );
  } else {
    content = <p className={classes["empty-cart"]}>В корзине пока пусто...</p>;
  }

  if (isLoading) {
    content = <p className={classes["empty-cart"]}>Делаем заказ...</p>;
  } else if (isSuccessRequest || isErrorRequest) {
    content = (
      <StatusOrder onOrder={orderHandler} isSuccess={isSuccessRequest} />
    );
  }

  return (
    <Modal onHideCart={props.onHideCart}>
      <CartHeader
        countSlides={sliderInfo.slidesCount}
        currentSlide={sliderInfo.currentSlide + 1}
        onCloseModal={props.onHideCart}
        hasItems={hasItems}
      />
      {content}
    </Modal>
  );
}

export default Cart;
