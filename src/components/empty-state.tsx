import type { ComponentProps } from "react";

type Props = {
  message: string;
};

export function EmptyState({
  children,
  message,
}: ComponentProps<"div"> & Props) {
  return (
    <div className="flex flex-col justify-center flex-1 items-center gap-2">
      <h3 className="text-2xl font-bold">{message}</h3>
      {children}
    </div>
  );
}
