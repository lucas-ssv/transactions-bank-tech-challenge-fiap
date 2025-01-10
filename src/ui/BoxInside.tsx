import { ReactNode } from "react";
import "./BoxInside.css";

interface Props {
  children: ReactNode;
  title: string;
}

export default function BoxInside({ title, children }: Props) {
  return (
    <div className="box-inside relative bg-my-gray-box text-black max-w-5xl w-full rounded-lg mx-auto px-8 md:px-8 pt-8 md:pt-8 pb-16 overflow-hidden">
      <h2 className="text-2xl font-bold pb-8 relative z-10 text-black">
        {title}
      </h2>
      <div className="flex flex-col gap-8 justify-between z-10 relative">
        {children}
      </div>
    </div>
  );
}
