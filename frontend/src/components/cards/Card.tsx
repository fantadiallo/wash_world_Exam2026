import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: CardProps) {
  return (
    <article className={`border border-[#444] p-4 ${className}`}>
      {children}
    </article>
  );
}