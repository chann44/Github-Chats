import { type ReactNode } from "react";

export default function AuthLayout(props: { children: ReactNode }) {
  return (
    <div className="h-full flex justify-center items-center">
      {props.children}
    </div>
  );
}
