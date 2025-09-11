import { FormHTMLAttributes, PropsWithChildren } from "react";

export default function Form({
  onSubmit,
  children,
}: FormHTMLAttributes<HTMLFormElement> & PropsWithChildren) {
  return <form onSubmit={onSubmit}>{children}</form>;
}
