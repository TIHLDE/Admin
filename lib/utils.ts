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

export const findPermissionKey = (array: any[], key: string): boolean => {
  for (const item of array) {
    if (item[key]) return true;
  }
  return false;
};

export const getPermissionValues = (array: any[], key: string) => {
  const item = array.find((item) => item[key]);
  const values = Object.values(item)[0]
  console.log(values)
  return false;
};