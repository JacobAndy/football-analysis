import axios from "axios";
const initialState = {
  leftOpponent: {
    currentStats: {},
    currentTeam: [],
    currentLogo: ""
  },
  rightOpponent: {
    currentStats: {},
    currentTeam: [],
    currentLogo: ""
  },
  loading: false
};

//action creators
const UPDATE_CURRENT_LEFT = "UPDATE_CURRENT_LEFT",
  UPDATE_CURRENT_RIGHT = "UPDATE_CURRENT_RIGHT",
  UPDATE_STATS_LEFT = "UPDATE_STATS_LEFT",
  UPDATE_STATS_RIGHT = "UPDATE_STATS_RIGHT";

//reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_STATS_LEFT:
      const index = state.leftOpponent.currentTeam.findIndex(
        eachLeftOpponent => eachLeftOpponent.year_id === action.payload
      );
      return {
        ...state,
        leftOpponent: {
          ...state.leftOpponent,
          currentStats: state.leftOpponent.currentTeam[index]
        }
      };
    case UPDATE_STATS_RIGHT:
      const indexx = state.rightOpponent.currentTeam.findIndex(
        eachRightOpponent => eachRightOpponent.year_id === action.payload
      );
      return {
        ...state,
        rightOpponent: {
          ...state.rightOpponent,
          currentStats: state.rightOpponent.currentTeam[indexx]
        }
      };
    case `${UPDATE_CURRENT_LEFT}_PENDING`:
    case `${UPDATE_CURRENT_RIGHT}_PENDING`:
      return { ...state, loading: true };

    case `${UPDATE_CURRENT_LEFT}_FULFILLED`:
      return {
        ...state,
        leftOpponent: {
          ...state.leftOpponent,
          currentTeam: action.payload[0].data.rows,
          currentLogo: action.payload[1].data.rows[0].logo_link
        }
      };
    case `${UPDATE_CURRENT_RIGHT}_FULFILLED`:
      return {
        ...state,
        rightOpponent: {
          ...state.rightOpponent,
          currentTeam: action.payload[0].data.rows,
          currentLogo: action.payload[1].data.rows[0].logo_link
        }
      };

    default:
      return state;
  }
}

//functions
export function updateLeft(param) {
  param = param.split(" ").join("%20");
  return {
    type: UPDATE_CURRENT_LEFT,
    payload: Promise.all([
      axios({
        method: "get",
        url: `${
          process.env.REACT_APP_API
        }/api/get_school_details?school_name=${param}`,
        auth: {
          username: process.env.REACT_APP_LOGIN,
          password: process.env.REACT_APP_PASSWORD
        }
      }),
      axios({
        method: "put",
        url: `${
          process.env.REACT_APP_API
        }/api/get_school_logo?school_name=${param}`,
        auth: {
          username: process.env.REACT_APP_LOGIN,
          password: process.env.REACT_APP_PASSWORD
        }
      })
    ])
  };
}
export function updateRight(param) {
  param = param.split(" ").join("%20");
  return {
    type: UPDATE_CURRENT_RIGHT,
    payload: Promise.all([
      axios({
        method: "get",
        url: `${
          process.env.REACT_APP_API
        }/api/get_school_details?school_name=${param}`,
        auth: {
          username: process.env.REACT_APP_LOGIN,
          password: process.env.REACT_APP_PASSWORD
        }
      }),
      axios({
        method: "put",
        url: `${
          process.env.REACT_APP_API
        }/api/get_school_logo?school_name=${param}`,
        auth: {
          username: process.env.REACT_APP_LOGIN,
          password: process.env.REACT_APP_PASSWORD
        }
      })
    ])
  };
}
export function currentStats(opponent, year) {
  if (opponent === "leftOpponent") {
    return {
      type: UPDATE_STATS_LEFT,
      payload: year
    };
  } else if (opponent === "rightOpponent") {
    return {
      type: UPDATE_STATS_RIGHT,
      payload: year
    };
  }
}
