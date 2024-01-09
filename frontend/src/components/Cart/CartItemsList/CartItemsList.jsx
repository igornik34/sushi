import React, { useContext } from "react";
import classes from "./CartItemsList.module.css";
import CartContext from "../../../store/cartContext";
import CartItem from "../CartItem/CartItem";
import CartFooter from "../CartFooter/CartFooter";

function CartItemsList(props) {
  const ctx = useContext(CartContext);
  const removeCartItemHandler = (id) => {
    ctx.removeItem(id);
  };
  const addCartItemHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  return (
    <>
      <ul className={classes["items"]}>
        {ctx.items.map((item) => (
          <CartItem
            key={item.isAddedPromocode ? `${item.id}-bonus` : item.id}
            name={item.name}
            amount={item.amount}
            isAddedPromocode={item.isAddedPromocode}
            price={item.price}
            totalCount={item.totalCount}
            onAdd={addCartItemHandler.bind(null, item)}
            onRemove={removeCartItemHandler.bind(null, item.id)}
          />
        ))}
      </ul>
      <CartFooter swiperRef={props.swiperRef}/>
    </>
  );
}

export default CartItemsList;
