import React, { useContext, useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input/Input";
import CartContext from "../../../store/cartContext";

function MealItemForm({ id, onAddToCart, totalCount }) {
  const amountInputRef = useRef();

  const ctx = useContext(CartContext);
  const item = ctx.items.find((item) => item.id == id);

  const [isAmountValid, setIsAmountValid] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();
    const inputAmount = amountInputRef.current.value;
    if (inputAmount.trim().length === 0 || +inputAmount < 1) {
      setIsAmountValid(false);
      return;
    }
    onAddToCart(+inputAmount);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Кол-во"
        input={{
          id,
          type: "number",
          min: "1",
          step: "1",
          defaultValue: "1",
          max: `${item ? totalCount - item.amount : totalCount}`,
        }}
      />
      {totalCount < 10 && (
        <p className={classes["total-count"]}>Осталось: {totalCount}</p>
      )}
      <button disabled={item && item.amount == totalCount}>Добавить</button>
      {!isAmountValid && <p>Пожалуйста, введите корректное значение</p>}
    </form>
  );
}

export default MealItemForm;
