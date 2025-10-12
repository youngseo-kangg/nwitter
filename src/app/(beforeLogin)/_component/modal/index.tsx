import { FC, HTMLAttributes, PropsWithChildren } from "react";

// style
import {
  modalBackground,
  modal,
} from "@/app/(beforeLogin)/_component/modal/modal.css";

// component
import Header from "./Header";
import DefaultForm from "./DefaultForm";
import Form from "./Form";
import Footer from "./Footer";
import Button from "./Button";
import Input from "./input";
import Message from "./Message";
import FormWrapper from "./FormWrapper";

type IModalWrapper = FC<PropsWithChildren<HTMLAttributes<HTMLDivElement>>> & {
  Header: typeof Header;
  DefaultForm: typeof DefaultForm;
  Form: typeof Form;
  FormWrapper: typeof FormWrapper;
  Button: typeof Button;
  Input: typeof Input;
  Message: typeof Message;
  Footer: typeof Footer;
};

const Modal: IModalWrapper = ({ children }) => {
  return (
    <div className={modalBackground}>
      <div className={modal}>{children}</div>
    </div>
  );
};

Modal.Header = Header;
Modal.DefaultForm = DefaultForm;
Modal.Form = Form;
Modal.FormWrapper = FormWrapper;
Modal.Button = Button;
Modal.Input = Input;
Modal.Message = Message;
Modal.Footer = Footer;

export default Modal;
