import axios from "axios";
import { teams } from "../dummyData";

//initial state
const initialState = {
  schools: []
};

//action creators
const GET_SCHOOLS = "GET_SCHOOLS";

//reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_SCHOOLS:
      return { ...state, schools: teams };
    default:
      return state;
  }
}

//functions to update state
export function getSchools() {
  return {
    type: GET_SCHOOLS,
    payload: "test"
  };
}
