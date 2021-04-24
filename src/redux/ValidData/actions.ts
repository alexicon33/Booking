import { SET_VALID } from "../reduxTypes";

export function setValid(isValid: boolean) {
  return {
    type: SET_VALID,
    payload: isValid
  }
}