import React, {
  useContext,
} from "react";
import Button from "../../UI/Button/Button";
import CartContext from "../../../store/cartContext";
import classes from "./CartFooter.module.css";
import CartPromocode from "../CartPromocode/CartPromocode";

function CartFooter(props) {
  const ctxCart = useContext(CartContext);
  const totalAmount = Math.abs(ctxCart.totalAmount).toFixed(2);
  return (
    <div className={classes.footer}>
      <div>
        <CartPromocode />
        <div className={classes.message}>
          {ctxCart.hasPromocode || ctxCart.promocodeApply && (
            <p
              className={` ${
                ctxCart.promocode.promocodeMessage.type === "error"
                  ? "text-red-600"
                  : "text-green-500"
              } ${
                ctxCart.promocode.promocodeMessage.message
                  ? "visible"
                  : "invisible"
              }`}
            >
              {ctxCart.promocode.promocodeMessage.message}
            </p>
          )}
        </div>
      </div>
      <div>
        {ctxCart.totalAmountWithDiscount ? (
          <p className={classes.total}>
            Итого:
            <div className={classes["total-sum"]}>
              <span className={classes["total-without-discount"]}>
                {totalAmount}
              </span>
              <span>{ctxCart.totalAmountWithDiscount}</span>
            </div>
            руб.
          </p>
        ) : (
          <p className={classes.total}>Итого: {totalAmount} руб.</p>
        )}
        <Button
          className="ml-auto block"
          onClick={() => props.swiperRef.current.slideNext()}
        >
          Далее
        </Button>
      </div>
    </div>
  );
}

export default CartFooter;
