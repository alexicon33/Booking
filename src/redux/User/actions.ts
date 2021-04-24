import { User } from "../../Types";
import { SET_USER } from '../reduxTypes';

export function loadUserData(user: User | null) {
  return {
    type: SET_USER,
    payload: user
  }
}