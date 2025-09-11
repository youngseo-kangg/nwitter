import { FC, HTMLAttributes, PropsWithChildren } from "react";

// style
import style from "@/app/(beforeLogin)/_component/modal/modal.module.css";

// component
import Header from "./Header";
import Form from "./Form";
import Footer from "./Footer";
import Button from "./Button";
import Input from "./input";
import Message from "./Message";
import FormWrapper from "./FormWrapper";

type IModalWrapper = FC<PropsWithChildren<HTMLAttributes<HTMLDivElement>>> & {
  Header: typeof Header;
  Form: typeof Form;
  FormWrapper: typeof FormWrapper;
  Button: typeof Button;
  Input: typeof Input;
  Message: typeof Message;
  Footer: typeof Footer;
};

const Modal: IModalWrapper = ({ children }) => {
  return (
    <div className={style.modalBackground}>
      <div className={style.modal}>{children}</div>
    </div>
  );
};

Modal.Header = Header;
Modal.Form = Form;
Modal.FormWrapper = FormWrapper;
Modal.Button = Button;
Modal.Input = Input;
Modal.Message = Message;
Modal.Footer = Footer;

export default Modal;
