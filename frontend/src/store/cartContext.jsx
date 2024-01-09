import { createContext } from "react";

const CartContext = createContext({
    items: [],
    totalAmount: 0,
    promocode: {},
    promocodeApply: false,
    totalAmountWithDiscount: 0,
    hasPromocode: false,
    addItem: (item) => {},
    removeItem: (id) => {},
    clearItems: () => {},
    applyPromocode: (promo) => {},
    resetPromocode: () => {},
    applyPromocodeError: (message, promo) => {}
})

export default CartContext