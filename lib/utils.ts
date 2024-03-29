import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function excludeFields(entity: any, keys: string[]) {
  const clone = { ...entity };

  keys.forEach((key) => {
    if (clone[key]) {
      delete clone[key];
    }
  });

  return clone;
}

export async function fetcher(...args: any) {
  return fetch(args).then((res) => res.json());
}
