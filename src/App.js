import React, { Component } from "react";
import "./App.css";

import store from "./ducks/store";
import { Provider } from "react-redux";

import BothTeams from "./components/team/BothTeams";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BothTeams />
      </Provider>
    );
  }
}

export default App;
