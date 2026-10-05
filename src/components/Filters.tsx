import type { JSX, ReactNode } from "react";

type FiltersProps = {
  children: ReactNode;
};

export default function Filters({ children }: FiltersProps): JSX.Element {
  return (
    <div className="flex w-fit flex-col items-center justify-center gap-2 sm:flex-row md:gap-6">
      {children}
    </div>
  );
}
