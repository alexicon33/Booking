import { AnyAction } from "redux";
import { User } from "../../Types";
import { SET_USER } from "../reduxTypes";

function userReducer(state: User | null = null, action: AnyAction) {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    default:
      return state;
  }
}

export default userReducer;