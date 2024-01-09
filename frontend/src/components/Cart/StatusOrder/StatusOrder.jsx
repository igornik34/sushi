import React, { useContext } from "react";
import classes from "./StatusOrder.module.css";
import Checkmark from "../Checkmark";
import Cross from "../Cross";
import Button from "../../UI/Button/Button";
import UserContext from "../../../store/userContext";

function StatusOrder({ isSuccess, onOrder }) {
  const ctxUser = useContext(UserContext);
  return (
    <div className={classes.status}>
      {isSuccess ? (
        <Checkmark />
      ) : (
        <Cross className={classes.cross} size="100px" fill="rgb(127, 29, 29)"/>
      )}
      <p>
        {isSuccess
          ? `${ctxUser.name}! Через 10 минут Вам позвонит оператор для подтверждения заказа`
          : `Извините, ${ctxUser.name}, произошла ошибка, попробуйте, пожалуйста, еще раз...`}
      </p>
      {!isSuccess && (
        <Button type="button" onClick={onOrder}>
          Попробовать еще раз
        </Button>
      )}
    </div>
  );
}

export default StatusOrder;
