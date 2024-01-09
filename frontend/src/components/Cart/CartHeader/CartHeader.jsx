import React from "react";
import classes from "./CartHeader.module.css";

function CartHeader({ currentSlide, countSlides, onCloseModal, hasItems }) {
  return (
    <div className={classes.header}>
      {hasItems && (
        <p>
          Шаг {currentSlide}/{countSlides}
        </p>
      )}
      <button onClick={onCloseModal}></button>
    </div>
  );
}

export default CartHeader;
