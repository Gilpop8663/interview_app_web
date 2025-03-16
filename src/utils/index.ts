import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cls = (...classnames: string[]) => {
  return classnames.join(" ");
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
