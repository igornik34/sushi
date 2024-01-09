import React, { useReducer } from "react";
import CartContext from "./cartContext";

const defaultCartState = {
  items: [],
  totalAmount: 0,
  totalAmountWithDiscount: 0,
  promocode: {},
  promocodeApply: false,
  hasPromocode: false
};

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id && !item.isAddedPromocode
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItem;
    let updatedItems;
    if (existingCartItem) {
      updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItem = {
        ...action.item,
      };
      updatedItems = state.items.concat(updatedItem);
    }
    return {
      ...state,
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id && !item.isAddedPromocode
    );
    const existingCartItem = state.items[existingCartItemIndex];
    console.log(existingCartItem);
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    let updatedItems;
    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter(
        (item) => item.id !== action.id || item.isAddedPromocode
      );
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      ...state,
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type == "REMOVE_ITEMS") {
    return defaultCartState;
  }
  if (action.type == "APPLY_PROMOCODE") {
    const inputPromocode = action.details.inputPromocode;
    if (new Date() > new Date(action.details.time_action)) {
      const promocodeMessage = {
        type: "error",
        message: "Промокод не действует!",
      };
      return {
        ...state,
        promocode: {
          inputPromocode,
          promocodeMessage,
        },
        hasPromocode: true
      };
    } else if (action.details.type_promocode === "error") {
      const inputPromocode = action.details.inputPromocode;
      const promocodeMessage = {
        type: "error",
        message: action.details.message,
      };
      return {
        ...state,
        promocode: {
          inputPromocode,
          promocodeMessage,
        },
        hasPromocode: true
      };
    } else {
      const promocodeMessage = {
        type: "message",
        message: "Промокод применен!",
      };
      if (action.details.type_promocode === "product") {
        const item = action.details.sushi;
        let updatedItems = [
          { ...item, amount: 1, isAddedPromocode: true },
          ...state.items,
        ];
        return {
          ...state,
          items: updatedItems,
          promocode: {
            ...action.details,
            inputPromocode,
            promocodeMessage,
          },
          promocodeApply: true,
        };
      } else {
        console.log(state.totalAmount - action.details.discount);
        return {
          ...state,
          promocode: {
            ...action.details,
            inputPromocode,
            promocodeMessage,
          },
          promocodeApply: true,
          totalAmountWithDiscount: state.totalAmount - action.details.discount,
        };
      }
    }
  }
  if (action.type === "RESET_PROMOCODE") {
    let updatedItems = state.items;
    if (state.promocode.type_promocode === "product") {
      updatedItems = state.items.filter((item) => !item.isAddedPromocode);
    }
    return {
      ...state,
      items: updatedItems,
      promocode: {},
      promocodeApply: false,
      totalAmountWithDiscount: 0,
      hasPromocode: false
    };
  }
  return defaultCartState;
};

function CartContextProvider({ children }) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemHandler = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", item });
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  };

  const clearItemsHandler = () => {
    dispatchCartAction({ type: "CLEAR_ITEMS" });
  };

  const applyPromocodeHandler = (details) => {
    dispatchCartAction({ type: "APPLY_PROMOCODE", details });
  };

  const applyPromocodeErrorHandler = (message, inputPromocode) => {
    dispatchCartAction({
      type: "APPLY_PROMOCODE",
      details: { type_promocode: "error", message, inputPromocode },
    });
  };

  const resetPromocodeHandler = () => {
    dispatchCartAction({ type: "RESET_PROMOCODE" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    promocode: cartState.promocode,
    promocodeApply: cartState.promocodeApply,
    totalAmountWithDiscount: cartState.totalAmountWithDiscount,
    hasPromocode: cartState.hasPromocode,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearItems: clearItemsHandler,
    applyPromocode: applyPromocodeHandler,
    resetPromocode: resetPromocodeHandler,
    applyPromocodeError: applyPromocodeErrorHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContextProvider;
