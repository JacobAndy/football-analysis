import { createStore, applyMiddleware } from "redux";
import teams from "./teams";
import promiseMiddleware from "redux-promise-middleware";

const store = createStore(teams, applyMiddleware(promiseMiddleware()));
export default store;
