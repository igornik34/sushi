import React, { useContext, useEffect, useState } from "react";
import classes from "./CartPromocode.module.css";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import CartContext from "../../../store/cartContext";
import axios from "axios";
import Cross from "../Cross";

function CartPromocode() {
  const ctxCart = useContext(CartContext);
  const [inputPromocode, setInputPromocode] = useState("");
  useEffect(() => {
    if (ctxCart.promocode) {
      console.log(ctxCart.promocode);
      setInputPromocode(ctxCart.promocode.inputPromocode);
    }
  }, [ctxCart.promocode]);
  const fetchPromocodeHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://127.0.0.1:8000/api/promocode/",
        {
          promocode: inputPromocode,
        }
      );
      ctxCart.applyPromocode({ inputPromocode: inputPromocode, ...data.details });
      if (ctxCart.totalAmount < data.details.min_sum_order) {
        ctxCart.applyPromocodeError(
          `Сумма заказа должна быть ${data.details.min_sum_order}`,
          inputPromocode
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        ctxCart.applyPromocodeError("Промокод не найден!", inputPromocode);
      } else {
        console.error(error);
      }
    }
  };
  return (
    <form className={classes.promocode} onSubmit={fetchPromocodeHandler}>
      <div className="relative">
        <Input
          input={{
            id: "promocode",
            type: "text",
            placeholder: "Введите промокод",
            value: inputPromocode || "",
            required: true,
            onChange: (e) => setInputPromocode(e.target.value.toUpperCase()),
          }}
        />
        {ctxCart.promocodeApply && (
          <div onClick={ctxCart.resetPromocode} className={classes.cross}>
            <Cross size="30px" fill="#444" />
          </div>
        )}
      </div>
      <Button type="submit" disabled={ctxCart.promocodeApply}>
        Применить
      </Button>
    </form>
  );
}

export default CartPromocode;
