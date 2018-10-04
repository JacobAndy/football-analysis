import React, { Component } from "react";
import { connect } from "react-redux";

import "./styles/EachTeam.css";

import SelectTeam from "./select/SelectTeam";

class EachTeam extends Component {
  state = {};
  render() {
    const { update, type, opponent } = this.props;
    const { currentStats } = opponent[type];
    console.log(this.props);
    return (
      <div className="each_team">
        <header
          className="each_team__background_image"
          style={{
            backgroundImage: `url(${
              type === "leftOpponent"
                ? this.props.opponent.leftOpponent.currentLogo
                : this.props.opponent.rightOpponent.currentLogo
            })`
          }}
        />

        <SelectTeam update={update} type={type} />
        <div className="each_team__details">
          <h2>Coach</h2>
          <h2>{currentStats.coaches ? currentStats.coaches : "Select Team"}</h2>
        </div>
        <div className="each_team__details">
          <h2>Conference</h2>
          <h2>{currentStats.conf_id ? currentStats.conf_id : "Select Team"}</h2>
        </div>
        <section>
          <div>
            <h3>W</h3>
            <h3>{currentStats.year_wins ? currentStats.year_wins : 0}</h3>
          </div>

          <div>
            <h3>L</h3>
            <h3>{currentStats.year_losses ? currentStats.year_losses : 0}</h3>
          </div>

          <div>
            <h3>T</h3>
            <h3>{currentStats.year_ties ? currentStats.year_ties : 0}</h3>
          </div>
        </section>
        <footer>
          <h2>50%</h2>
        </footer>
      </div>
    );
  }
}
let mapStateToProps = state => state;
export default connect(mapStateToProps)(EachTeam);
