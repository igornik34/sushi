import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const price = `${props.price} руб.`;
  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>
            <span>x </span>
            {props.amount}
          </span>
        </div>
      </div>
      {!props.isAddedPromocode && (
        <div className={classes.actions}>
          <button onClick={props.onRemove}>−</button>
          <button
            onClick={props.onAdd}
            disabled={props.amount == props.totalCount}
          >
            +
          </button>
        </div>
      )}
    </li>
  );
};

export default CartItem;
