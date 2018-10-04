import axios from "axios";
//needs {srs:"",percent:""}
import secretAlgo from "./secretAlgo";

const initialState = {
  leftOpponent: {
    currentStats: {},
    currentTeam: [],
    currentLogo: "",
    sherlockWinAlgo: 0
  },
  rightOpponent: {
    currentStats: {},
    currentTeam: [],
    currentLogo: "",
    sherlockWinAlgo: 0
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
      var {
        year_losses,
        year_ties,
        year_wins,
        srs
      } = state.leftOpponent.currentTeam[index];
      var total = year_losses + year_ties + year_wins;
      var percent = year_wins / total;

      var returnSecret = () => {
        if (state.rightOpponent.currentStats.school_name) {
          const rightTotal =
            state.rightOpponent.currentStats.year_losses +
            state.rightOpponent.currentStats.year_ties +
            state.rightOpponent.currentStats.year_wins;
          const rightPercentage =
            rightTotal / state.rightOpponent.currentStats.year_wins;
          return secretAlgo(
            { srs, percent },
            {
              srs: state.rightOpponent.currentStats.srs,
              percent: rightPercentage
            }
          );
        } else {
          return secretAlgo({ srs, percent }, { srs: 0, percent: 0 });
        }
      };
      var secret = returnSecret();
      console.log(secret);
      return {
        ...state,
        leftOpponent: {
          ...state.leftOpponent,
          sherlockWinAlgo: secret.leftOpponent,
          currentStats: state.leftOpponent.currentTeam[index]
        },
        rightOpponent: {
          ...state.rightOpponent,
          sherlockWinAlgo: secret.rightOpponent
        }
      };
    case UPDATE_STATS_RIGHT:
      const indexx = state.rightOpponent.currentTeam.findIndex(
        eachRightOpponent => eachRightOpponent.year_id === action.payload
      );
      var {
        year_losses,
        year_ties,
        year_wins,
        srs
      } = state.rightOpponent.currentTeam[indexx];
      var total = year_losses + year_ties + year_wins;
      var percent = year_wins / total;

      var returnSecret = () => {
        if (state.leftOpponent.currentStats.school_name) {
          const leftTotal =
            state.leftOpponent.currentStats.year_losses +
            state.leftOpponent.currentStats.year_ties +
            state.leftOpponent.currentStats.year_wins;
          const leftPercentage =
            leftTotal / state.leftOpponent.currentStats.year_wins;
          return secretAlgo(
            {
              srs: state.leftOpponent.currentStats.srs,
              percent: leftPercentage
            },
            { srs, percent }
          );
        } else {
          return secretAlgo({ srs: 0, percent: 0 }, { srs, percent });
        }
      };
      var secret = returnSecret();
      return {
        ...state,
        rightOpponent: {
          ...state.rightOpponent,
          sherlockWinAlgo: secret.rightOpponent,
          currentStats: state.rightOpponent.currentTeam[indexx]
        },
        leftOpponent: {
          ...state.leftOpponent,
          sherlockWinAlgo: secret.leftOpponent
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
          currentStats: {},
          currentTeam: action.payload[0].data.rows,
          currentLogo: action.payload[1].data.rows[0].logo_link
        }
      };
    case `${UPDATE_CURRENT_RIGHT}_FULFILLED`:
      return {
        ...state,
        rightOpponent: {
          ...state.rightOpponent,
          currentStats: {},
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
