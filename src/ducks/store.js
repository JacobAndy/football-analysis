import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import teams from "./teams";
import leftOpponent from "./leftOpponent";
import rightOpponent from "./rightOpponent";

const store = createStore(
  combineReducers({ teams, leftOpponent, rightOpponent }),
  applyMiddleware(promiseMiddleware())
);
export default store;
