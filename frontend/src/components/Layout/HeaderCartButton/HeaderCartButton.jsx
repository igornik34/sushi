import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../../store/cartContext";

function HeaderCartButton({ onClick }) {
  const [isButtonAnimated, setIsButtonAnimated] = useState(false)

  const ctx = useContext(CartContext);

  const cartItemsNumber = ctx.items.reduce((currentValue, item) => {
    return currentValue + item.amount;
  }, 0);

  const buttonClasses = `${classes.button} ${isButtonAnimated ? classes.bump : ''}`

  useEffect(() => {
    if(!ctx.items.length) {
      return
    }
    setIsButtonAnimated(true)

    const timer = setTimeout(() => {
      setIsButtonAnimated(false)
    }, 300)
    return () => {
      clearTimeout(timer)
    }
  }, [ctx.items])

  return (
    <button onClick={onClick} className={buttonClasses}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Корзина</span>
      <span className={classes.badge}>{cartItemsNumber}</span>
    </button>
  );
}

export default HeaderCartButton;
