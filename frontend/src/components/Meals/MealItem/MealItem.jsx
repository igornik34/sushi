import React, { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "../MealItemForm/MealItemForm";
import CartContext from "../../../store/cartContext";

function MealItem({id, name, description, price, totalCount }) {
  const formattedPrice = `${price} руб.`;
  const ctx = useContext(CartContext)
  const addToCartHandler = amount => {
    ctx.addItem({id, name, price, amount, totalCount})
  }
  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <p className={classes.description}>{description}</p>
        <p className={classes.price}>{formattedPrice}</p>
      </div>
      <div>
        <MealItemForm totalCount={totalCount} onAddToCart={addToCartHandler} id={id}/>
      </div>
    </li>
  );
}

export default MealItem;
