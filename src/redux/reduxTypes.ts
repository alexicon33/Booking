import { User } from "../Types";

export type Store = {
  user: User | null,
  isValid: boolean | null
};

export const SET_USER = 'SET_USER';
export const SET_VALID = 'SET_VALID';