import { useState } from "react";
import "./App.css";
import Header from "./components/Layout/Header/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart/Cart";
import CartContextProvider from "./store/CartContextProvider";
import UserContextProvider from "./store/UserContextProvider";

function App() {
  const [cartIsVisible, setCartIsVisible] = useState(false);

  const showCartHandler = () => {
    setCartIsVisible(true);
  };

  const hideCartHandler = () => {
    setCartIsVisible(false);
  };

  return (
    <UserContextProvider>
      <CartContextProvider>
        {cartIsVisible && <Cart onHideCart={hideCartHandler} />}
        <Header onShowCart={showCartHandler} />
        <main>
          <Meals />
        </main>
      </CartContextProvider>
    </UserContextProvider>
  );
}

export default App;
