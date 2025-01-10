import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export function Search({ ...rest }: Props) {
  return (
    <input
      className="bg-white border-my-input-border border-2 px-4 py-3 rounded-lg outline-my-green"
      {...rest}
    />
  );
}
