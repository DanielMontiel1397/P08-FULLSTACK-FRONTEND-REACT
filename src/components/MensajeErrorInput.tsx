import type { ReactNode } from "react";

interface FormErrorProps {
  children: ReactNode;
}

export default function MensajeErrorInput({ children }: FormErrorProps) {
  return (
    <p className="text-red-500 text-sm mt-1">
      {children}
    </p>
  );
}
