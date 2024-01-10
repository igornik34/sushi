import React, { useContext, useEffect, useRef, useState } from "react";
import Input from "../../UI/Input/Input";
import classes from "./CartForm.module.css";
import Button from "../../UI/Button/Button";
import UserContext from "../../../store/userContext";

function CartForm({ onOrder, swiperRef }) {
  const ctxUser = useContext(UserContext)
  const [userIsFilled, setUserIsFilled] = useState(false)
  const inputNameRef = useRef(null);
  const inputPhoneNumberRef = useRef(null);
  const inputCityRef = useRef(null);
  const inputStreetRef = useRef(null);
  const inputHomeRef = useRef(null);

  const inputs = [
    {
      input: {
        id: "name",
        type: "text",
        placeholder: "Имя",
        required: true,
      },
      label: "Имя",
      ref: inputNameRef,
    },
    {
      input: {
        id: "phone_number",
        type: "tel",
        placeholder: "+7 900 123 12 12",
        required: true,
      },
      label: "Номер телефона",
      ref: inputPhoneNumberRef,
    },
    {
      input: {
        id: "city",
        type: "text",
        placeholder: "Например, Курск",
        required: true,
      },
      label: "Населенный пункт",
      ref: inputCityRef,
    },
    {
      input: {
        id: "street",
        type: "text",
        placeholder: "Например, Щепкина",
        required: true,
      },
      label: "Улица",
      ref: inputStreetRef,
    },
    {
      input: {
        id: "home",
        type: "text",
        placeholder: "Например, 12А",
        required: true,
      },
      label: "Дом, №",
      ref: inputHomeRef,
    },
  ];

  async function submitHandler(e) {
    e.preventDefault();
    const userInfo = {
      name: inputNameRef.current.value,
      phone_number: inputPhoneNumberRef.current.value,
      city: inputCityRef.current.value,
      street: inputStreetRef.current.value,
      home: inputHomeRef.current.value,
    };
    ctxUser.setInfo(userInfo)
    setUserIsFilled(true)
  }
  useEffect(() => {
    if(userIsFilled) onOrder()
    console.log('work');
  }, [userIsFilled])

  return (
    <form className={classes.actions} onSubmit={submitHandler}>
      <div className={classes["block-form"]}>
        {inputs.map((input) => (
          <Input
            input={{
              id: input.input.id,
              type: input.input.type,
              placeholder: input.input.placeholder,
              required: input.input.placeholder,
            }}
            label={input.label}
            ref={input.ref}
            key={input.input.id}
          />
        ))}
      </div>
      <div className={classes.buttons}>
        <Button type="button" onClick={() => swiperRef.current.slidePrev()}>
          Назад
        </Button>
        <Button type="submit" className="ml-4">
          Заказать
        </Button>
      </div>
    </form>
  );
}

export default CartForm;
