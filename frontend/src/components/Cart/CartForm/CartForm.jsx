import React, { useRef } from "react";
import Input from "../../UI/Input/Input";
import classes from "./CartForm.module.css";
import Button from "../../UI/Button/Button";

function CartForm({ onOrder, swiperRef }) {
  const inputNameRef = useRef(null);
  const inputPhoneNumberRef = useRef(null);
  const inputCityRef = useRef(null);
  const inputStreetRef = useRef(null);
  const inputHomeRef = useRef(null);

  async function submitHandler(e) {
    e.preventDefault();
    const userInfo = {
      name: inputNameRef.current.value,
      phone_number: inputPhoneNumberRef.current.value,
      city: inputCityRef.current.value,
      street: inputStreetRef.current.value,
      home: inputHomeRef.current.value,
    };
    onOrder(userInfo);
  }

  return (
    <form className={classes.actions} onSubmit={submitHandler}>
      <div className={classes["block-form"]}>
        <Input
          input={{
            id: "name",
            type: "text",
            placeholder: "Имя",
            required: true,
          }}
          label="Имя"
          className="flex-[1_1_48%]"
          ref={inputNameRef}
        />
        <Input
          input={{
            id: "phone_number",
            type: "tel",
            placeholder: "+7 900 123 12 12",
            required: true,
          }}
          label="Номер телефона"
          className="flex-[1_1_48%]"
          ref={inputPhoneNumberRef}
        />
        <Input
          input={{
            id: "city",
            type: "text",
            placeholder: "Например, Курск",
            required: true,
          }}
          label="Населенный пункт"
          ref={inputCityRef}
        />
        <Input
          input={{
            id: "street",
            type: "text",
            placeholder: "Например, Щепкина",
            required: true,
          }}
          label="Улица"
          ref={inputStreetRef}
        />
        <Input
          input={{
            id: "home",
            type: "text",
            placeholder: "Например, 12А",
            required: true,
          }}
          label="Дом"
          ref={inputHomeRef}
        />
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
