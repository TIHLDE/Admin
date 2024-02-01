import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const getFallbackName = (name: string) => {
  const split = name.split(" ")
  if (split.length === 1) {
    return name[0]
  }
  return `${split[0][0]}${split[1][0]}`
};