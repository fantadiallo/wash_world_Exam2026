import type { ReactNode } from "react";

import { CardProps } from "@/src/types/card";

const variants = {
  location_card: 'bg-(--gray-eighty) min-w-[300px] w-full px-4 py-2 rounded-sm border-2 border-(--brand-green-white-bg)',
  none: '',
}


export default function Card({
  children,
  className = "",
  variant = "location_card", 
}: CardProps) {
  return (
    <article className={`${variants[variant]} ${className}`}>
      {children}
    </article>
  );
}