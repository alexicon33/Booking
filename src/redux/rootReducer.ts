import { combineReducers } from "redux";

import user from './User/reducer';
import isValid from './ValidData/reducer';

export default combineReducers({
  user,
  isValid
});