import React, { Component } from "react";
import "./styles/EachTeam.css";
import SelectTeam from "./select/SelectTeam";

class EachTeam extends Component {
  state = {};
  render() {
    return (
      <div className="each_team">
        <header className="each_team__background_image" />
        <SelectTeam />
        <h2>Team Name Goes Here</h2>
        <h2>Coach Name Goes Here</h2>
        <section>
          <div>
            <h3>Wins</h3>
            <h3>1</h3>
          </div>

          <div>
            <h3>Losses</h3>
            <h3>1</h3>
          </div>

          <div>
            <h3>Ties</h3>
            <h3>1</h3>
          </div>
        </section>
      </div>
    );
  }
}
export default EachTeam;
