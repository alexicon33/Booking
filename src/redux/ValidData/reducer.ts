import { AnyAction } from "redux";
import { SET_VALID } from "../reduxTypes";

function validReducer(state: boolean | null = null, action: AnyAction) {
  switch (action.type) {
    case SET_VALID:
      return action.payload;
    default:
      return state;
  }
}

export default validReducer;