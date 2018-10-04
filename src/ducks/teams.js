import axios from "axios";

//initial state
const initialState = {
  schools: [],
  loading: false
};

//action creators
const GET_SCHOOLS = "GET_SCHOOLS";

//reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_SCHOOLS}_PENDING`:
      return { ...state, loading: true };

    case `${GET_SCHOOLS}_FULFILLED`:
      const { rows } = action.payload.data;
      //
      // Sets all 298 schools
      //
      return { schools: rows, loading: false };

    default:
      return state;
  }
}

//functions to update state
export function getSchools() {
  return {
    type: GET_SCHOOLS,
    payload: axios({
      method: "get",
      url: `${process.env.REACT_APP_API}/api/list_schools`,
      auth: {
        username: process.env.REACT_APP_LOGIN,
        password: process.env.REACT_APP_PASSWORD
      }
    })
  };
}
