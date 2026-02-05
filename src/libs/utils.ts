import { type ClassValue, clsx } from "clsx"; // 👈 Agrega "type" aquí
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}