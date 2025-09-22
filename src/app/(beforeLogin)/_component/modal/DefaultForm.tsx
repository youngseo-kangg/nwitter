import { HTMLAttributes, PropsWithChildren } from "react";

export default function DefaultForm({
  children,
  ...props
}: HTMLAttributes<HTMLFormElement> & PropsWithChildren) {
  return <form onSubmit={props.onSubmit}>{children}</form>;
}
