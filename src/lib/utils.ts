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

export const FIELDS: { [key: string]: string } = {
  name: "Name",
  surname: "Surname",
  email: "Email",
  username: "User",
  phone: "Phone",
  password: "Password",
  role: "Role",
  isActivated: "Status",
  actions: "Actions",
};

export const errorResponse = (message: string) => {
  return {
    error: true,
    message,
    data: null,
  };
};

export const successResponse = (data: any = null, message?: string) => {
  return {
    error: false,
    message: message || "Success",
    data: data || null,
  };
};

export const SUCCESS_RESPONSE_MESSAGES = {
  created: "Created successfully.",
  updated: "Updated successfully.",
  deleted: "Deleted successfully.",
  activated: "Activated successfully.",
  deactivated: "Deactivated successfully.",
  added: "Added successfully.",
};

export const ERROR_RESPONSE_MESSAGES = {
  created: "An error occurred while creating the record.",
  updated: "An error occurred while updating the record.",
  deleted: "An error occurred while deleting the record.",
  activated: "An error occurred while activating the record.",
  deactivated: "An error occurred while deactivating the record.",
  added: "An error occurred while adding the record.",
  notFound: "Record not found.",
  missingFields: "Missing fields.",
  passwordsDontMatch: "Passwords don't match.",
  samePasswords: "Same passwords.",
  badRequest: "Request failed with status code 400.",
};

export const AUTH_RESPONSE_MESSAGE = {
  unauthorized: "Unauthorized.",
  invalidCredentials: "Invalid credentials.",
  currentPasswordWrong: "Current password is wrong.",
};

export const USER_SELECT = {
  _count: true,
  avatar: true,
  id: true,
  name: true,
  role: true,
  username: true,
  email: true,
  createdAt: true,
  updatedAt: true,
  isActivated: true,
  phone: true,
  surname: true,
  passwordUpdated: true,
};

export const MONTHS: { [key: string]: string } = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};
