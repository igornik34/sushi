import React from "react";
import sushiImage from '../../../assets/sushi.jpg'
import classes from './Header.module.css'
import HeaderCartButton from "../HeaderCartButton/HeaderCartButton";

function Header({onShowCart}) {
  return (
    <>
      <header className={classes.header}>
        <h1>Япона Мама</h1>
        <HeaderCartButton onClick={onShowCart}/>
      </header>
      <div className={classes['main-image']}>
        <img src={sushiImage} alt="Блюда японской кухни" />
      </div>
    </>
  );
}

export default Header;
