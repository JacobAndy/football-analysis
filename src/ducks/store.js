import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import teams from "./teams";
import opponent from "./opponent";

const store = createStore(
  combineReducers({ teams, opponent }),
  applyMiddleware(promiseMiddleware())
);
export default store;
