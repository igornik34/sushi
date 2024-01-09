import ReactDOM from "react-dom";
import Card from "../Card/Card";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div onClick={props.onHideCart} className={classes.backdrop}></div>;
};

const ModalWindow = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalEl = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onHideCart={props.onHideCart}/>, portalEl)}
      {ReactDOM.createPortal(<ModalWindow>{props.children}</ModalWindow>, portalEl)}
    </>
  );
};

export default Modal;
